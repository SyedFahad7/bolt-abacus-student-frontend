/**
 * Copyright (c) 2025 XUNOIA TECHNOLOGIES PRIVATE LIMITED
 * Licensed under XUNOIA Private License v1.0
 * All rights reserved.
 */

import { lazy } from 'react';
import type { ComponentType } from 'react';

const StudentDashboardPage = lazy(() => import('../features/dashboard/page'));
const SoloTrainingGroundPage = lazy(() => import('../features/solo-training-ground/page'));
// const EpicBattleGroundPage = lazy(() => import('../features/epic-battle-ground/page'));
const EBGRoomPage = lazy(() => import('../features/epic-battle-ground/room/page'));
// const EBGRoomLoadingPage = lazy(() => import('../features/epic-battle-ground/room/loading'));
// const EBGRoomCountdownPage = lazy(() => import('../features/epic-battle-ground/room/countdown'));
// const EBGRoomGamePage = lazy(() => import('../features/epic-battle-ground/room/game'));
const EBGRoomResultsPage = lazy(() => import('../features/epic-battle-ground/room/results'));
const EBGResultsPage = lazy(() => import('../features/epic-battle-ground/results/page'));
const EBGFlashcardsPage = lazy(() => import('../features/epic-battle-ground/gameModes/flashcards/Form'));
const EBGFlashcardsPracticePage = lazy(() => import('../features/epic-battle-ground/gameModes/flashcards/Practice'));
const EBGFlashcardsResultsPage = lazy(() => import('../features/epic-battle-ground/gameModes/flashcards/Results'));
const EBGUntimedPage = lazy(() => import('../features/epic-battle-ground/gameModes/untimed/Form'));
const EBGUntimedPracticePage = lazy(() => import('../features/epic-battle-ground/gameModes/untimed/Practice'));
const EBGUntimedResultsPage = lazy(() => import('../features/epic-battle-ground/gameModes/untimed/Results'));
const EBGTimedPage = lazy(() => import('../features/epic-battle-ground/gameModes/timed/Form'));
const EBGTimedPracticePage = lazy(() => import('../features/epic-battle-ground/gameModes/timed/Practice'));
const EBGTimedResultsPage = lazy(() => import('../features/epic-battle-ground/gameModes/timed/Results'));
const EBGSetPage = lazy(() => import('../features/epic-battle-ground/gameModes/set/Form'));
const EBGSetPracticePage = lazy(() => import('../features/epic-battle-ground/gameModes/set/Practice'));
const EBGSetResultsPage = lazy(() => import('../features/epic-battle-ground/gameModes/set/Results'));
const STGFlashcardsPage = lazy(() => import('../features/solo-training-ground/gameModes/flashcards/Form'));
const STGFlashcardsPracticePage = lazy(() => import('../features/solo-training-ground/gameModes/flashcards/Practice'));
const STGFlashcardsResultsPage = lazy(() => import('../features/solo-training-ground/gameModes/flashcards/Results'));
const STGUntimedPage = lazy(() => import('../features/solo-training-ground/gameModes/untimed/page'));
const STGUntimedPracticePage = lazy(() => import('../features/solo-training-ground/gameModes/untimed/Practice'));
const STGUntimedResultsPage = lazy(() => import('../features/solo-training-ground/gameModes/untimed/Results'));
const STGTimedPage = lazy(() => import('../features/solo-training-ground/gameModes/timed/page'));
const STGTimedPracticePage = lazy(() => import('../features/solo-training-ground/gameModes/timed/Practice'));
const STGTimedResultsPage = lazy(() => import('../features/solo-training-ground/gameModes/timed/Results'));
const STGSetPage = lazy(() => import('../features/solo-training-ground/gameModes/set/page'));
const STGSetPracticePage = lazy(() => import('../features/solo-training-ground/gameModes/set/Practice'));
const STGSetResultsPage = lazy(() => import('../features/solo-training-ground/gameModes/set/Results'));
const StudentProgressPage = lazy(() => import('../features/progress/page'));
const HallOfFamePage = lazy(() => import('../features/hall-of-fame/page'));
const ArchivePage = lazy(() => import('../features/archive/page'));
const VirtualAbacusPage = lazy(() => import('../features/virtual-abacus/page'));
const PathOfConquestPage = lazy(() => import('../features/path-of-conquest/page'));
const PathOfConquestRealmPage = lazy(() => import('../features/path-of-conquest/realm'));
// const StudentAchievementsPage = lazy(() => import('../features/achievements/page'));

export interface RouteConfig {
  path: string;
  element: ComponentType;
  protected?: boolean;
  title?: string;
}

export const routes: RouteConfig[] = [
  {
    path: '/student/dashboard',
    element: StudentDashboardPage,
    protected: true,
    title: 'Dashboard',
  },
  {
    path: '/student/path-of-conquest',
    element: PathOfConquestPage,
    protected: true,
    title: 'Path of Conquest',
  },
  {
    path: '/student/path-of-conquest/:realmSlug',
    element: PathOfConquestRealmPage,
    protected: true,
    title: 'Path of Conquest Realm',
  },
  {
    path: '/student/solo-training-ground',
    element: SoloTrainingGroundPage,
    protected: true,
    title: 'Solo Training Ground',
  },
  // {
  //   path: '/student/epic-battle-ground',
  //   element: EpicBattleGroundPage,
  //   protected: true,
  //   title: 'Epic Battle Ground',
  // },
  {
    path: '/student/epic-battle-ground/room/:roomId',
    element: EBGRoomPage,
    protected: true,
    title: 'Epic Battle Ground Room Lobby',
  },
  // {
  //   path: '/student/epic-battle-ground/room/:roomId/loading',
  //   element: EBGRoomLoadingPage,
  //   protected: true,
  //   title: 'Epic Battle Ground Loading',
  // },
  // {
  //   path: '/student/epic-battle-ground/room/:roomId/countdown',
  //   element: EBGRoomCountdownPage,
  //   protected: true,
  //   title: 'Epic Battle Ground Countdown',
  // },
  // {
  //   path: '/student/epic-battle-ground/room/:roomId/game',
  //   element: EBGRoomGamePage,
  //   protected: true,
  //   title: 'Epic Battle Ground Game',
  // },
  {
    path: '/student/epic-battle-ground/room/:roomId/results',
    element: EBGRoomResultsPage,
    protected: true,
    title: 'Epic Battle Ground Results',
  },
  {
    path: '/student/epic-battle-ground/results',
    element: EBGResultsPage,
    protected: true,
    title: 'Epic Battle Ground Results',
  },
  {
    path: '/student/epic-battle-ground/flashcards',
    element: EBGFlashcardsPage,
    protected: true,
    title: 'Epic Flashcards',
  },
  {
    path: '/student/epic-battle-ground/flashcards/practice',
    element: EBGFlashcardsPracticePage,
    protected: true,
    title: 'Epic Flashcards Practice',
  },
  {
    path: '/student/epic-battle-ground/flashcards/results',
    element: EBGFlashcardsResultsPage,
    protected: true,
    title: 'Epic Flashcards Results',
  },
  {
    path: '/student/epic-battle-ground/untimed',
    element: EBGUntimedPage,
    protected: true,
    title: 'Epic No Rush Mastery',
  },
  {
    path: '/student/epic-battle-ground/untimed/practice',
    element: EBGUntimedPracticePage,
    protected: true,
    title: 'Epic No Rush Practice',
  },
  {
    path: '/student/epic-battle-ground/untimed/results',
    element: EBGUntimedResultsPage,
    protected: true,
    title: 'Epic No Rush Results',
  },
  {
    path: '/student/epic-battle-ground/timed',
    element: EBGTimedPage,
    protected: true,
    title: 'Epic Time Attack',
  },
  {
    path: '/student/epic-battle-ground/timed/practice',
    element: EBGTimedPracticePage,
    protected: true,
    title: 'Epic Time Attack Practice',
  },
  {
    path: '/student/epic-battle-ground/timed/results',
    element: EBGTimedResultsPage,
    protected: true,
    title: 'Epic Time Attack Results',
  },
  {
    path: '/student/epic-battle-ground/set',
    element: EBGSetPage,
    protected: true,
    title: 'Epic Custom Challenge',
  },
  {
    path: '/student/epic-battle-ground/set/practice',
    element: EBGSetPracticePage,
    protected: true,
    title: 'Epic Custom Challenge Practice',
  },
  {
    path: '/student/epic-battle-ground/set/results',
    element: EBGSetResultsPage,
    protected: true,
    title: 'Epic Custom Challenge Results',
  },
  {
    path: '/student/solo-training-ground/flashcards',
    element: STGFlashcardsPage,
    protected: true,
    title: 'Flashcards',
  },
  {
    path: '/student/solo-training-ground/flashcards/practice',
    element: STGFlashcardsPracticePage,
    protected: true,
    title: 'Flashcards Practice',
  },
  {
    path: '/student/solo-training-ground/flashcards/results',
    element: STGFlashcardsResultsPage,
    protected: true,
    title: 'Flashcards Results',
  },
  {
    path: '/student/solo-training-ground/untimed',
    element: STGUntimedPage,
    protected: true,
    title: 'No Rush Mastery',
  },
  {
    path: '/student/solo-training-ground/untimed/practice',
    element: STGUntimedPracticePage,
    protected: true,
    title: 'No Rush Mastery Practice',
  },
  {
    path: '/student/solo-training-ground/untimed/results',
    element: STGUntimedResultsPage,
    protected: true,
    title: 'No Rush Mastery Results',
  },
  {
    path: '/student/solo-training-ground/timed',
    element: STGTimedPage,
    protected: true,
    title: 'Time Attack',
  },
  {
    path: '/student/solo-training-ground/timed/practice',
    element: STGTimedPracticePage,
    protected: true,
    title: 'Time Attack Practice',
  },
  {
    path: '/student/solo-training-ground/timed/results',
    element: STGTimedResultsPage,
    protected: true,
    title: 'Time Attack Results',
  },
  {
    path: '/student/solo-training-ground/set',
    element: STGSetPage,
    protected: true,
    title: 'Custom Challenge',
  },
  {
    path: '/student/solo-training-ground/set/practice',
    element: STGSetPracticePage,
    protected: true,
    title: 'Custom Challenge Practice',
  },
  {
    path: '/student/solo-training-ground/set/results',
    element: STGSetResultsPage,
    protected: true,
    title: 'Custom Challenge Results',
  },
  {
    path: '/student/progress',
    element: StudentProgressPage,
    protected: true,
    title: 'Progress',
  },
  {
    path: '/student/hall-of-fame',
    element: HallOfFamePage,
    protected: true,
    title: 'Hall of Fame',
  },
  {
    path: '/student/archive',
    element: ArchivePage,
    protected: true,
    title: 'Archive',
  },
  {
    path: '/student/virtual-abacus',
    element: VirtualAbacusPage,
    protected: true,
    title: 'Virtual Abacus',
  },
  // {
  //   path: '/student/achievements',
  //   element: StudentAchievementsPage,
  //   protected: true,
  //   title: 'Achievements',
  // },
  // {
  //   path: '/student/profile',
  //   element: StudentProfilePage,
  //   protected: true,
  //   title: 'Profile',
  // },
];

export const defaultRoute = '/student/dashboard';