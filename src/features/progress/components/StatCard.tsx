import { Card, CardContent } from '../../../components/Card';
import { Flame, Trophy, Star, Medal } from '@phosphor-icons/react';

interface StatCardProps {
  icon: 'Flame' | 'Trophy' | 'Star' | 'Medal';
  iconColor: string;
  value: string;
  label: string;
  subtitle?: string;
  progress?: number;
}

const iconMap = {
  Flame: Flame,
  Trophy: Trophy,
  Star: Star,
  Medal: Medal,
};

export default function StatCard({ icon, iconColor, value, label, subtitle, progress = 0 }: StatCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <Card className="bg-[#0f0f10] border-[#2a2a2d] hover:border-yellow-600/30 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <IconComponent size={32} className={iconColor} weight="fill" />
        </div>
        <div className="mb-1">
          <div className="text-4xl font-bold text-yellow-600 mb-2">{value}</div>
          <div className="text-white/60 text-sm">{label}</div>
          {subtitle && <div className="text-white/40 text-xs mt-1">{subtitle}</div>}
        </div>
        {progress > 0 && (
          <div className="mt-4">
            <div className="h-2 bg-[#2a2a2d] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-600 to-orange-400 transition-all duration-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
