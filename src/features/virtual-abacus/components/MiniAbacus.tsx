import React, { useState } from 'react';
import { X, DotsSixVertical } from '@phosphor-icons/react';
import { AbacusBoard } from './AbacusBoard';

interface MiniAbacusProps {
  onClose: () => void;
}

// floating draggable mini abacus window
export const MiniAbacus: React.FC<MiniAbacusProps> = ({ onClose }) => {
  const [position, setPosition] = useState({ x: 20, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rodCount, setRodCount] = useState(7);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div
      className="fixed bg-[#0f0f10] rounded-xl shadow-2xl border border-[#2a2a2d] overflow-hidden z-[100]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '380px',
        maxHeight: '90vh'
      }}
    >
      {/* header with drag handle */}
      <div
        className="bg-[#161618] border-b border-[#2a2a2d] px-3 py-2 flex items-center justify-between cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 text-white">
          <DotsSixVertical size={20} className="text-yellow-600" />
          <span className="text-sm font-medium">Virtual Abacus</span>
        </div>
        <div className="flex items-center gap-2">
          {/* rod count controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setRodCount(Math.max(3, rodCount - 1));
              }}
              className="bg-[#0f0f10] hover:bg-[#2a2a2d] text-yellow-600 w-6 h-6 rounded flex items-center justify-center text-xs transition-all"
            >
              −
            </button>
            <span className="text-white text-xs w-6 text-center">{rodCount}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setRodCount(Math.min(10, rodCount + 1));
              }}
              className="bg-[#0f0f10] hover:bg-[#2a2a2d] text-yellow-600 w-6 h-6 rounded flex items-center justify-center text-xs transition-all"
            >
              +
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#2a2a2d] text-gray-400 hover:text-white transition-all"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* abacus content */}
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 44px)' }}>
        <AbacusBoard mini={true} rodCount={rodCount} showControls={false} />
        
        {/* mini instructions */}
        <div className="px-3 pb-3">
          <div className="bg-[#161618] rounded-lg p-3 text-xs text-gray-300">
            <p className="mb-2 text-yellow-600 font-medium">Quick Guide:</p>
            <ul className="space-y-1">
              <li>• Click upper beads for 5 units</li>
              <li>• Click lower beads for 1 unit each</li>
              <li>• Only beads touching beam count</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
