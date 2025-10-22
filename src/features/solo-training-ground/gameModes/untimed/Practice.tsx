import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Sidebar from '../../../../components/Sidebar';
import MainContent from '../../../../components/layout/MainContent';
import { generateSoloTrainingQuestions } from '../../utils';
import type { QuizQuestion, QuizAnswer } from '../../types';
import { ArrowRight, SkipForward, Eye, EyeSlash } from '@phosphor-icons/react';

interface UntimedSettings {
  operation: 'addition' | 'multiplication' | 'division';
  numberOfQuestions: number;
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

const UntimedPractice: FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const settingsEncoded = params.get('settings');

  const [settings, setSettings] = useState<UntimedSettings | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime] = useState(Date.now());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!settingsEncoded) {
      navigate('/student/solo-training-ground');
      return;
    }

    try {
      const decoded: UntimedSettings = JSON.parse(atob(settingsEncoded));
      setSettings(decoded);

      // Map operation to mode number
      const modeMap = { addition: 1, multiplication: 2, division: 3 } as const;
      const mode = modeMap[decoded.operation];

      // Generate questions using the senior dev's function
      const generatedQuestions = generateSoloTrainingQuestions({
        mode,
        subMode: 'no_rush_mastery',
        settings: {
          numQuestions: decoded.numberOfQuestions,
          numDigits: decoded.numberOfDigitsLeft,
          numRows: decoded.numberOfRows,
          zigZagPattern: decoded.isZigzag,
          includeSubtraction: decoded.includeSubtraction,
          sameDigitsInAnswer: decoded.persistNumberOfDigits,
          firstOperandDigits: decoded.numberOfDigitsLeft,
          secondOperandDigits: decoded.numberOfDigitsRight,
          numeratorDigits: decoded.numberOfDigitsLeft,
          denominatorDigits: decoded.numberOfDigitsRight,
          includeDecimal: decoded.includeDecimals,
        },
      });

      setQuestions(generatedQuestions);
      setAnswers(
        generatedQuestions.map((q) => ({
          questionId: q.id,
          answer: null,
          correct: false,
        }))
      );
    } catch (error) {
      console.error('Failed to parse settings:', error);
      navigate('/student/solo-training-ground');
    }
  }, [settingsEncoded, navigate]);

  useEffect(() => {
    if (settings?.audioMode && questions.length > 0 && currentIndex < questions.length) {
      readQuestionAloud();
    }
  }, [currentIndex, settings, questions]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentIndex]);

  const readQuestionAloud = () => {
    if (!settings || !settings.audioMode) return;

    const question = questions[currentIndex];
    if (!question) return;

    const rateMap = { slow: 0.7, normal: 1.0, fast: 1.3, ultra: 1.6 };
    const rate = rateMap[settings.audioPace];

    const utterance = new SpeechSynthesisUtterance(question.questionText);
    utterance.rate = rate;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const submitAnswer = () => {
    if (!userInput.trim() || !settings) return;

    const currentQuestion = questions[currentIndex];
    const userAnswerNum = settings.includeDecimals ? parseFloat(userInput) : parseInt(userInput, 10);
    const isCorrect = !isNaN(userAnswerNum) && userAnswerNum === currentQuestion.answer;

    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = {
      questionId: currentQuestion.id,
      answer: userAnswerNum,
      correct: isCorrect,
    };
    setAnswers(updatedAnswers);

    // Move to next question or finish
    if (currentIndex + 1 >= questions.length) {
      finishQuiz(updatedAnswers);
    } else {
      setCurrentIndex(currentIndex + 1);
      setUserInput('');
    }
  };

  const skipQuestion = () => {
    const currentQuestion = questions[currentIndex];
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = {
      questionId: currentQuestion.id,
      answer: null,
      correct: false,
    };
    setAnswers(updatedAnswers);

    if (currentIndex + 1 >= questions.length) {
      finishQuiz(updatedAnswers);
    } else {
      setCurrentIndex(currentIndex + 1);
      setUserInput('');
    }
  };

  const finishQuiz = (finalAnswers: QuizAnswer[]) => {
    const totalTime = Date.now() - startTime;
    const results = {
      questions,
      answers: finalAnswers,
      settings,
      totalTime,
    };
    const encoded = btoa(JSON.stringify(results));
    navigate(`/student/solo-training-ground/untimed/results?results=${encoded}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userInput.trim()) {
      submitAnswer();
    }
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

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <div className="w-full max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-white/60 mb-2">
              <span>
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-[#2a2a2d] rounded-full overflow-hidden">
              <div
                className="h-full bg-gold transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Display */}
          <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-12 mb-6">
            {settings.showQuestion ? (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Eye size={24} className="text-gold" />
                  <p className="text-white/60 text-sm">Question visible</p>
                </div>
                <p className="text-5xl font-bold text-white whitespace-pre-wrap leading-tight">
                  {currentQuestion.questionText}
                </p>
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

          {/* Audio Mode Indicator */}
          {settings.audioMode && (
            <div className="bg-gold/10 border border-gold/30 rounded-lg p-3 mb-6 flex items-center gap-2">
              <span className="text-2xl">🔊</span>
              <div>
                <p className="text-gold font-semibold text-sm">Audio Mode Active</p>
                <p className="text-white/60 text-xs">Question will be read aloud - Pace: {settings.audioPace}</p>
              </div>
              <button
                className="ml-auto bg-gold/20 hover:bg-gold/30 text-gold px-3 py-1 rounded text-sm"
                onClick={readQuestionAloud}
              >
                🔁 Replay
              </button>
            </div>
          )}

          {/* Answer Input */}
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

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              className="flex-1 bg-[#2a2a2d] text-white font-semibold py-3 rounded-lg hover:bg-[#3a3a3d] transition flex items-center justify-center gap-2"
              onClick={skipQuestion}
            >
              <SkipForward size={20} weight="fill" />
              Skip
            </button>
            <button
              className={`flex-1 font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 ${
                userInput.trim()
                  ? 'bg-[#facb25] text-black hover:bg-[#e6b422]'
                  : 'bg-[#2a2a2d] text-white/40 cursor-not-allowed'
              }`}
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
};

export default UntimedPractice;
