import React from 'react';

interface SpotlightCardProps {
  className?: string;
  spotlightColor?: string;
  children: React.ReactNode;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ className = '', spotlightColor = 'rgba(255, 186, 8, 0.12)', children }) => {
  return (
    <div
      className={`relative rounded-2xl p-6 bg-[#161618] border border-[#333] shadow-lg overflow-hidden ${className}`}
      style={{ background: `radial-gradient(circle at 50% 0%, ${spotlightColor}, transparent 70%)` }}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
