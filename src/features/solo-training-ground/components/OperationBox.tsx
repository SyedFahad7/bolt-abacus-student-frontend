import type { FC } from 'react';
import { Plus, X, Divide } from '@phosphor-icons/react';

interface OperationBoxProps {
  label: string;
  icon: 'Plus' | 'X' | 'Divide';
  color: string;
  description: string;
  onClick: () => void;
}

const ICONS = {
  Plus: <Plus size={40} weight="bold" className="text-purple-400" />,
  X: <X size={40} weight="bold" className="text-purple-400" />,
  Divide: <Divide size={40} weight="bold" className="text-purple-400" />,
};

const OperationBox: FC<OperationBoxProps> = ({ label, icon, color, description, onClick }) => (
  <button
    className={`w-full flex flex-col items-center gap-2 p-6 rounded-xl shadow-lg bg-gray-900 hover:bg-purple-900 transition-all text-white ${color}`}
    onClick={onClick}
    type="button"
  >
    <div>{ICONS[icon]}</div>
    <div className="font-bold text-lg mb-1">{label}</div>
    <div className="text-sm text-white/80">{description}</div>
  </button>
);

export default OperationBox;
