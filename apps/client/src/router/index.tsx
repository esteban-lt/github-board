import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import ProtectedRoute from '@/components/auth/protected-route';
import ErrorPage from '@/pages/error-page';
import NotFoundPage from '@/pages/not-found';

import AuthPage from '@/modules/auth/pages/auth-page';
import AppLayout from '@/layouts/app-layout';
import DashboardPage from '@/modules/dashboard/pages';

const ActivityFeedPage = lazy(() => import('@/modules/activity-feed/pages/activity-feed-page'));
const RepositoriesPage = lazy(() => import('@/modules/repositories'));
const ConnectRepositoryPage = lazy(() => import('@/modules/repositories/connect'));
const RepositoryPage = lazy(() => import('@/modules/repositories/[full-name]'));

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: 'activity-feed',
            element: <ActivityFeedPage />,
          },
          {
            path: 'repositories',
            children: [
              {
                index: true,
                element: <RepositoriesPage />,
              },
              {
                path: 'connect',
                element: <ConnectRepositoryPage />,
              },
              {
                path: ':owner/:repo',
                element: <RepositoryPage />
              }
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
