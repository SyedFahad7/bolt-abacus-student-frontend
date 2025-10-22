import { useEffect, useRef, useState } from 'react';
import Sidebar from '../../../../components/Sidebar';
import MainContent from '../../../../components/layout/MainContent';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { generateSoloTrainingQuestions } from '../../utils';
import type { QuizQuestion, QuizAnswer } from '../../types';
import { Eye, EyeSlash, SkipForward, ArrowRight } from '@phosphor-icons/react';
import { minsToMs, formatDuration } from '../../timeUtils';

interface TimedSettings {
  operation: 'addition' | 'multiplication' | 'division';
  timeLimit: number; // minutes
  numberOfDigitsLeft: number;
  numberOfDigitsRight: number;
  numberOfRows: number;
  isZigzag: boolean;
  includeSubtraction: boolean;
  persistNumberOfDigits: boolean;
  includeDecimals: boolean;
  audioMode: boolean;
  audioPace: 'slow' | 'normal' | 'fast' | 'ultra';
  showQuestion: boolean;
}

export default function TimedPracticePage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const cfg = params.get('cfg');

  const [settings, setSettings] = useState<TimedSettings | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [remainingMs, setRemainingMs] = useState(0);
  const deadlineRef = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Audio reading
  const readQuestionAloud = () => {
    if (!settings || !settings.audioMode) return;
    const q = questions[currentIndex];
    if (!q) return;
    const rateMap = { slow: 0.7, normal: 1, fast: 1.3, ultra: 1.6 };
    const utter = new SpeechSynthesisUtterance(q.questionText);
    utter.rate = rateMap[settings.audioPace];
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  };

  // Init
  useEffect(() => {
    if (!cfg) {
      navigate('/student/solo-training-ground');
      return;
    }
    try {
      const s: TimedSettings = JSON.parse(atob(cfg));
      setSettings(s);

      const mode = s.operation === 'addition' ? 1 : s.operation === 'multiplication' ? 2 : 3;
      const qs = generateSoloTrainingQuestions({
        mode,
        subMode: 'time_attack',
        settings: {
          timeLimit: s.timeLimit,
          numDigits: s.numberOfDigitsLeft,
          numRows: s.numberOfRows,
          zigZagPattern: s.isZigzag,
          includeSubtraction: s.includeSubtraction,
          sameDigitsInAnswer: s.persistNumberOfDigits,
          firstOperandDigits: s.numberOfDigitsLeft,
          secondOperandDigits: s.numberOfDigitsRight,
          numeratorDigits: s.numberOfDigitsLeft,
          denominatorDigits: s.numberOfDigitsRight,
          includeDecimal: s.includeDecimals,
        },
      });
      setQuestions(qs);
      setAnswers(qs.map(q => ({ questionId: q.id, answer: null, correct: false })));

      const deadline = Date.now() + minsToMs(s.timeLimit);
      deadlineRef.current = deadline;
      setRemainingMs(deadline - Date.now());
    } catch (e) {
      console.error(e);
      navigate('/student/solo-training-ground');
    }
  }, [cfg, navigate]);

  // Timer
  useEffect(() => {
    if (!settings) return;
    const id = setInterval(() => {
      const left = deadlineRef.current - Date.now();
      if (left <= 0) {
        clearInterval(id);
        autoFinish();
      } else {
        setRemainingMs(left);
      }
    }, 250);
    return () => clearInterval(id);
  }, [settings]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentIndex]);

  const autoFinish = () => {
    // If time ends, mark all remaining as skipped
    const finalAnswers = [...answers];
    for (let i = currentIndex; i < questions.length; i++) {
      if (!finalAnswers[i] || finalAnswers[i].answer === null) {
        finalAnswers[i] = { questionId: questions[i].id, answer: null, correct: false };
      }
    }
    goToResults(finalAnswers, true);
  };

  const submitAnswer = () => {
    if (!settings) return;
    const q = questions[currentIndex];
    const ans = settings.includeDecimals ? parseFloat(userInput) : parseInt(userInput, 10);
    const correct = !isNaN(ans as any) && ans === q.answer;
    const updated = [...answers];
    updated[currentIndex] = { questionId: q.id, answer: isNaN(ans as any) ? null : (ans as number), correct };
    setAnswers(updated);

    if (currentIndex + 1 >= questions.length) {
      goToResults(updated, false);
    } else {
      setCurrentIndex(currentIndex + 1);
      setUserInput('');
      if (settings.audioMode) readQuestionAloud();
    }
  };

  const skipQuestion = () => {
    const q = questions[currentIndex];
    const updated = [...answers];
    updated[currentIndex] = { questionId: q.id, answer: null, correct: false };
    setAnswers(updated);

    if (currentIndex + 1 >= questions.length) {
      goToResults(updated, false);
    } else {
      setCurrentIndex(currentIndex + 1);
      setUserInput('');
    }
  };

  const goToResults = (finalAnswers: QuizAnswer[], timedOut: boolean) => {
    const results = { questions, answers: finalAnswers, settings, timedOut, totalTimeMs: minsToMs(settings!.timeLimit) - remainingMs };
    const encoded = btoa(JSON.stringify(results));
    navigate(`/student/solo-training-ground/timed/results?results=${encoded}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userInput.trim()) submitAnswer();
  };

  if (!settings || questions.length === 0) {
    return (
      <div className="min-h-screen flex bg-black">
        <Sidebar />
        <MainContent>
          <div className="text-white/80">Loading questions...</div>
        </MainContent>
      </div>
    );
  }

  const q = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const timeLabel = formatDuration(remainingMs);

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <div className="w-full max-w-3xl">
          {/* Top bar with timer */}
          <div className="mb-6 flex items-center justify-between">
            <div className="text-white/80 text-sm">Question {currentIndex + 1} of {questions.length}</div>
            <div className="px-3 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/30 text-sm font-semibold">⏱ {timeLabel}</div>
          </div>
          <div className="h-2 bg-[#2a2a2d] rounded-full overflow-hidden mb-6">
            <div className="h-full bg-gold transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>

          {/* Question */}
          <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-12 mb-6">
            {settings.showQuestion ? (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Eye size={24} className="text-gold" />
                  <p className="text-white/60 text-sm">Question visible</p>
                </div>
                <p className="text-5xl font-bold text-white whitespace-pre-wrap leading-tight">{q.questionText}</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <EyeSlash size={24} className="text-white/40" />
                  <p className="text-white/60 text-sm">Question hidden - Listen to audio or use mental math</p>
                </div>
                <p className="text-3xl text-white/20">???</p>
              </div>
            )}
          </div>

          {/* Answer */}
          <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-6 mb-6">
            <label className="block text-white/80 mb-2 text-sm">Your Answer:</label>
            <input
              ref={inputRef}
              type="number"
              step={settings.includeDecimals ? '0.01' : '1'}
              className="w-full bg-black border border-[#2a2a2d] text-white text-2xl px-4 py-4 rounded-lg focus:outline-none focus:border-gold text-center"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 bg-[#2a2a2d] text-white font-semibold py-3 rounded-lg hover:bg-[#3a3a3d] transition flex items-center justify-center gap-2" onClick={skipQuestion}>
              <SkipForward size={20} weight="fill" />
              Skip
            </button>
            <button
              className={`flex-1 font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 ${userInput.trim() ? 'bg-[#facb25] text-black hover:bg-[#e6b422]' : 'bg-[#2a2a2d] text-white/40 cursor-not-allowed'}`}
              onClick={submitAnswer}
              disabled={!userInput.trim()}
            >
              {currentIndex + 1 >= questions.length ? 'Finish' : 'Next'}
              <ArrowRight size={20} weight="bold" />
            </button>
          </div>
        </div>
      </MainContent>
    </div>
  );
}
