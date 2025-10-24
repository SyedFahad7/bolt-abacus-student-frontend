import { useEffect, useRef, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import MainContent from '../../../components/layout/MainContent';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { generateEpicBattleGroundQuestions } from '../utils';
import type { QuizQuestion } from '../../solo-training-ground/types';

export default function EpicRoomGame() {
  const { roomId } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const op = (params.get('op') as 'addition' | 'multiplication' | 'division') || 'addition';
  const mode = (params.get('mode') as string) || 'untimed';

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // generate simple set of questions for UI preview
    const modeNum = op === 'addition' ? 1 : op === 'multiplication' ? 2 : 3;
    const qs = generateEpicBattleGroundQuestions({ mode: modeNum, subMode: 'custom_challenge', settings: { numQuestions: 10, numDigits: 1, numRows: 2 } as any });
    setQuestions(qs as QuizQuestion[]);
  }, [op]);

  useEffect(() => { inputRef.current?.focus(); }, [index]);

  if (questions.length === 0) return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <div className="text-white">Preparing game...</div>
      </MainContent>
    </div>
  );

  const q = questions[index];

  const submit = () => {
    // just advance for UI
    setInput('');
    if (index + 1 >= questions.length) {
      // finish and route to results (simple winner screen)
      navigate(`/student/epic-battle-ground/room/${encodeURIComponent(roomId || '')}/results`);
    } else setIndex(index + 1);
  };

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="mb-4 text-white/80">Room <span className="font-mono text-gold">{roomId}</span> • {op.toUpperCase()} • {mode}</div>
            <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-12 mb-6 text-center">
              <div className="text-white/60 mb-2">Question {index + 1} of {questions.length}</div>
              <div className="text-6xl font-bold text-white">{q.questionText}</div>
            </div>

            <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-6 mb-6">
              <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter your answer" className="w-full bg-black border border-[#2a2a2d] text-white text-2xl px-4 py-4 rounded-lg text-center" />
            </div>

            <div className="flex gap-3">
              <button onClick={() => { if (index + 1 >= questions.length) navigate(`/student/epic-battle-ground`); else setIndex(index + 1); }} className="flex-1 bg-[#2a2a2d] text-white py-3 rounded">Skip</button>
              <button onClick={submit} className="flex-1 bg-[#facb25] text-black py-3 rounded">{index + 1 >= questions.length ? 'Finish' : 'Next'}</button>
            </div>
          </div>

          <div>
            <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-4 mb-4">
              <h3 className="text-gold font-bold">Leaderboard</h3>
              <ul className="mt-3 space-y-2 text-white/80">
                <li className="flex justify-between"><span>Yashwanth D</span><span className="text-white">10 XP</span></li>
                <li className="flex justify-between"><span>Aayan M</span><span className="text-white/60">0 XP</span></li>
                <li className="flex justify-between"><span>Mujahed</span><span className="text-white/60">0 XP</span></li>
              </ul>
            </div>

            <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-4">
              <h4 className="text-white font-semibold">Room Details</h4>
              <p className="text-white/70 text-sm mt-2">Players: 4 • Mode: {mode}</p>
            </div>
          </div>
        </div>
      </MainContent>
    </div>
  );
}
