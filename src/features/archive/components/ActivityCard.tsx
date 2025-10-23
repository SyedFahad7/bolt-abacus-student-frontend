import { Clock, TrendUp } from '@phosphor-icons/react';
import { Card, CardContent } from '../../../components/Card';

interface ActivityCardProps {
  title: string;
  type: 'practice' | 'pvp' | 'flashcard';
  score?: number;
  xpEarned?: number;
  timestamp: string;
  icon: React.ReactNode;
}

const ActivityCard = ({ 
  title, 
  type, 
  score, 
  xpEarned, 
  timestamp, 
  icon 
}: ActivityCardProps) => {
  // get type color
  const getTypeColor = () => {
    switch (type) {
      case 'pvp':
        return 'text-purple-400 border-purple-400/30 bg-purple-500/10';
      case 'flashcard':
        return 'text-blue-400 border-blue-400/30 bg-blue-500/10';
      default:
        return 'text-green-400 border-green-400/30 bg-green-500/10';
    }
  };

  return (
    <Card className="bg-[#0f0f10] border-[#2a2a2d] hover:border-yellow-600/50 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* icon */}
          <div className={`p-2 rounded-lg border ${getTypeColor()}`}>
            {icon}
          </div>

          {/* content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate">
              {title}
            </h3>
            
            {/* details */}
            <div className="flex items-center gap-3 mt-2 flex-wrap text-xs text-white/60">
              <div className="flex items-center gap-1">
                <Clock size={12} weight="bold" />
                {timestamp}
              </div>
              
              {score !== undefined && (
                <div className="text-white/80">
                  Score: <span className="font-semibold text-white">{score}</span>
                </div>
              )}
            </div>
          </div>

          {/* xp badge */}
          {xpEarned !== undefined && xpEarned > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-600/10 border border-yellow-600/30">
              <TrendUp size={14} weight="bold" className="text-yellow-600" />
              <span className="text-xs font-semibold text-yellow-600">+{xpEarned} XP</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
