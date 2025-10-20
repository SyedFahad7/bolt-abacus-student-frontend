import type { FC } from 'react';
import { Lightning, Alarm, Gear } from '@phosphor-icons/react';
import { Snail } from 'lucide-react';

interface GameModeBoxProps {
  label: string;
  icon: 'Lightning' | 'Snail' | 'Alarm' | 'Gear';
  color: string;
  description: string;
  onClick: () => void;
}

const ICONS = {
  Lightning: <Lightning size={40} weight="bold" className="text-gold" />,
  Snail: <Snail size={40} className="text-gold" />,
  Alarm: <Alarm size={40} weight="bold" className="text-gold" />,
  Gear: <Gear size={40} weight="bold" className="text-gold" />,
};

const GameModeBox: FC<GameModeBoxProps> = ({ label, icon, color, description, onClick }) => (
  <button
    className={`w-full flex flex-col items-center gap-2 p-6 rounded-xl shadow-lg bg-gray-900 hover:bg-gold/20 transition-all text-white ${color}`}
    onClick={onClick}
    type="button"
  >
    <div>{ICONS[icon]}</div>
    <div className="font-bold text-lg mb-1">{label}</div>
    <div className="text-sm text-white/80">{description}</div>
  </button>
);

export default GameModeBox;
