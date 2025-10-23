import Sidebar from '../../components/Sidebar';
import MainContent from '../../components/layout/MainContent';
import StatCard from './components/StatCard.tsx';
import WeeklyGoals from './components/WeeklyGoals.tsx';
import MotivationalCard from './components/MotivationalCard.tsx';
import TrendChart from './components/TrendChart.tsx';
import { Flame, Trophy } from '@phosphor-icons/react';

export default function ProgressPage() {
  const dummyStats = {
    overallProgress: 67,
    realmsMastered: 0,
    averageScore: 45,
    conquestsCompleted: 2,
    totalConquests: 62,
    streak: 2,
    xp: 4970,
  };

  const dummyWeeklyGoals = {
    practiceModes: { current: 1, target: 100 },
    practiceTime: { current: 2, target: 240 }, // minutes
    problemsSolved: { current: 10, target: 300 },
  };

  const dummyPracticeAccuracy = {
    current: 22,
    weeklyProgress: 22,
    data: [0, 5, 10, 15, 18, 20, 22],
    labels: ['6d ago', '', '', '', '', '', 'Today'],
  };

  const dummyPracticeSpeed = {
    current: 0,
    weeklyProgress: 0,
    data: [0, 0, 0, 0, 0, 0, 0],
    labels: ['6d ago', '', '', '', '', '', 'Today'],
  };

  const dummyPvpAccuracy = {
    current: 0,
    weeklyProgress: 0,
    data: [0, 0, 0, 0, 0, 0, 0],
    labels: ['6d ago', '', '', '', '', '', 'Today'],
  };

  const dummyPvpQuestions = {
    current: 0,
    weeklyProgress: 0,
    data: [0, 0, 0, 0, 0, 0, 0],
    labels: ['6d ago', '', '', '', '', '', 'Today'],
  };

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <div className="w-full space-y-6">
          {/* Header */}
          <div className="flex flex-col tablet:flex-row tablet:justify-between tablet:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Your Learning Journey</h1>
              <p className="text-white/60">Batch: <span className="text-yellow-600">Sankeerth's Empire</span></p>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl px-4 py-3 flex items-center gap-2">
                <Flame size={24} className="text-orange-500" weight="fill" />
                <div>
                  <div className="text-2xl font-bold text-white">{dummyStats.streak}</div>
                  <div className="text-xs text-white/60">Days Streak</div>
                </div>
              </div>
              <div className="bg-[#0f0f10] border border-[#2a2a2d] rounded-xl px-4 py-3 flex items-center gap-2">
                <Trophy size={24} className="text-yellow-600" weight="fill" />
                <div>
                  <div className="text-2xl font-bold text-white">{dummyStats.xp.toLocaleString()}</div>
                  <div className="text-xs text-white/60">XP</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              icon="Flame"
              iconColor="text-purple-400"
              value={`${dummyStats.overallProgress}%`}
              label="Overall Progress"
              subtitle="in Crystal Realm"
              progress={dummyStats.overallProgress}
            />
            <StatCard
              icon="Trophy"
              iconColor="text-yellow-600"
              value={`${dummyStats.realmsMastered}/6`}
              label="Realms Mastered"
              progress={0}
            />
            <StatCard
              icon="Star"
              iconColor="text-yellow-600"
              value={`${dummyStats.averageScore}%`}
              label="Average Score"
              subtitle="in Crystal Realm"
              progress={dummyStats.averageScore}
            />
            <StatCard
              icon="Medal"
              iconColor="text-purple-400"
              value={`${dummyStats.conquestsCompleted}/${dummyStats.totalConquests}`}
              label="Conquests Completed"
              progress={(dummyStats.conquestsCompleted / dummyStats.totalConquests) * 100}
            />
          </div>

          {/* Weekly Goals */}
          <WeeklyGoals goals={dummyWeeklyGoals} />

          {/* Motivational Message */}
          <MotivationalCard message="Ready to begin your learning adventure? Let's get started!" />

          {/* Trend Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TrendChart
              title="Practice Accuracy"
              subtitle="Calculated from your practice work"
              value={`${dummyPracticeAccuracy.current}%`}
              valueLabel="Current Accuracy"
              weeklyProgress={dummyPracticeAccuracy.weeklyProgress}
              data={dummyPracticeAccuracy.data}
              labels={dummyPracticeAccuracy.labels}
              color="#ca8a04"
            />
            <TrendChart
              title="Practice Speed"
              subtitle="Calculated from your practice work"
              value={`${dummyPracticeSpeed.current}`}
              valueLabel="Problems/Minute"
              weeklyProgress={dummyPracticeSpeed.weeklyProgress}
              data={dummyPracticeSpeed.data}
              labels={dummyPracticeSpeed.labels}
              color="#ca8a04"
              emptyMessage="Complete some practice to see your speed!"
            />
            <TrendChart
              title="PvP Accuracy"
              subtitle="Calculated from your PvP battles"
              value={`${dummyPvpAccuracy.current}%`}
              valueLabel="Current Accuracy"
              weeklyProgress={dummyPvpAccuracy.weeklyProgress}
              data={dummyPvpAccuracy.data}
              labels={dummyPvpAccuracy.labels}
              color="#a78bfa"
              emptyMessage="Complete some PvP battles to see your progress!"
            />
            <TrendChart
              title="PvP Questions Completed"
              subtitle="Questions answered correctly in PvP"
              value={`${dummyPvpQuestions.current}`}
              valueLabel="Questions Today"
              weeklyProgress={dummyPvpQuestions.weeklyProgress}
              data={dummyPvpQuestions.data}
              labels={dummyPvpQuestions.labels}
              color="#a78bfa"
              emptyMessage="Complete some PvP battles to see your progress!"
            />
          </div>
        </div>
      </MainContent>
    </div>
  );
}
