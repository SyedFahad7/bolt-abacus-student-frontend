import Sidebar from '../../../components/Sidebar';
import MainContent from '../../../components/layout/MainContent';
import { useParams, useNavigate } from 'react-router-dom';

export default function EpicRoomResults() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  // dummy
  const leaderboard = [
    { name: 'Yashwanth D', score: 10, correct: 9 },
    { name: 'Aayan M', score: 6, correct: 5 },
    { name: 'Mujahed', score: 2, correct: 1 },
  ];

  const winner = leaderboard[0];

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Battle Results</h1>
          <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-6 mb-6">
            <h2 className="text-gold text-2xl font-bold">Winner: {winner.name}</h2>
            <p className="text-white/70">Score: {winner.score} • Correct: {winner.correct}</p>
          </div>

          <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">Leaderboard</h3>
            <ul className="space-y-2 text-white/80">
              {leaderboard.map((p, idx) => (
                <li key={idx} className="flex justify-between bg-black/30 p-3 rounded">{p.name} <span>{p.score} XP</span></li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={() => navigate('/student/epic-battle-ground')} className="flex-1 bg-[#2a2a2d] text-white py-3 rounded">Back to Epic</button>
            <button onClick={() => navigate(`/student/epic-battle-ground/room/${encodeURIComponent(roomId || '')}`)} className="flex-1 bg-[#facb25] text-black py-3 rounded">View Room</button>
          </div>
        </div>
      </MainContent>
    </div>
  );
}
