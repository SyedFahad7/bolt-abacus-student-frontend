import type { FC } from 'react';
import { useState } from 'react';

interface LeaderboardEntry {
  userId: number;
  firstName: string;
  lastName: string;
  totalSessions: number;
  accuracy: number;
  speed: number;
  isCurrentUser: boolean;
}

interface LeaderboardsData {
  speedLeaderboard: LeaderboardEntry[];
  accuracyLeaderboard: LeaderboardEntry[];
}

interface LeaderboardsCardProps {
  className?: string;
}

const dummyData: LeaderboardsData = {
  speedLeaderboard: [
    { userId: 1, firstName: 'Emma', lastName: 'Johnson', totalSessions: 20, accuracy: 98, speed: 45, isCurrentUser: false },
    { userId: 2, firstName: 'Alex', lastName: 'Chen', totalSessions: 18, accuracy: 95, speed: 42, isCurrentUser: false },
    { userId: 3, firstName: 'You', lastName: '', totalSessions: 15, accuracy: 92, speed: 40, isCurrentUser: true },
  ],
  accuracyLeaderboard: [
    { userId: 1, firstName: 'Emma', lastName: 'Johnson', totalSessions: 20, accuracy: 98, speed: 45, isCurrentUser: false },
    { userId: 2, firstName: 'Alex', lastName: 'Chen', totalSessions: 18, accuracy: 95, speed: 42, isCurrentUser: false },
    { userId: 3, firstName: 'You', lastName: '', totalSessions: 15, accuracy: 92, speed: 40, isCurrentUser: true },
  ],
};

const LeaderboardsCard: FC<LeaderboardsCardProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'speed' | 'accuracy'>('speed');
  const leaderboardsData = dummyData;
  const getRankIcon = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };
  const getRankColor = (index: number) => {
    if (index === 0) return 'text-yellow-400';
    if (index === 1) return 'text-gray-300';
    if (index === 2) return 'text-orange-400';
    if (index < 5) return 'text-green-400';
    return 'text-gray-400';
  };
  const currentLeaderboard = activeTab === 'speed'
    ? leaderboardsData.speedLeaderboard
    : leaderboardsData.accuracyLeaderboard;
  return (
    <div className={`bg-[#212124] p-6 rounded-lg border border-[#facb25]/20 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-[#facb25]">Leaderboards</h3>
          <p className="text-xs text-yellow-400 mt-1">🏆 Top performers in your class</p>
        </div>
        <div className="text-2xl">🏆</div>
      </div>
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setActiveTab('speed')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'speed'
              ? 'bg-[#facb25] text-black'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          ⚡ Speed
        </button>
        <button
          onClick={() => setActiveTab('accuracy')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'accuracy'
              ? 'bg-[#facb25] text-black'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          🎯 Accuracy
        </button>
      </div>
      <div className="space-y-2">
        {currentLeaderboard.map((entry, index) => (
          <div
            key={entry.userId}
            className={`flex items-center justify-between p-3 rounded-lg ${
              entry.isCurrentUser
                ? 'bg-[#facb25]/20 border border-[#facb25]/40'
                : index < 3
                  ? 'bg-gray-800/50'
                  : 'bg-gray-800/30'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className={`text-lg ${getRankColor(index)}`}>{getRankIcon(index)}</span>
              <div>
                <p className={`text-sm font-medium ${
                  entry.isCurrentUser ? 'text-[#facb25]' : 'text-gray-200'
                }`}>
                  {entry.firstName} {entry.lastName}
                  {entry.isCurrentUser && ' (You)'}
                </p>
                <p className="text-xs text-gray-400">
                  {entry.totalSessions} sessions
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-[#facb25]">
                {activeTab === 'speed'
                  ? `${entry.speed} problems/min`
                  : `${entry.accuracy}%`}
              </p>
              <p className="text-xs text-gray-400">
                {activeTab === 'speed'
                  ? `${entry.accuracy}% accuracy`
                  : `${entry.speed} problems/min`}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-700">
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <span>🥇</span>
            <span>1st</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>🥈</span>
            <span>2nd</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>🥉</span>
            <span>3rd</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardsCard;
