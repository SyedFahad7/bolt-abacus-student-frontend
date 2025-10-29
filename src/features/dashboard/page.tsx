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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1 text-white">Welcome back, {dummyUser.name.first}</h1>
              <p className="text-sm text-[#9a9a9a] mb-2">
                Ready to <span className="text-gold">bolt</span> ahead with your math skills today?
              </p>
            </div>
            <div className="flex flex-row items-center gap-2 mt-2 md:mt-0">
              <span className="bg-[#1b1b1d] text-white font-semibold px-3 py-2 rounded-xl flex items-center border border-[#2a2a2d]">
                <Lightning size={18} color="#facb25" weight="fill" className="mr-2" />
                {dummyXP} XP
              </span>
              <span className="bg-[#1b1b1d] text-white font-semibold px-3 py-2 rounded-xl flex items-center border border-[#2a2a2d]">
                <Flame size={18} color="#ff6b6b" weight="fill" className="mr-2" />
                {dummyStreak} Day Streak
              </span>
              <a href={dummyClassLink} className="flex items-center bg-[#facb25] text-[#1b1b1b] font-semibold py-2 px-4 rounded-lg hover:brightness-95 transition">
                <VideoCamera size={18} color="#1b1b1b" weight="fill" className="mr-2" />
                Join Class
              </a>
            </div>
          </div>

          {/* Main Cards Row: Progress & Personal Goals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-8 mb-8">
            <SpotlightCard className="text-white group" spotlightColor="rgba(255, 186, 8, 0.10)">
              {/* Title & context */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#2a2a2d] border border-[#343438]">
                  <BookOpen size={24} color="#facb25" weight="fill" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#232325] text-white/80 border border-[#333]">Crystal Realm</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#232325] text-white/80 border border-[#333]">Conquest {dummyCurrentLevel}</span>
                  </div>
                  <h3 className="text-xl font-bold leading-tight">Your current journey</h3>
                </div>
              </div>

              {/* Progress */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white/80 font-semibold">Progress</span>
                <span className="text-sm font-bold text-gold">{dummyCurrentLevelProgressPct}%</span>
              </div>
              <div className="w-full bg-[#0e0e0e]/60 rounded-full h-2.5 mb-2 border border-gold/30">
                <div className="bg-orange-400 h-2 rounded-full transition-all" style={{ width: `${dummyCurrentLevelProgressPct}%` }} />
              </div>
              <div className="flex flex-row justify-between items-center mb-3">
                <span className="text-xs text-white/60 font-medium">{dummyCurrentLevelProgressPct}% completed</span>
                <a href="#" className="flex items-center bg-[#232325] hover:bg-[#2b2b2e] text-white font-semibold py-2 px-4 rounded-lg border border-[#343438] transition">
                  <Lightning size={18} color="#facb25" weight="fill" className="mr-2" />
                  Resume Learning
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1b1b1d] p-3 rounded-xl border border-[#2a2a2d]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-lg grid place-items-center bg-[#2a2a2d]">
                      <Calculator size={16} color="#a78bfa" weight="fill" />
                    </div>
                    <span className="text-xs text-white/80 font-medium">Accuracy</span>
                  </div>
                  <div className="text-lg font-bold text-gold">{dummyAccuracy}%</div>
                </div>
                <div className="bg-[#1b1b1d] p-3 rounded-xl border border-[#2a2a2d]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-lg grid place-items-center bg-[#2a2a2d]">
                      <Clock size={16} color="#34d399" weight="fill" />
                    </div>
                    <span className="text-xs text-white/80 font-medium">Time Spent</span>
                  </div>
                  <div className="text-lg font-bold text-white">{dummyTimeSpent}</div>
                </div>
              </div>
            </SpotlightCard>
            <div className="bg-[#212124] px-6 py-5 rounded-2xl flex flex-col justify-between border border-[#2a2a2d]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold text-white">Personal Goals</span>
                <button className="bg-[#facb25] text-[#1b1b1b] px-3 py-1.5 rounded-lg font-semibold hover:brightness-95 transition">+ Add</button>
              </div>
              <div className="flex flex-col items-center justify-center h-full">
                <ClipboardText size={32} color="#9ca3af" className="mb-2" />
                <span className="text-sm text-[#9a9a9a]">No goals yet. Add one to get started!</span>
              </div>
            </div>
          </div>

          {/* Shortcut Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-7 md:gap-8 mb-8">
            <div className="bg-[#212124] p-6 rounded-xl flex flex-col items-center justify-center border border-[#2a2a2d] hover:bg-[#1b1b1d] transition">
              <div className="w-12 h-12 rounded-xl grid place-items-center mb-2 bg-[#1e293b]/40">
                <BookOpen size={24} color="#60a5fa" weight="fill" />
              </div>
              <span className="text-lg font-bold text-white">Path of Conquest</span>
              <span className="text-xs text-[#818181]">View your learning journey</span>
            </div>
            <div className="bg-[#212124] p-6 rounded-xl flex flex-col items-center justify-center border border-[#2a2a2d] hover:bg-[#1b1b1d] transition">
              <div className="w-12 h-12 rounded-xl grid place-items-center mb-2 bg-[#4c1d95]/30">
                <Calculator size={24} color="#a78bfa" weight="fill" />
              </div>
              <span className="text-lg font-bold text-white">Solo Training Ground</span>
              <span className="text-xs text-[#818181]">Improve your math skills</span>
            </div>
            <div className="bg-[#212124] p-6 rounded-xl flex flex-col items-center justify-center border border-[#2a2a2d] hover:bg-[#1b1b1d] transition">
              <div className="w-12 h-12 rounded-xl grid place-items-center mb-2 bg-[#7f1d1d]/30">
                <Sword size={24} color="#fca5a5" weight="fill" />
              </div>
              <span className="text-lg font-bold text-white">Epic Battle Ground</span>
              <span className="text-xs text-[#818181]">Challenge other students</span>
            </div>
            <div className="bg-[#212124] p-6 rounded-xl flex flex-col items-center justify-center relative border border-[#2a2a2d] hover:bg-[#1b1b1d] transition">
              <div className="w-12 h-12 rounded-xl grid place-items-center mb-2 bg-[#064e3b]/30">
                <Calculator size={24} color="#34d399" weight="fill" />
              </div>
              <span className="text-lg font-bold text-white">Virtual Abacus</span>
              <span className="text-xs text-[#818181]">Interactive abacus tool</span>
              <span className="absolute top-2 right-2 bg-[#212124] text-white text-xs px-2 py-1 rounded-md border border-[#212124]">Mini</span>
            </div>
          </div>

          {/* Recent Activity & Leaderboard Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-8 pb-8">
            <div className="bg-[#212124] p-5 rounded-xl border border-[#2a2a2d]">
              <h2 className="text-xl font-bold mb-4 text-white">Recent Activity</h2>
              <div className="space-y-3">
                {dummyRecentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-[#1b1b1d] border border-[#2a2a2d] hover:bg-[#202022] transition">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">
                        {activity.type === 'practice' ? <BookOpen size={20} color="#60a5fa" weight="fill" /> : activity.type === 'test' ? <Medal size={20} color="#facb25" weight="fill" /> : <DotsThreeOutline size={20} color="#9ca3af" />}
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
            <div className="bg-[#212124] p-5 rounded-xl border border-[#2a2a2d]">
              <h2 className="text-xl font-bold mb-4 text-white">Lightning Leaderboard</h2>
              <div className="space-y-3">
                {dummyLeaderboard.map((player) => (
                  <div key={player.userId} className="flex items-center justify-between p-3 rounded-lg bg-[#1b1b1d] border border-[#2a2a2d] hover:bg-[#202022] transition">
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
