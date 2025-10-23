import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/Card';
import { ChartLine } from '@phosphor-icons/react';

interface TrendChartProps {
  title: string;
  subtitle: string;
  value: string;
  valueLabel: string;
  weeklyProgress: number;
  data: number[];
  labels: string[];
  color?: string;
  emptyMessage?: string;
}

export default function TrendChart({
  title,
  subtitle,
  value,
  valueLabel,
  weeklyProgress,
  data,
  labels,
  color = '#facb25',
  emptyMessage,
}: TrendChartProps) {
  const hasData = data.some((v) => v > 0);
  const maxValue = Math.max(...data, 1);

  return (
    <Card className="bg-[#0f0f10] border-[#2a2a2d] hover:border-yellow-600/30 transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-white/60">
          <ChartLine size={16} />
          {subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="text-4xl font-bold text-white mb-1">{value}</div>
          <div className="text-white/60 text-sm">{valueLabel}</div>
        </div>

        {hasData ? (
          <>
            {/* Chart */}
            <div className="relative h-32 mb-4">
              <svg className="w-full h-full" viewBox="0 0 700 128" preserveAspectRatio="none">
                {/* Grid lines */}
                <line x1="0" y1="32" x2="700" y2="32" stroke="#2a2a2d" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="64" x2="700" y2="64" stroke="#2a2a2d" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="96" x2="700" y2="96" stroke="#2a2a2d" strokeWidth="1" strokeDasharray="4 4" />

                {/* Line chart */}
                <polyline
                  fill="none"
                  stroke={color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={data
                    .map((value, index) => {
                      const x = (index / (data.length - 1)) * 700;
                      const y = 128 - (value / maxValue) * 120;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />

                {/* Points */}
                {data.map((value, index) => {
                  const x = (index / (data.length - 1)) * 700;
                  const y = 128 - (value / maxValue) * 120;
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="6"
                      fill={color}
                      stroke="#0f0f10"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Labels */}
            <div className="flex justify-between text-xs text-white/40">
              {labels.map((label, index) => (
                <span key={index}>{label}</span>
              ))}
            </div>

            {/* Weekly Progress */}
            <div className="mt-4 pt-4 border-t border-[#2a2a2d]">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60">Weekly Progress</span>
                <span className="text-yellow-600 font-semibold">
                  {weeklyProgress > 0 ? `+${weeklyProgress}` : weeklyProgress}
                  {title.includes('Accuracy') || title.includes('Efficiency') ? '%' : ''}
                </span>
              </div>
              <div className="text-white/40 text-xs mt-1">
                {data.filter((v) => v > 0).length} active days
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <ChartLine size={48} className="text-white/20 mx-auto mb-3" />
            <p className="text-white/40 text-sm">{emptyMessage || 'No data available yet'}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
