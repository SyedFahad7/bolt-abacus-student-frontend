import type { ReactNode } from 'react';
import { Card, CardContent } from '../../../components/Card';

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  gradient: string;
  borderColor: string;
  textColor: string;
  shadowColor: string;
}

const StatsCard = ({ 
  icon, 
  label, 
  value, 
  gradient, 
  borderColor, 
  textColor, 
  shadowColor 
}: StatsCardProps) => {
  return (
    <Card
      className={`bg-[#0f0f10] border ${borderColor}`}
      style={{
        background: gradient,
        boxShadow: `${shadowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
      }}
    >
      <CardContent className="p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          {icon}
        </div>
        <div className="text-xl font-bold text-white">
          {value}
        </div>
        <div className={`text-xs ${textColor}`}>
          {label}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
