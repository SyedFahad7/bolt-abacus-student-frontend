import { useState, useMemo } from 'react';
import { Archive, Sword, Target, Cards } from '@phosphor-icons/react';
import Sidebar from '../../components/Sidebar';
import MainContent from '../../components/layout/MainContent';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card';
import ActivityCard from './components/ActivityCard';
import FilterBar from './components/FilterBar';

// dummy activity data
const DUMMY_ACTIVITIES = [
  {
    id: '1',
    title: 'Flashcards Practice (addition) completed with score 10',
    type: 'flashcard' as const,
    score: 10,
    xpEarned: 0,
    timestamp: '17 days ago',
  },
  {
    id: '2',
    title: 'Flashcards Practice (addition) completed with score 7',
    type: 'flashcard' as const,
    score: 7,
    xpEarned: 0,
    timestamp: '19 days ago',
  },
  {
    id: '3',
    title: 'PvP Victory',
    type: 'pvp' as const,
    score: undefined,
    xpEarned: 50,
    timestamp: '20 days ago',
  },
  {
    id: '4',
    title: 'Flashcards Practice (addition) completed with score 9',
    type: 'flashcard' as const,
    score: 9,
    xpEarned: 0,
    timestamp: '20 days ago',
  },
  {
    id: '5',
    title: 'Flashcards Practice (addition) completed with score 9',
    type: 'flashcard' as const,
    score: 9,
    xpEarned: 0,
    timestamp: '20 days ago',
  },
  {
    id: '6',
    title: 'PvP Victory',
    type: 'pvp' as const,
    score: undefined,
    xpEarned: 50,
    timestamp: '21 days ago',
  },
  {
    id: '7',
    title: 'Solo Training - Time Attack completed',
    type: 'practice' as const,
    score: 85,
    xpEarned: 25,
    timestamp: '22 days ago',
  },
  {
    id: '8',
    title: 'Solo Training - No Rush Mastery completed',
    type: 'practice' as const,
    score: 92,
    xpEarned: 30,
    timestamp: '23 days ago',
  },
];

export default function ArchivePage() {
  const [activeFilter, setActiveFilter] = useState('all');

  // filter activities based on active filter
  const filteredActivities = useMemo(() => {
    if (activeFilter === 'all') return DUMMY_ACTIVITIES;
    return DUMMY_ACTIVITIES.filter(activity => activity.type === activeFilter);
  }, [activeFilter]);

  // get icon for activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'pvp':
        return <Sword size={20} weight="fill" />;
      case 'flashcard':
        return <Cards size={20} weight="fill" />;
      default:
        return <Target size={20} weight="fill" />;
    }
  };

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <div className="w-full space-y-6">
          {/* header */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Archive size={40} weight="fill" className="text-yellow-600" />
              Activity Archive
            </h1>
            <p className="text-white/60">View your learning history and track your progress over time.</p>
          </div>

          {/* filter bar */}
          <FilterBar 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />

          {/* activities grid */}
          <Card className="bg-[#0f0f10] border-[#2a2a2d]">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredActivities.length === 0 ? (
                // empty state
                <div className="text-center py-12">
                  <Archive size={64} weight="fill" className="mx-auto mb-4 text-white/20" />
                  <h3 className="text-xl font-bold text-white mb-2">No Activities Found</h3>
                  <p className="text-white/60">
                    {activeFilter === 'all' 
                      ? 'Start practicing to see your activities here!'
                      : `No ${activeFilter} activities found. Try a different filter.`
                    }
                  </p>
                </div>
              ) : (
                // activities list
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredActivities.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      title={activity.title}
                      type={activity.type}
                      score={activity.score}
                      xpEarned={activity.xpEarned}
                      timestamp={activity.timestamp}
                      icon={getActivityIcon(activity.type)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </MainContent>
    </div>
  );
}
