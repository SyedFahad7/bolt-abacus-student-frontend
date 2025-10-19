import type { FC } from 'react';

export interface WelcomeSectionProps {
  currentLevel?: number;
  currentClass?: number;
}

const WelcomeSection: FC<WelcomeSectionProps> = ({ currentLevel = 2, currentClass = 1 }) => {
  // Dummy user name
  const userName = 'Student';
  return (
    <div className="bg-[#1b1b1b] text-white p-6 rounded-lg">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">
          Welcome back, {userName}!
        </h1>
        <p className="text-gray-300">
          You're currently in Level {currentLevel}, Class {currentClass}
        </p>
      </div>
    </div>
  );
};

export default WelcomeSection;
