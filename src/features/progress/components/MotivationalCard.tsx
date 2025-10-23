import { Card, CardContent } from '../../../components/Card';
import { Sparkle } from '@phosphor-icons/react';

interface MotivationalCardProps {
  message: string;
}

export default function MotivationalCard({ message }: MotivationalCardProps) {
  return (
    <Card className="bg-gradient-to-r from-purple-500/10 to-yellow-600/10 border-yellow-600/20 hover:border-yellow-600/40 transition-all duration-300 cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-center justify-center gap-3">
          <Sparkle size={24} className="text-yellow-600" weight="fill" />
          <p className="text-white text-center text-lg">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
