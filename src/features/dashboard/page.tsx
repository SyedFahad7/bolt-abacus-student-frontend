import Sidebar from '../../components/Sidebar';
import { Lightning, Flame, VideoCamera, BookOpen, Calculator, Sword, Medal, Clock, DotsThreeOutline, ClipboardText } from '@phosphor-icons/react';
import SpotlightCard from './components/SpotlightCard';

const dummyUser = { name: { first: 'Mujahed' } };
const dummyXP = 1234;
const dummyStreak = 5;
const dummyClassLink = '#';
const dummyCurrentLevel = 2;
const dummyCurrentLevelProgressPct = 60;
const dummyAccuracy = 95;
const dummyTimeSpent = '2h 30m';
const dummyRecentActivities = [
  { id: 1, type: 'practice', title: 'Completed Practice Set', timestamp: Date.now() - 3600000, xp: 20 },
  { id: 2, type: 'test', title: 'Passed Level Test', timestamp: Date.now() - 7200000, xp: 50 },
];
const dummyLeaderboard = [
  { userId: 1, rank: 1, name: 'Emma', xp: 2000, level: 2 },
  { userId: 2, rank: 2, name: 'Alex', xp: 1800, level: 2 },
];

const StudentDashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <main className="flex-1 md:ml-64">
        <div className="bg-black min-h-screen p-4 md:p-8">
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-white">Welcome back, {dummyUser.name.first}</h1>
              <p className="text-sm text-[#818181] mb-3">
                Ready to <span className="text-gold">bolt</span> ahead with your math skills today?
              </p>
            </div>
            <div className="flex flex-row items-center space-x-3 mt-2 md:mt-0">
              <span className="bg-[#212124] text-white font-bold px-3 py-2 rounded-xl flex items-center"><Lightning size={20} color="#facb25" weight="fill" className="mr-1" /> {dummyXP} XP</span>
              <span className="bg-[#212124] text-white font-bold px-3 py-2 rounded-xl flex items-center"><Flame size={20} color="#FF6B6B" weight="fill" className="mr-1" /> {dummyStreak} Day Streak</span>
              <a href={dummyClassLink} className="flex bg-[#facb25] text-[#1b1b1b] font-semibold py-2 px-4 rounded-lg items-center"><VideoCamera size={20} color="#1b1b1b" weight="fill" className="mr-1 text-black" /> Join Class</a>
            </div>
          </div>

          {/* Main Cards Row: Progress & Personal Goals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SpotlightCard className="text-white group" spotlightColor="rgba(255, 186, 8, 0.12)">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex items-center justify-center w-12 h-12 bg-[#2a2a2d] rounded-xl"><BookOpen size={28} color="#fff" /></div>
                <span className="text-xl font-bold text-gold text-white">Crystal Realm, Conquest 3</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-white/80 font-semibold">Progress</span>
                <span className="text-sm font-bold text-gold">0%</span>
              </div>
              <div className="w-full bg-[#0e0e0e]/50 rounded-full h-3 mb-1 border border-gold/40">
                <div className="bg-gold h-3 rounded-full" style={{ width: `0%` }} />
              </div>
              <div className="flex flex-row justify-between items-center mb-2">
                <span className="text-sm text-white/70 font-medium">0% completed</span>
                <a href="#" className="flex items-center bg-[#2a2a2d] text-white font-bold py-2 px-8 rounded-xl"><Lightning size={20} color="#facb25" weight="fill" className="mr-1" />Resume Learning</a>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#2a2a2d] p-3 rounded-lg text-center border border-gold/20">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Calculator size={18} color="#fff" />
                    <span className="text-xs text-white/80 font-medium">Accuracy</span>
                  </div>
                  <div className="text-lg font-bold text-gold">22%</div>
                </div>
                <div className="bg-[#2a2a2d] p-3 rounded-lg text-center border border-gold/20">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    {/* <DotsThreeOutline size={18} color="#fff" /> */}
                    <Clock size={18} color="#fff" />
                    <span className="text-xs text-white/80 font-medium">Time Spent</span>
                  </div>
                  <div className="text-lg font-bold text-gold">{dummyAccuracy}%</div>
                  <div className="text-lg font-bold text-white">{dummyTimeSpent}</div>
                </div>
              </div>
            </SpotlightCard>
            <div className="bg-[#212124] px-6 py-4 rounded-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold text-white">Personal Goals</span>
                <button className="bg-[#facb25] text-[#1b1b1b] px-3 py-1 rounded-lg font-semibold">+ Add</button>
              </div>
              <div className="flex flex-col items-center justify-center h-full">
                <ClipboardText size={32} color="#fff" className="mb-2" />
                <span className="text-sm text-[#818181]">No goals yet. Add one to get started!</span>
              </div>
            </div>
          </div>

          {/* Shortcut Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-[#212124] p-6 rounded-xl flex flex-col items-center justify-center">
              <BookOpen size={32} color="#fff" className="mb-2" />
              <span className="text-lg font-bold text-white">Path of Conquest</span>
              <span className="text-xs text-[#818181]">View your learning journey</span>
            </div>
            <div className="bg-[#212124] p-6 rounded-xl flex flex-col items-center justify-center">
              <Calculator size={32} color="#fff" className="mb-2" />
              <span className="text-lg font-bold text-white">Solo Training Ground</span>
              <span className="text-xs text-[#818181]">Improve your math skills</span>
            </div>
            <div className="bg-[#212124] p-6 rounded-xl flex flex-col items-center justify-center">
              <Sword size={32} color="#fff" className="mb-2" />
              <span className="text-lg font-bold text-white">Epic Battle Ground</span>
              <span className="text-xs text-[#818181]">Challenge other students</span>
            </div>
            <div className="bg-[#212124] p-6 rounded-xl flex flex-col items-center justify-center relative">
              <Calculator size={32} color="#fff" className="mb-2" />
              <span className="text-lg font-bold text-white">Virtual Abacus</span>
              <span className="text-xs text-[#818181]">Interactive abacus tool</span>
              <span className="absolute top-2 right-2 bg-[#212124] text-white text-xs px-2 py-1 rounded-md border border-[#212124]">Mini</span>
            </div>
          </div>

          {/* Recent Activity & Leaderboard Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#212124] p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-white">Recent Activity</h2>
              <div className="space-y-4">
                {dummyRecentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-[#212124] rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">
                        {activity.type === 'practice' ? <BookOpen size={20} color="#fff" weight="fill" /> : activity.type === 'test' ? <Medal size={20} color="#facb25" weight="fill" /> : <DotsThreeOutline size={20} color="#fff" />}
                      </span>
                      <div>
                        <span className="text-sm text-white">{activity.title}</span>
                        <p className="text-xs text-[#818181]">1h ago</p>
                      </div>
                    </div>
                    {activity.xp && <span className="text-sm font-bold text-yellow-500">+{activity.xp} XP</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#212124] p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-white">Lightning Leaderboard</h2>
              <div className="space-y-3">
                {dummyLeaderboard.map((player) => (
                  <div key={player.userId} className="flex items-center justify-between p-3 bg-[#212124] rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[#2a2a2d] flex items-center justify-center">
                        <span className="text-sm font-bold text-white">#{player.rank}</span>
                      </div>
                      <div>
                        <span className="text-sm text-white font-medium">{player.name}</span>
                        <p className="text-xs text-[#818181]">Level {player.level}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-yellow-500">{player.xp} XP</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboardPage;
