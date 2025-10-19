
import { useState } from 'react';
import OperationBox from './components/OperationBox';
import GameModeBox from './components/GameModeBox';
import Sidebar from '../../components/Sidebar';
import MainContent from '../../components/layout/MainContent';
import { useNavigate } from 'react-router-dom';

const OPERATIONS = [
  {
    key: 'addition',
    label: 'Addition & Subtraction',
    icon: 'Plus',
    color: 'text-purple-400',
    description: 'Basic arithmetic with addition and subtraction',
  },
  {
    key: 'multiplication',
    label: 'Multiplication',
    icon: 'X',
    color: 'text-purple-400',
    description: 'Master multiplication tables and beyond',
  },
  {
    key: 'division',
    label: 'Division',
    icon: 'Divide',
    color: 'text-purple-400',
    description: 'Divide and conquer with division problems',
  },
];

const GAME_MODES = [
  {
    key: 'flashcards',
    label: 'Flash Cards',
    icon: 'Lightning',
    color: 'text-gold',
    description: 'Quick memory training with instant feedback!',
  },
  {
    key: 'norush',
    label: 'No Rush Mastery',
    icon: 'Snail',
    color: 'text-gold',
    description: 'Learn at your own pace without pressure.',
  },
  {
    key: 'timeattack',
    label: 'Time Attack',
    icon: 'Alarm',
    color: 'text-gold',
    description: 'Race against the clock in this fast-paced challenge!',
  },
  {
    key: 'custom',
    label: 'Custom Challenge',
    icon: 'Gear',
    color: 'text-gold',
    description: 'Create your own rules and difficulty settings.',
  },
];

export default function SoloTrainingGroundPage() {
  const [step, setStep] = useState<'operation' | 'gameMode' | 'form' | 'practice' | 'results'>('operation');
  const [selectedOperation, setSelectedOperation] = useState<string>('');
  const [selectedGameMode, setSelectedGameMode] = useState<string>('');
  const navigate = useNavigate();

  if (step === 'operation') {
    return (
      <div className="min-h-screen w-full flex bg-black justify-center items-center justify-items-center">
        <Sidebar />
        <MainContent>
            <h1 className="text-3xl font-bold text-white text-center mb-6 tracking-tight">SOLO TRAINING GROUND</h1>
            <div className="flex flex-col items-center mb-4">
              <span className="text-gold font-bold text-lg mb-2">MASTER YOUR SKILLS</span>
              <span className="bg-purple-500/80 text-white px-4 py-1 rounded-full font-semibold">PRACTICE MODES</span>
            </div>
            <p className="text-white text-center mb-8">Practice and perfect your math skills with various training modes! Choose your operation and challenge yourself. <span className="text-gold font-bold">Ready to train?</span></p>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">CHOOSE YOUR OPERATION</h2>
              <div className="grid grid-cols-3 tablet:grid-cols-3 gap-6 w-full">
                {OPERATIONS.map(op => (
                  <OperationBox
                    key={op.key}
                    label={op.label}
                    icon={op.icon as 'Plus' | 'X' | 'Divide'}
                    color={op.color}
                    description={op.description}
                    onClick={() => { setSelectedOperation(op.key); setStep('gameMode'); }}
                  />
                ))}
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
              {GAME_MODES.map(mode => (
                <GameModeBox
                  key={mode.key}
                  label={mode.label}
                  icon={mode.icon as 'Lightning' | 'Snail' | 'Alarm' | 'Gear'}
                  color={mode.color}
                  description={mode.description}
                  onClick={() => {
                    setSelectedGameMode(mode.key);
                    // Route to the correct page and pass operation via query param for now
                    const base = '/student/solo-training-ground';
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

  // Step 3: Render Form for selected game mode
  // ...form, practice, results will go here...

  return null;
}
