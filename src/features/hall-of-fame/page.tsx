import { useState, useMemo } from 'react';
import { Trophy, ChartBar, Crown, Sword } from '@phosphor-icons/react';
import Sidebar from '../../components/Sidebar';
import MainContent from '../../components/layout/MainContent';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card';
import LeaderboardCard from './components/LeaderboardCard';
import StatsCard from './components/StatsCard';
import UserStatsCard from './components/UserStatsCard';
import Pagination from './components/Pagination';

// dummy
const DUMMY_LEADERBOARD = [
    { rank: 1, name: 'Emma Johnson', xp: 12450, level: 15, streak: 45, userId: '1' },
    { rank: 2, name: 'Alex Chen', xp: 11890, level: 14, streak: 38, userId: '2' },
    { rank: 3, name: 'Sarah Davis', xp: 10230, level: 13, streak: 29, userId: '3' },
    { rank: 4, name: 'Mike Wilson', xp: 9680, level: 12, streak: 22, userId: '4' },
    { rank: 5, name: 'Lisa Brown', xp: 8920, level: 11, streak: 19, userId: '5' },
    { rank: 6, name: 'John Taylor', xp: 8340, level: 11, streak: 15, userId: '6' },
    { rank: 7, name: 'Maria Anderson', xp: 7890, level: 10, streak: 12, userId: '7' },
    { rank: 8, name: 'David Martinez', xp: 7450, level: 10, streak: 9, userId: '8' },
    { rank: 9, name: 'Anna Garcia', xp: 6890, level: 9, streak: 7, userId: '9' },
    { rank: 10, name: 'Robert Miller', xp: 6230, level: 9, streak: 5, userId: '10' },
    { rank: 11, name: 'Jennifer Lee', xp: 5780, level: 8, streak: 4, userId: '11' },
    { rank: 12, name: 'James White', xp: 5340, level: 8, streak: 3, userId: '12' },
    { rank: 13, name: 'Patricia Moore', xp: 4920, level: 7, streak: 2, userId: '13' },
    { rank: 14, name: 'Michael Clark', xp: 4560, level: 7, streak: 1, userId: '14' },
    { rank: 15, name: 'You', xp: 3890, level: 6, streak: 12, userId: 'current' }, // Current user
    { rank: 16, name: 'Linda Harris', xp: 3450, level: 6, streak: 8, userId: '16' },
    { rank: 17, name: 'William Lewis', xp: 3120, level: 5, streak: 6, userId: '17' },
    { rank: 18, name: 'Barbara Walker', xp: 2890, level: 5, streak: 4, userId: '18' },
    { rank: 19, name: 'Richard Hall', xp: 2560, level: 4, streak: 3, userId: '19' },
    { rank: 20, name: 'Susan Allen', xp: 2230, level: 4, streak: 2, userId: '20' },
];

const DUMMY_USER_STATS = {
    totalXP: 3890,
    level: 6,
    rank: 15,
    nextLevelXP: 6000,
    totalPlayers: 156
};

const PAGE_SIZE = 10;

export default function HallOfFamePage() {
    const [currentPage, setCurrentPage] = useState(1);

    // calc stats from leaderboard
    const stats = useMemo(() => {
        const topScore = DUMMY_LEADERBOARD[0]?.xp || 0;
        const avgXP = Math.round(
            DUMMY_LEADERBOARD.reduce((sum, player) => sum + player.xp, 0) / DUMMY_LEADERBOARD.length
        );
        const highestLevel = Math.max(...DUMMY_LEADERBOARD.map(p => p.level));

        return { topScore, avgXP, highestLevel };
    }, []);


    const totalPages = Math.ceil(DUMMY_LEADERBOARD.length / PAGE_SIZE);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        return DUMMY_LEADERBOARD.slice(start, end);
    }, [currentPage]);

    return (
        <div className="min-h-screen flex bg-black">
            <Sidebar />
            <MainContent>
                <div className="w-full space-y-6">
                    {/* header */}
                    <div className="flex flex-col tablet:flex-row tablet:justify-between tablet:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                                <Trophy size={40} className="text-yellow-600" />
                                Hall of Fame
                            </h1>
                            <p className="text-white/60">Compete with other students and climb the rankings!</p>
                        </div>
                        <div className="hidden tablet:block">
                            <Card className="bg-[#0f0f10] border-[#2a2a2d]">
                                <CardContent className="p-4">
                                    <div className="text-3xl font-bold text-white text-center">
                                        {DUMMY_LEADERBOARD.length}
                                    </div>
                                    <div className="text-xs text-white/60 text-center">Total Players</div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* stat Row */}
                    <div className="grid grid-cols-3 gap-4">
                        <StatsCard
                            icon={<Trophy size={24} weight="fill" className="text-yellow-600" />}
                            label="Top Score"
                            value={stats.topScore.toLocaleString()}
                            gradient="linear-gradient(135deg, rgba(202, 138, 4, 0.2) 0%, rgba(161, 98, 7, 0.1) 100%)"
                            borderColor="border-yellow-600/30"
                            textColor="text-yellow-600"
                            shadowColor="0 4px 16px rgba(202, 138, 4, 0.2)"
                        />
                        <StatsCard
                            icon={<ChartBar size={24} weight="fill" className="text-purple-400" />}
                            label="Avg XP"
                            value={stats.avgXP.toLocaleString()}
                            gradient="linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(147, 51, 234, 0.1) 100%)"
                            borderColor="border-purple-400/30"
                            textColor="text-purple-400"
                            shadowColor="0 4px 16px rgba(168, 85, 247, 0.2)"
                        />
                        <StatsCard
                            icon={<Crown size={24} weight="fill" className="text-pink-400" />}
                            label="Highest Level"
                            value={stats.highestLevel}
                            gradient="linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(219, 39, 119, 0.1) 100%)"
                            borderColor="border-pink-400/30"
                            textColor="text-pink-400"
                            shadowColor="0 4px 16px rgba(236, 72, 153, 0.2)"
                        />
                        <aside className="col-span-3">
                            <UserStatsCard
                                totalXP={DUMMY_USER_STATS.totalXP}
                                level={DUMMY_USER_STATS.level}
                                rank={DUMMY_USER_STATS.rank}
                                nextLevelXP={DUMMY_USER_STATS.nextLevelXP}
                                totalPlayers={DUMMY_USER_STATS.totalPlayers}
                            />
                        </aside>
                    </div>

                    {/* main grid */}
                    <div className="grid grid-cols-1 desktop:grid-cols-3 gap-6">
                        {/* leaderboard list */}
                        <div className="desktop:col-span-2">
                            <Card className="bg-[#0f0f10] border-[#2a2a2d]">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                                        <Sword size={28} weight="fill" className="text-yellow-600" />
                                        Top Students
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {paginatedData.length === 0 ? (
                                        <div className="text-center py-12">
                                            <div className="text-6xl mb-4">🏆</div>
                                            <h3 className="text-2xl font-bold text-white mb-2">No Rankings Yet</h3>
                                            <p className="text-white/60 mb-6">
                                                Start playing to earn experience points and climb the leaderboard!
                                            </p>
                                        </div>
                                    ) : (
                                        paginatedData.map((player) => (
                                            <LeaderboardCard
                                                key={player.userId}
                                                rank={player.rank}
                                                name={player.name}
                                                xp={player.xp}
                                                level={player.level}
                                                streak={player.streak}
                                                isCurrentUser={player.userId === 'current'}
                                            />
                                        ))
                                    )}
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        totalItems={DUMMY_LEADERBOARD.length}
                                        onPageChange={setCurrentPage}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </MainContent>
        </div>
    );
}
