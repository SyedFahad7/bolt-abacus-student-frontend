import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';

interface UserStatsCardProps {
  totalXP: number;
  level: number;
  rank: number;
  nextLevelXP: number;
  totalPlayers: number;
}

const UserStatsCard = ({ 
  totalXP, 
  level, 
  rank, 
  nextLevelXP,
  totalPlayers 
}: UserStatsCardProps) => {
  const progressPercent = Math.min(100, (totalXP / nextLevelXP) * 100);

  return (
    <Card className="bg-[#0f0f10] border-[#2a2a2d]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white flex items-center">
          <span className="mr-2">👤</span>
          Your Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total XP Card */}
        <Card className="bg-[#161618] border-[#2a2a2d]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white/60">Total XP</span>
              <span className="text-2xl font-bold text-white">{totalXP.toLocaleString()}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#0f0f10]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transition-all duration-500"
                style={{ width: `${Math.min(100, (totalXP / 50000) * 100)}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Level & Rank Row */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-[#161618] border-blue-400/30">
            <CardContent className="p-4 text-center">
              <div className="text-xs font-medium mb-1 text-blue-400">XP Level</div>
              <div className="text-2xl font-bold text-white">{level}</div>
            </CardContent>
          </Card>
          <Card className="bg-[#161618] border-green-400/30">
            <CardContent className="p-4 text-center">
              <div className="text-xs font-medium mb-1 text-green-400">Rank</div>
              <div className="text-2xl font-bold text-white">
                {rank > 0 ? `#${rank}` : '—'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Level Progress */}
        <Card className="bg-[#161618] border-cyan-400/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-cyan-400">Next Level</span>
              <span className="text-sm font-semibold text-white">
                {totalXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#0f0f10] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Players */}
        <Card className="bg-[#161618] border-purple-400/30">
          <CardContent className="p-4 text-center">
            <div className="text-xs font-medium mb-1 text-purple-400">Total Players</div>
            <div className="text-2xl font-bold text-white">{totalPlayers.toLocaleString()}</div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default UserStatsCard;
