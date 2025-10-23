import React, { useState, useEffect } from 'react';
import { ArrowCounterClockwise } from '@phosphor-icons/react';

interface AbacusBoardProps {
  mini?: boolean;
  rodCount?: number;
  onRodCountChange?: (count: number) => void;
  showControls?: boolean;
}

interface Rod {
  rodIndex: number;
  upperBead: { isActive: boolean };
  lowerBeads: boolean[];
}

// soroban abacus board with proper bead logic
export const AbacusBoard: React.FC<AbacusBoardProps> = ({ 
  mini = false, 
  rodCount: externalRodCount = 13,
  onRodCountChange,
  showControls = true 
}) => {
  const [rodCount, setRodCount] = useState(externalRodCount);
  
  // dimensions based on mini mode
  const FRAME_HEIGHT = mini ? 240 : 380;
  const BEAM_Y = mini ? 80 : 130;
  const BEAD_SIZE = mini ? 24 : 36;
  const ROD_WIDTH = mini ? 3 : 4;
  const BEAD_SPACING = mini ? 28 : 40;

  // create rods with 1 upper bead (value 5) and 4 lower beads (value 1 each)
  const createRods = (count: number): Rod[] => 
    Array.from({ length: count }, (_, rodIndex) => ({
      rodIndex,
      upperBead: { isActive: false },
      lowerBeads: [false, false, false, false]
    }));

  const [abacusState, setAbacusState] = useState(() => createRods(rodCount));

  useEffect(() => {
    setRodCount(externalRodCount);
    setAbacusState(createRods(externalRodCount));
  }, [externalRodCount]);

  // toggle upper bead (heaven bead - value 5)
  const toggleUpperBead = (rodIndex: number) => {
    setAbacusState(prev => 
      prev.map((rod, index) =>
        index === rodIndex
          ? { ...rod, upperBead: { isActive: !rod.upperBead.isActive } }
          : rod
      )
    );
  };

  // toggle lower bead (earth beads - value 1 each)
  const toggleLowerBead = (rodIndex: number, beadIndex: number) => {
    setAbacusState(prev =>
      prev.map((rod, index) => {
        if (index !== rodIndex) return rod;
        const newLowerBeads = [...rod.lowerBeads];
        newLowerBeads[beadIndex] = !newLowerBeads[beadIndex];
        return { ...rod, lowerBeads: newLowerBeads };
      })
    );
  };

  const resetAbacus = () => {
    setAbacusState(createRods(rodCount));
  };

  const handleRodCountChange = (newCount: number) => {
    if (newCount >= 1 && newCount <= 20) {
      setRodCount(newCount);
      setAbacusState(createRods(newCount));
      onRodCountChange?.(newCount);
    }
  };

  return (
    <div className={`${mini ? 'p-2' : 'p-4 md:p-6'}`}>
      {/* rod count controls */}
      {!mini && showControls && (
        <div className="mb-4 flex items-center gap-4 flex-wrap">
          <span className="text-gray-300 text-sm">Rods:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleRodCountChange(Math.max(1, rodCount - 1))}
              className="bg-[#161618] hover:bg-[#2a2a2d] text-yellow-600 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              disabled={rodCount <= 1}
            >
              −
            </button>
            <div className="bg-[#0f0f10] text-white px-4 py-2 rounded-lg w-16 text-center font-mono">
              {rodCount}
            </div>
            <button
              onClick={() => handleRodCountChange(Math.min(20, rodCount + 1))}
              className="bg-[#161618] hover:bg-[#2a2a2d] text-yellow-600 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              disabled={rodCount >= 20}
            >
              +
            </button>
          </div>
          <button
            onClick={resetAbacus}
            className="ml-auto bg-[#161618] hover:bg-[#2a2a2d] text-yellow-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
          >
            <ArrowCounterClockwise size={18} />
            Reset
          </button>
        </div>
      )}

      {/* mini reset button */}
      {mini && (
        <div className="mb-2 flex justify-end">
          <button
            onClick={resetAbacus}
            className="bg-[#161618] hover:bg-[#2a2a2d] text-yellow-600 p-2 rounded-lg transition-all"
            title="Reset"
          >
            <ArrowCounterClockwise size={16} />
          </button>
        </div>
      )}

      {/* abacus frame */}
      <div 
        className={` ${mini ? 'custom-scrollbar-mini' : 'custom-scrollbar'}`}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#2a2a2d #0f0f10'
        }}
      >
        <div
          className="relative mx-auto"
          style={{ 
            height: FRAME_HEIGHT, 
            width: `${Math.max(mini ? 200 : 300, rodCount * (mini ? 40 : 60))}px`,
            minWidth: mini ? '200px' : '300px',
            background: '#0f0f10',
            border: '2px solid #ca8a04',
            borderRadius: mini ? '12px' : '16px'
          }}
        >
          {/* horizontal beam */}
          <div
            className="absolute left-0 right-0 flex items-center justify-center pointer-events-none"
            style={{ top: BEAM_Y, height: mini ? 8 : 12, zIndex: 10 }}
          >
            <div
              className="shadow-lg pointer-events-none"
              style={{
                height: mini ? '6px' : '8px',
                width: '100%',
                background: '#ca8a04',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                opacity: 0.6
              }}
            />
          </div>

          {/* rods and beads */}
          <div className="absolute left-0 top-0 w-full h-full flex justify-evenly px-4 pointer-events-none" style={{ zIndex: 5 }}>
            {abacusState.map((rod, rodIndex) => (
              <div
                key={rodIndex}
                className="relative flex flex-col items-center pointer-events-none"
                style={{ height: FRAME_HEIGHT, width: BEAD_SIZE + 8 }}
              >
                {/* rod */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                  style={{
                    top: 0,
                    height: FRAME_HEIGHT,
                    width: ROD_WIDTH,
                    background: '#161618',
                    borderRadius: mini ? 3 : 4,
                    zIndex: 1,
                    boxShadow: '0 0 4px rgba(0,0,0,0.3)'
                  }}
                />

                {/* upper bead (heaven) */}
                <div
                  className={`absolute cursor-pointer shadow-lg flex items-center justify-center ${
                    rod.upperBead.isActive ? 'bg-yellow-600' : 'bg-[#2a2a2d] hover:bg-[#3a3a3d]'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleUpperBead(rodIndex);
                  }}
                  style={{
                    width: BEAD_SIZE,
                    height: BEAD_SIZE,
                    left: '50%',
                    transform: 'translateX(-50%) rotate(45deg)',
                    top: rod.upperBead.isActive ? BEAM_Y - BEAD_SIZE - 4 : mini ? 12 : 20,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    zIndex: 50,
                    pointerEvents: 'auto',
                    borderRadius: mini ? '3px' : '4px'
                  }}
                >
                  <div 
                    className="bg-white opacity-20" 
                    style={{ 
                      width: '30%', 
                      height: '30%', 
                      transform: 'rotate(-45deg)', 
                      borderRadius: '50%' 
                    }} 
                  />
                </div>

                {/* lower beads (earth) */}
                {Array.from({ length: 4 }, (_, beadIndex) => {
                  const isActive = rod.lowerBeads[beadIndex];
                  const top = isActive
                    ? BEAM_Y + (mini ? 16 : 24) + (beadIndex * BEAD_SPACING)
                    : FRAME_HEIGHT - BEAD_SIZE - (mini ? 12 : 16) - ((3 - beadIndex) * BEAD_SPACING);
                  
                  return (
                    <div
                      key={beadIndex}
                      className={`absolute cursor-pointer shadow-lg flex items-center justify-center ${
                        isActive ? 'bg-yellow-600' : 'bg-[#2a2a2d] hover:bg-[#3a3a3d]'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleLowerBead(rodIndex, beadIndex);
                      }}
                      style={{
                        width: BEAD_SIZE,
                        height: BEAD_SIZE,
                        left: '50%',
                        transform: 'translateX(-50%) rotate(45deg)',
                        top,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        zIndex: 50,
                        pointerEvents: 'auto',
                        borderRadius: mini ? '3px' : '4px'
                      }}
                    >
                      <div 
                        className="bg-white opacity-20" 
                        style={{ 
                          width: '30%', 
                          height: '30%', 
                          transform: 'rotate(-45deg)', 
                          borderRadius: '50%' 
                        }} 
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* place value dots */}
          <div className="absolute left-0 top-0 w-full h-full flex justify-evenly px-4 pointer-events-none" style={{ zIndex: 15 }}>
            {abacusState.map((_, rodIndex) => {
              const positionFromRight = rodCount - 1 - rodIndex;
              const shouldHaveDot = positionFromRight % 3 === 0;
              
              return (
                <div
                  key={`dot-${rodIndex}`}
                  className="relative flex flex-col items-center pointer-events-none"
                  style={{ height: FRAME_HEIGHT, width: BEAD_SIZE + 8 }}
                >
                  {shouldHaveDot && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                      style={{
                        top: BEAM_Y,
                        width: mini ? 6 : 8,
                        height: mini ? 6 : 8,
                        background: 'white',
                        borderRadius: '50%',
                        zIndex: 12,
                        boxShadow: '0 0 4px rgba(255,255,255,0.6)',
                        border: '1px solid rgba(255,255,255,0.8)'
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f0f10;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2a2a2d;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3a3a3d;
        }
        .custom-scrollbar-mini::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar-mini::-webkit-scrollbar-track {
          background: #0f0f10;
          border-radius: 2px;
        }
        .custom-scrollbar-mini::-webkit-scrollbar-thumb {
          background: #2a2a2d;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};
