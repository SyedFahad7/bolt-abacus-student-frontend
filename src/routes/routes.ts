/**
 * Copyright (c) 2025 XUNOIA TECHNOLOGIES PRIVATE LIMITED
 * Licensed under XUNOIA Private License v1.0
 * All rights reserved.
 */

import { lazy } from 'react';
import type { ComponentType } from 'react';

const StudentDashboardPage = lazy(() => import('../features/dashboard/page'));
const SoloTrainingGroundPage = lazy(() => import('../features/solo-training-ground/page'));
const STGFlashcardsPage = lazy(() => import('../features/solo-training-ground/gameModes/flashcards/Form'));
const STGFlashcardsPracticePage = lazy(() => import('../features/solo-training-ground/gameModes/flashcards/Practice'));
const STGFlashcardsResultsPage = lazy(() => import('../features/solo-training-ground/gameModes/flashcards/Results'));
// const STGUntimedPage = lazy(() => import('../features/solo-training-ground/gameModes/untimed/page'));
// const STGTimedPage = lazy(() => import('../features/solo-training-ground/gameModes/timed/page'));
// const STGSetPage = lazy(() => import('../features/solo-training-ground/gameModes/set/page'));
// const StudentProgressPage = lazy(() => import('../features/progress/page'));
// const StudentLeaderboardPage = lazy(() => import('../features/leaderboard/page'));
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
    path: '/student/solo-training-ground',
    element: SoloTrainingGroundPage,
    protected: true,
    title: 'Solo Training Ground',
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
  // {
  //   path: '/student/solo-training-ground/untimed',
  //   element: STGUntimedPage,
  //   protected: true,
  //   title: 'No Rush Mastery',
  // },
  // {
  //   path: '/student/solo-training-ground/timed',
  //   element: STGTimedPage,
  //   protected: true,
  //   title: 'Time Attack',
  // },
  // {
  //   path: '/student/solo-training-ground/set',
  //   element: STGSetPage,
  //   protected: true,
  //   title: 'Custom Challenge',
  // },
  // {
  //   path: '/student/progress',
  //   element: StudentProgressPage,
  //   protected: true,
  //   title: 'Progress',
  // },
  // {
  //   path: '/student/leaderboard',
  //   element: StudentLeaderboardPage,
  //   protected: true,
  //   title: 'Leaderboard',
  // },
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