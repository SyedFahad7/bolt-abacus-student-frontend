import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import MainContent from '../../../components/layout/MainContent';

export default function EpicRoomLoading() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate(`/student/epic-battle-ground/room/${encodeURIComponent(roomId || '')}/countdown`);
    }, 1500);
    return () => clearTimeout(t);
  }, [roomId, navigate]);

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold mb-4" />
          <div className="text-white font-semibold">Generating questions...</div>
        </div>
      </MainContent>
    </div>
  );
}
