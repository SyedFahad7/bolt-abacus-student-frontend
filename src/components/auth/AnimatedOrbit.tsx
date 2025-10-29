import React, { useEffect, useMemo, useRef, useState } from 'react';
import plus from '../../assets/images/plus.png';
import multiplication from '../../assets/images/multiplication.png';
import division from '../../assets/images/division.png';
import subtraction from '../../assets/images/subtraction.png';
import equal from '../../assets/images/equal.png';
import abacus from '../../assets/images/abacus.png';
import puzzle from '../../assets/images/puzzle.png';
import mind from '../../assets/images/mind.png';

const Icon: React.FC<{ src: string; size?: number; alt: string }> = ({ src, size = 40, alt }) => (
  <img src={src} width={size} height={size} alt={alt} className="drop-shadow-[0_0_12px_rgba(250,203,37,0.15)] select-none pointer-events-none" />
);

const AnimatedOrbit: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [sceneSize, setSceneSize] = useState<number>(420);

  useEffect(() => {
    const update = () => {
      if (!sceneRef.current) return;
      const w = sceneRef.current.offsetWidth;
      setSceneSize(w);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const RING_GAP = 28; // spacing between rings in px

  // Precompute all radii so we can draw rings and place icons on exact lines
  const ringRadii = useMemo(() => {
    const half = Math.floor(sceneSize / 2);
    const maxR = half - 6; 
    const radii: number[] = [];
    const start = RING_GAP * 3;
    for (let r = start; r <= maxR; r += RING_GAP) {
      radii.push(r);
    }
    return radii;
  }, [sceneSize]);

  return (
    <div className="relative w-full h-full min-h-[520px] flex items-center justify-center pointer-events-none">
      <div
        ref={sceneRef}
        className="relative aspect-square w-[min(38vw,70vh)] max-w-[540px] min-w-[300px] rounded-full overflow-visible"
      >
        {ringRadii.map((r, i) => (
          <div
            key={`ring-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${r * 2}px`,
              height: `${r * 2}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: '1px solid rgba(250,203,37,0.08)'
            }}
          />
        ))}
        {/* Title */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h2 className="text-5xl md:text-6xl font-semibold bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent select-none">
            Bolt Abacus
          </h2>
        </div>

        {(() => {
          const icons = [
            { src: plus, alt: 'plus', size: 26 },
            { src: equal, alt: 'equal', size: 24 },
            { src: multiplication, alt: 'multiplication', size: 28 },
            { src: subtraction, alt: 'subtraction', size: 26 },
            { src: abacus, alt: 'abacus', size: 28 },
            { src: division, alt: 'division', size: 28 },
            { src: puzzle, alt: 'puzzle', size: 26 },
            { src: mind, alt: 'mind', size: 26 },
          ];

          const count = Math.min(8, ringRadii.length);
          const picks: number[] = [];
          for (let i = 0; i < count; i++) {
            const t = i / Math.max(1, count - 1);
            const idx = Math.max(0, Math.min(ringRadii.length - 1, Math.round(t * (ringRadii.length - 1))));
            if (!picks.includes(idx)) picks.push(idx);
          }

          const angles = [-30, 65, 130, 300, 225, 440, 5, 160];

          return picks.map((ringIdx, i) => {
            const r = ringRadii[ringIdx];
            const angle = angles[i % angles.length];
            const icon = icons[i % icons.length];
            return (
              <div
                key={`icon-${i}`}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${r}px) rotate(${-angle}deg)`,
                }}
              >
                <Icon src={icon.src} alt={icon.alt} size={icon.size} />
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
};

export default AnimatedOrbit;
