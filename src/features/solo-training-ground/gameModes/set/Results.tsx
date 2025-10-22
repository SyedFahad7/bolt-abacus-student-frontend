import { useSearchParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../../../components/Sidebar';
import MainContent from '../../../../components/layout/MainContent';
import type { QuizQuestion, QuizAnswer } from '../../types';
import { CheckCircle, XCircle, Gear } from '@phosphor-icons/react';
import { formatDuration } from '../../timeUtils';

interface SetSettings {
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
  enableTimeLimit: boolean;
  timeLimit: number; // minutes
}

export default function SetResultsPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const resultsEncoded = params.get('results');

  if (!resultsEncoded) {
    return (
      <div className="min-h-screen flex bg-black">
        <Sidebar />
        <MainContent>
          <div className="text-white/80">No results found.</div>
        </MainContent>
      </div>
    );
  }

  const { questions, answers, settings, timedOut, totalTimeMs }: { questions: QuizQuestion[]; answers: QuizAnswer[]; settings: SetSettings; timedOut: boolean; totalTimeMs: number } = JSON.parse(atob(resultsEncoded));

  const totalQuestions = questions.length;
  const correctCount = answers.filter((a) => a.correct).length;
  const score = Math.round((correctCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Gear size={32} className="text-gold" weight="fill" />
            <h1 className="text-3xl font-bold text-white">Custom Challenge - Results</h1>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-gold mb-2">{score}%</div>
              <div className="text-white/60">Score</div>
            </div>
            <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-green-500 mb-2">{correctCount}</div>
              <div className="text-white/60">Correct</div>
            </div>
            <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-red-500 mb-2">{totalQuestions - correctCount}</div>
              <div className="text-white/60">Incorrect</div>
            </div>
          </div>

          {/* Optional Time Info */}
          {settings.enableTimeLimit && (
            <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-4 mb-6 text-center">
              <div className="text-white/60 text-sm mb-1">Total Time</div>
              <div className="text-2xl font-bold text-white">{formatDuration(totalTimeMs)}</div>
              {timedOut && <div className="text-red-400 text-xs mt-1">Time up! Remaining questions were auto-submitted as skipped.</div>}
            </div>
          )}

          {/* Question Breakdown */}
          <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Question Breakdown</h2>
            <div className="space-y-3">
              {questions.map((q, idx) => {
                const userAnswer = answers[idx];
                const correctAnswer = q.answer;
                const isCorrect = userAnswer.correct;

                return (
                  <div key={q.id} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {isCorrect ? (
                            <CheckCircle size={24} className="text-green-500" weight="fill" />
                          ) : (
                            <XCircle size={24} className="text-red-500" weight="fill" />
                          )}
                          <span className="text-white font-semibold">Question {idx + 1}</span>
                        </div>
                        <div className="text-white/80 mb-1">
                          <span>{q.questionText}</span>
                          <span className="mx-2">=</span>
                          <span className="font-bold">{correctAnswer}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-white/60">Your answer: </span>
                          <span className={isCorrect ? 'text-green-500' : 'text-red-500'}>
                            {userAnswer.answer !== null ? userAnswer.answer : 'Skipped'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 bg-[#2a2a2d] text-white font-semibold py-3 rounded-lg hover:bg-[#3a3a3d]" onClick={() => navigate('/student/solo-training-ground')}>
              Back to Training Ground
            </button>
            <button className="flex-1 bg-[#facb25] text-black font-semibold py-3 rounded-lg hover:bg-[#e6b422]" onClick={() => navigate(`/student/solo-training-ground/set?op=${settings.operation}`)}>
              Practice Again
            </button>
          </div>
        </div>
      </MainContent>
    </div>
  );
}
