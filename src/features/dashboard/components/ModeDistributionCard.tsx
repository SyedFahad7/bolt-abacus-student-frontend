import type { FC } from 'react';

interface ModeDistribution {
  mode: string;
  count: number;
  percentage: number;
}

interface ModeDistributionCardProps {
  className?: string;
}

const dummyData: ModeDistribution[] = [
  { mode: 'Timed', count: 10, percentage: 50 },
  { mode: 'Untimed', count: 6, percentage: 30 },
  { mode: 'Flashcards', count: 4, percentage: 20 },
];

const ModeDistributionCard: FC<ModeDistributionCardProps> = ({ className = '' }) => {
  const modeDistribution = dummyData;
  const getModeIcon = (mode: string) => {
    switch (mode.toLowerCase()) {
      case 'flashcards':
        return '🃏';
      case 'untimed':
        return '⏰';
      case 'timed':
        return '⚡';
      case 'set':
        return '📚';
      default:
        return '🎯';
    }
  };
  const getModeColor = (mode: string, index: number) => {
    const colors = [
      '#facb25', '#3b82f6', '#ef4444', '#10b981', '#8b5cf6', '#f59e0b',
    ];
    return colors[index % colors.length];
  };
  const renderPieChart = () => {
    if (modeDistribution.length === 0) return null;
    let cumulativePercentage = 0;
    const radius = 60;
    const centerX = 80;
    const centerY = 80;
    return (
      <svg width="160" height="160" className="mx-auto">
        {modeDistribution.map((mode, index) => {
          const startAngle = (cumulativePercentage / 100) * 360;
          const endAngle = ((cumulativePercentage + mode.percentage) / 100) * 360;
          const startAngleRad = (startAngle - 90) * (Math.PI / 180);
          const endAngleRad = (endAngle - 90) * (Math.PI / 180);
          const x1 = centerX + radius * Math.cos(startAngleRad);
          const y1 = centerY + radius * Math.sin(startAngleRad);
          const x2 = centerX + radius * Math.cos(endAngleRad);
          const y2 = centerY + radius * Math.sin(endAngleRad);
          const largeArcFlag = mode.percentage > 50 ? 1 : 0;
          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z',
          ].join(' ');
          cumulativePercentage += mode.percentage;
          return (
            <path
              key={mode.mode}
              d={pathData}
              fill={getModeColor(mode.mode, index)}
              stroke="#1f2937"
              strokeWidth="2"
              className="hover:opacity-80 transition-opacity"
            />
          );
        })}
        <circle
          cx={centerX}
          cy={centerY}
          r="30"
          fill="#212124"
          stroke="#374151"
          strokeWidth="2"
        />
        <text
          x={centerX}
          y={centerY - 5}
          textAnchor="middle"
          className="text-xs font-bold fill-[#facb25]"
        >
          {modeDistribution.reduce((sum, mode) => sum + mode.count, 0)}
        </text>
        <text
          x={centerX}
          y={centerY + 10}
          textAnchor="middle"
          className="text-xs fill-white"
        >
          Sessions
        </text>
      </svg>
    );
  };
  if (modeDistribution.length === 0) {
    return (
      <div className={`bg-[#212124] p-6 rounded-lg border border-[#facb25]/20 ${className}`}>
        <div className="text-center text-gray-400">
          <p>No practice data available</p>
          <p className="text-xs mt-1">Complete some practice to see your mode distribution!</p>
        </div>
      </div>
    );
  }
  const favoriteMode = modeDistribution[0];
  return (
    <div className={`bg-[#212124] p-6 rounded-lg border border-[#facb25]/20 ${className}`}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-[#facb25]">Favorite Mode</h3>
            <p className="text-xs text-yellow-400 mt-1">📊 Your most played practice type</p>
          </div>
          <div className="text-2xl">{getModeIcon(favoriteMode?.mode || '')}</div>
        </div>
        {favoriteMode && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getModeIcon(favoriteMode.mode)}</span>
                <div>
                  <p className="font-semibold text-[#facb25]">
                    {favoriteMode.mode}
                  </p>
                  <p className="text-xs text-gray-400">
                    {favoriteMode.count} sessions ({favoriteMode.percentage}%)
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#facb25] to-[#d4a017] h-2 rounded-full transition-all duration-300"
                style={{ width: `${favoriteMode.percentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-gray-700 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-[#facb25]">Mode Distribution</h3>
            <p className="text-xs text-yellow-400 mt-1">📊 Your practice mode breakdown</p>
          </div>
          <div className="text-2xl">📊</div>
        </div>
        <div className="flex justify-center mb-6">{renderPieChart()}</div>
        <div className="space-y-2">
          {modeDistribution.map((mode, index) => (
            <div key={mode.mode} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getModeColor(mode.mode, index) }}
                ></div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getModeIcon(mode.mode)}</span>
                  <span className="text-sm font-medium text-gray-200">
                    {mode.mode}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#facb25]">
                  {mode.percentage}%
                </p>
                <p className="text-xs text-red">
                  {mode.count} sessions
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Total Sessions</span>
            <span className="font-semibold text-[#facb25]">
              {modeDistribution.reduce((sum, mode) => sum + mode.count, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeDistributionCard;
