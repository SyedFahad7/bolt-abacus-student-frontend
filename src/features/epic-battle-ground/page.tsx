import { useState } from 'react';
import { useState as useStateLocal } from 'react';
import OperationBox from '../solo-training-ground/components/OperationBox';
import GameModeBox from '../solo-training-ground/components/GameModeBox';
import Sidebar from '../../components/Sidebar';
import MainContent from '../../components/layout/MainContent';
import { useNavigate } from 'react-router-dom';

// small inline Join Room box component so we don't need a separate file
function JoinRoomBox() {
  const [roomCode, setRoomCode] = useStateLocal('');
  const navigate = useNavigate();

  const join = () => {
    const code = roomCode.trim();
    if (!/^[0-9]{6}$/.test(code)) return alert('Please enter a valid 6-digit room code');
    navigate(`/student/epic-battle-ground/room/${encodeURIComponent(code)}`);
  };

  return (
    <div className="space-y-3">
      <input
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value.replace(/[^0-9]/g, ''))}
        maxLength={6}
        placeholder="Enter room code"
        className="w-full bg-black border border-[#2a2a2d] rounded-lg px-3 py-2 text-white"
      />
      <button onClick={join} className="w-full bg-[#facb25] text-black font-semibold py-2 rounded">Join</button>
    </div>
  );
}

const OPERATIONS = [
  { key: 'addition', label: 'Addition & Subtraction', icon: 'Plus', color: 'text-purple-400', description: 'Addition and subtraction' },
  { key: 'multiplication', label: 'Multiplication', icon: 'X', color: 'text-purple-400', description: 'Multiplication' },
  { key: 'division', label: 'Division', icon: 'Divide', color: 'text-purple-400', description: 'Division' },
];

const GAME_MODES = [
  { key: 'flashcards', label: 'Flash Cards', icon: 'Lightning', color: 'text-gold', description: 'Quick memory training' },
  { key: 'norush', label: 'No Rush Mastery', icon: 'Snail', color: 'text-gold', description: 'Practice without pressure' },
  { key: 'timeattack', label: 'Time Attack', icon: 'Alarm', color: 'text-gold', description: 'Race the clock' },
  { key: 'custom', label: 'Custom Challenge', icon: 'Gear', color: 'text-gold', description: 'Create custom settings' },
];

export default function EpicBattleGroundPage() {
  const [step, setStep] = useState<'operation' | 'gameMode'>('operation');
  const [selectedOperation, setSelectedOperation] = useState<string>('');
  const navigate = useNavigate();

  if (step === 'operation') {
    return (
      <div className="min-h-screen w-full flex bg-black justify-center items-center justify-items-center">
        <Sidebar />
        <MainContent>
          <h1 className="text-3xl font-bold text-white text-center mb-6 tracking-tight">EPIC BATTLE GROUND</h1>
          <div className="flex flex-col items-center mb-4">
            <span className="text-gold font-bold text-lg mb-2">BATTLE WITH FRIENDS</span>
            <span className="bg-purple-500/80 text-white px-4 py-1 rounded-full font-semibold">MULTIPLAYER MODES</span>
          </div>
          <p className="text-white text-center mb-8">Select an operation to start building your multiplayer challenge.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">CHOOSE YOUR OPERATION</h2>
            <div className="grid grid-cols-3 tablet:grid-cols-3 gap-6 w-full">
              {OPERATIONS.map((op) => (
                <OperationBox
                  key={op.key}
                  label={op.label}
                  icon={op.icon as any}
                  color={op.color}
                  description={op.description}
                  onClick={() => {
                    setSelectedOperation(op.key);
                    setStep('gameMode');
                  }}
                />
              ))}
            </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">Join Room</h3>
                <p className="text-white/70 text-sm mb-4">Enter 6-digit room code to join an existing Epic Battle Room.</p>
                <JoinRoomBox />
              </div>
            </div>
          </div>
        </MainContent>
      </div>
    );
  }

  if (step === 'gameMode') {
    return (
      <div className="min-h-screen flex bg-black">
        <Sidebar />
        <MainContent>
          <button className="mb-4 px-4 py-2 bg-gray-800 text-white rounded" onClick={() => setStep('operation')}>Back</button>
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">CHOOSE YOUR GAME MODE</h2>
          <div className="grid grid-cols-4 tablet:grid-cols-4 gap-6 w-full">
            {GAME_MODES.map((mode) => (
              <GameModeBox
                key={mode.key}
                label={mode.label}
                icon={mode.icon as any}
                color={mode.color}
                description={mode.description}
                onClick={() => {
                  const base = '/student/epic-battle-ground';
                  const op = selectedOperation || 'addition';
                  switch (mode.key) {
                    case 'flashcards':
                      navigate(`${base}/flashcards?op=${op}`);
                      break;
                    case 'norush':
                      navigate(`${base}/untimed?op=${op}`);
                      break;
                    case 'timeattack':
                      navigate(`${base}/timed?op=${op}`);
                      break;
                    case 'custom':
                      navigate(`${base}/set?op=${op}`);
                      break;
                    default:
                      navigate(`${base}/untimed?op=${op}`);
                  }
                }}
              />
            ))}
          </div>
        </MainContent>
      </div>
    );
  }

  return null;
}
