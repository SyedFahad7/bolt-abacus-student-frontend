import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import MainContent from '../../../components/layout/MainContent';

export default function EpicRoomCountdown() {
  const [count, setCount] = useState(3);
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c - 1);
    }, 800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (count <= 0) {
      navigate(`/student/epic-battle-ground/room/${encodeURIComponent(roomId || '')}/game`);
    }
  }, [count, roomId, navigate]);

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-9xl font-bold">{count > 0 ? count : 'Go!'}</div>
        </div>
      </MainContent>
    </div>
  );
}
