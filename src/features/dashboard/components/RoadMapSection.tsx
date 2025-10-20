import type { FC } from 'react';

export interface RoadmapSectionProps {
  currentLevel?: number;
  currentClass?: number;
}

const RoadmapSection: FC<RoadmapSectionProps> = ({
  currentLevel = 2,
  currentClass = 1,
}) => {
  const progress = [0, 100, 80, 60, 0, 0, 0, 0, 0, 0, 0]; //dummy progress
  return (
    <div className="px-6 tablet:p-10 desktop:px-24">
      <p className="font-medium text-md desktop:text-lg" style={{ color: '#ffffff' }}>Path of Conquest</p>
      <div className="text-sm text-gray-400 mb-4">Current Class: {currentClass}</div>
      <div className="grid grid-cols-1 gap-10 tablet:grid-cols-2 desktop:grid-cols-3">
        {progress.slice(1).map((p, i) => {
          const level = i + 1;
          const isCurrent = level === currentLevel;
          return (
            <div
              key={i}
              className={`p-4 rounded-lg border bg-[#191919] text-white flex flex-col items-center ${isCurrent ? 'ring-2 ring-yellow-400' : ''}`}
              aria-current={isCurrent ? 'true' : undefined}
            >
              <div className="text-lg font-bold mb-2">Level {level}{isCurrent ? ' — Current' : ''}</div>
              <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                <div className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 h-3 rounded-full" style={{ width: `${p}%` }} />
              </div>
              <div className="text-xs text-gray-400">{p === 100 ? 'Completed' : p > 0 ? 'In Progress' : 'Locked'}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapSection;
