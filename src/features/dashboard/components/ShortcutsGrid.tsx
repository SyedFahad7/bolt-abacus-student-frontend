import type { FC } from 'react';
import { useRef } from 'react';

export interface ShortcutsGridProps {
  className?: string;
}

const ShortcutsGrid: FC<ShortcutsGridProps> = ({ className = '' }) => {
  const shortcuts = [
    {
      id: 1,
      icon: '🗺️',
      title: 'Path of Conquest',
      description: 'View your learning journey',
      link: '#',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 2,
      icon: '🎯',
      title: 'Solo Training Ground',
      description: 'Improve your math skills',
      link: '#',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 3,
      icon: '⚔️',
      title: 'Epic Battle Ground',
      description: 'Challenge other students',
      link: '#',
      color: 'from-red-500 to-red-600',
    },
    {
      id: 4,
      icon: '🧮',
      title: 'Virtual Abacus',
      description: 'Interactive abacus tool',
      link: '#',
      color: 'from-purple-500 to-purple-600',
    },
  ];
  return (
    <div className={`text-white ${className}`}>
      <div className="grid grid-cols-2 tablet:grid-cols-4 gap-4 tablet:gap-6">
        {shortcuts.map((shortcut) => {
          const cardRef = useRef<HTMLDivElement>(null);
          const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            cardRef.current.style.setProperty('--mouse-x', `${x}px`);
            cardRef.current.style.setProperty('--mouse-y', `${y}px`);
          };
          return (
            <a
              key={shortcut.id}
              href={shortcut.link}
              className="block group"
            >
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                className="bg-[#161618] hover:bg-[#1a1a1c] p-4 tablet:p-6 rounded-2xl transition-all duration-300 hover:scale-105 group relative overflow-hidden border border-[#333] hover:border-[#444]"
                style={{
                  '--mouse-x': '50%',
                  '--mouse-y': '50%',
                  '--spotlight-color': 'rgba(255, 186, 8, 0.1)'
                } as React.CSSProperties}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-400 pointer-events-none rounded-2xl"
                  style={{
                    background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
                  }}
                ></div>
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 tablet:w-20 tablet:h-20 rounded-2xl bg-[#2a2a2d] group-hover:scale-110 group-hover:rotate-12 group-hover:bg-[#ffba08] transition-all duration-300 flex items-center justify-center text-2xl tablet:text-3xl">
                    {shortcut.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg tablet:text-xl mb-2">
                      {shortcut.title}
                    </h3>
                    <p className="text-sm text-[#818181] font-medium">
                      {shortcut.description}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ShortcutsGrid;
