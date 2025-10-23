import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';
import { Target } from '@phosphor-icons/react';

interface WeeklyGoalsProps {
  goals: {
    practiceModes: { current: number; target: number };
    practiceTime: { current: number; target: number };
    problemsSolved: { current: number; target: number };
  };
}

export default function WeeklyGoals({ goals }: WeeklyGoalsProps) {
  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Card className="bg-[#0f0f10] border-yellow-600/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Target size={24} className="text-yellow-600" weight="fill" />
          <CardTitle className="text-xl font-bold text-white">This Week's Goals</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 ">
        {/* Practice Mode Played */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80 text-sm">Practice Mode Played</span>
            <span className="text-white/60 text-xs">
              {goals.practiceModes.current}/{goals.practiceModes.target}
            </span>
          </div>
          <div className="h-2 bg-[#2a2a2d] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-600 to-orange-400 transition-all duration-500"
              style={{ width: `${calculateProgress(goals.practiceModes.current, goals.practiceModes.target)}%` }}
            />
          </div>
        </div>

        {/* Practice Time */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80 text-sm">Practice Time</span>
            <span className="text-white/60 text-xs">
              {formatTime(goals.practiceTime.current)}/{formatTime(goals.practiceTime.target)}
            </span>
          </div>
          <div className="h-2 bg-[#2a2a2d] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-600 to-orange-400 transition-all duration-500"
              style={{ width: `${calculateProgress(goals.practiceTime.current, goals.practiceTime.target)}%` }}
            />
          </div>
        </div>

        {/* Problems Solved */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80 text-sm">Problems Solved</span>
            <span className="text-white/60 text-xs">
              {goals.problemsSolved.current}/{goals.problemsSolved.target}
            </span>
          </div>
          <div className="h-2 bg-[#2a2a2d] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-600 to-orange-400 transition-all duration-500"
              style={{ width: `${calculateProgress(goals.problemsSolved.current, goals.problemsSolved.target)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
