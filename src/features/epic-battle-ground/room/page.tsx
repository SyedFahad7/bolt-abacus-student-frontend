import { useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import MainContent from '../../../components/layout/MainContent';

export default function EpicRoomLobbyPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Dummy participants
  const participants = [
    { name: 'Yashwanth D', xp: 10 },
    { name: 'Aayan M', xp: 0 },
    { name: 'Mujahed', xp: 0 },
  ];

  const op = searchParams.get('op') || 'addition';
  const mode = searchParams.get('mode') || 'untimed';
  const players = searchParams.get('players') || '4';
  const timed = searchParams.get('time') || null;

  useEffect(() => {
    // if no room code in url, redirect to main epic page
    if (!roomId) navigate('/student/epic-battle-ground');
  }, [roomId, navigate]);

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-2">Room Lobby</h2>
            <p className="text-white/70 mb-6">Room ID: <span className="font-mono text-gold">{roomId}</span></p>

            <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-6 mb-6">
              <h3 className="text-white font-semibold mb-2">Room Details</h3>
              <div className="text-white/70 text-sm">
                <p>Operation: <strong className="text-white">{op}</strong></p>
                <p>Game mode: <strong className="text-white">{mode}</strong></p>
                <p>No of players: <strong className="text-white">{players}</strong></p>
                {timed && <p>Time limit: <strong className="text-white">{timed} mins</strong></p>}
              </div>
            </div>

            <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Participants</h3>
              <ul className="space-y-2">
                {participants.map((p, idx) => (
                  <li key={idx} className="flex items-center justify-between bg-black/40 p-3 rounded">
                    <div className="text-white">{p.name}</div>
                    <div className="text-white/70 text-sm">{p.xp} XP</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-6 mb-4">
              <h3 className="text-white font-semibold mb-2">Actions</h3>
              <div className="flex flex-col gap-3">
                <button onClick={() => { navigate('/student/epic-battle-ground'); }} className="w-full bg-[#2a2a2d] text-white py-2 rounded">Close Room</button>
                <button onClick={() => navigate(`/student/epic-battle-ground/room/${encodeURIComponent(roomId || '')}/loading`)} className="w-full bg-[#facb25] text-black py-2 rounded">Start Game</button>
              </div>
            </div>

            <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-4">
              <h4 className="text-white font-semibold">Room Quick Info</h4>
              <p className="text-white/70 text-sm mt-2">Share the room code with friends to join. The creator may close the room anytime.</p>
            </div>
          </div>
        </div>
      </MainContent>
    </div>
  );
}
