import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import generateEpicBattleGroundQuestions from '../../utils';

export default function SetPractice() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const cfg = searchParams.get('cfg');
    let settings = { numQuestions: 10 } as any;
    if (cfg) {
      try { settings = JSON.parse(atob(cfg)); } catch (e){}
    }
    const op = searchParams.get('op') || 'addition';
    const mode = op === 'multiplication' ? 2 : op === 'division' ? 3 : 1;
    const qs = generateEpicBattleGroundQuestions({ mode, subMode: 'custom_challenge', settings });
    setQuestions(qs);
  }, [searchParams]);

  if (!questions.length) return <div className="p-6">Loading questions...</div>;

  const q = questions[index];

  return (
    <div className="p-6">
      <div className="mb-4">
        <div className="text-white text-xl">Question {index + 1} / {questions.length}</div>
        <div className="text-2xl font-bold text-gold">{q.questionText || q.question}</div>
      </div>
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-gray-800 text-white rounded" onClick={() => setIndex(i => Math.max(0, i - 1))}>Prev</button>
        <button className="px-4 py-2 bg-gold text-black rounded ml-auto" onClick={() => {
          if (index + 1 >= questions.length) {
            navigate('/student/epic-battle-ground/set/results?outcome=winner');
          } else setIndex(i => i + 1);
        }}>Next</button>
      </div>
    </div>
  );
}
