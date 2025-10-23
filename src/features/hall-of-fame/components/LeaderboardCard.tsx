import { User, Flame, TrendUp } from '@phosphor-icons/react';
import { Card, CardContent } from '../../../components/Card';

interface LeaderboardCardProps {
  rank: number;
  name: string;
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
  isCurrentUser?: boolean;
  onClick?: () => void;
}

const LeaderboardCard = ({ 
  rank, 
  name, 
  avatar, 
  xp, 
  level, 
  streak, 
  isCurrentUser = false,
  onClick 
}: LeaderboardCardProps) => {
  const getRankDisplay = () => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  const getRankStyle = () => {
    if (rank === 1) {
      return {
        bg: 'bg-gradient-to-br from-yellow-600/30 to-yellow-600/10',
        border: 'border-yellow-600/60',
        shadow: 'shadow-lg shadow-yellow-600/20'
      };
    }
    if (rank === 2) {
      return {
        bg: 'bg-gradient-to-br from-gray-300/30 to-gray-300/10',
        border: 'border-gray-300/60',
        shadow: 'shadow-lg shadow-gray-300/20'
      };
    }
    if (rank === 3) {
      return {
        bg: 'bg-gradient-to-br from-amber-600/30 to-amber-600/10',
        border: 'border-amber-600/60',
        shadow: 'shadow-lg shadow-amber-600/20'
      };
    }
    return {
      bg: 'bg-[#161618]',
      border: 'border-white/20',
      shadow: ''
    };
  };

  const rankStyle = getRankStyle();
  const xpProgress = Math.min(100, (xp / 10000) * 100);

  return (
    <Card
      onClick={onClick}
      className={`
        bg-[#0f0f10] border-[#2a2a2d]
        hover:border-yellow-600/50 hover:scale-[1.01]
        transition-all duration-300 cursor-pointer
        ${isCurrentUser ? 'ring-2 ring-yellow-600/50' : ''}
      `}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Rank Badge */}
          <div
            className={`
              w-12 h-12 rounded-full flex items-center justify-center
              text-sm font-bold border relative overflow-hidden
              ${rankStyle.border} ${rankStyle.bg} ${rankStyle.shadow}
            `}
          >
            {rank <= 3 && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            )}
            <span className="relative z-10 text-white">{getRankDisplay()}</span>
          </div>

          {/* Avatar */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm bg-[#161618] border border-[#2a2a2d]"
          >
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <User weight="fill" size={24} />
            )}
          </div>

          {/* Player Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-white truncate">
                  {name}
                  {isCurrentUser && <span className="ml-2 text-yellow-600">(You)</span>}
                </h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span
                    className="text-xs font-medium px-2 py-1 rounded-full bg-blue-500/10 border border-blue-400/40 text-blue-400"
                  >
                    <TrendUp size={12} weight="bold" className="inline mr-1" />
                    Level {level}
                  </span>
                  <span
                    className="text-xs px-2 py-1 rounded-full bg-orange-500/10 border border-orange-400/50 text-orange-400"
                  >
                    <Flame size={12} weight="fill" className="inline mr-1" />
                    {streak} day{streak !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <div className="text-right ml-4 shrink-0">
                <div className="text-lg font-bold text-white">
                  {xp.toLocaleString()}
                </div>
                <div className="text-xs text-white/60">XP</div>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-white/60">Experience</span>
                <span className="text-xs font-semibold text-white">
                  {xp.toLocaleString()} XP
                </span>
              </div>
              <div
                className="w-full h-2 rounded-full bg-[#161618] border border-[#2a2a2d] overflow-hidden"
              >
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out relative bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                  style={{
                    width: `${xpProgress}%`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
