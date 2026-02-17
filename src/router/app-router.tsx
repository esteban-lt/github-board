import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

import AppLayout from '@layouts/app-layout';
import DashboardPage from '@dashboard/pages';

const LoginPage = lazy(() => import('@auth/pages/login'));
const ActivityFeedPage = lazy(() => import('@activity-feed/pages'));
const RepositoriesPage = lazy(() => import('@repositories/pages'));
const ConnectRepositoryPage = lazy(() => import('@repositories/connect/pages'));
const AutomationsPage = lazy(() => import('@automations/pages'));
const IntegrationsPage = lazy(() => import('@integrations/pages'));
const SettingPage = lazy(() => import('@settings/pages'));

export const appRouter = createBrowserRouter([
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: <LoginPage />
      },
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />
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
        ],
      },
      {
        path: 'automations',
        element: <AutomationsPage />,
      },
      {
        path: 'integrations',
        element: <IntegrationsPage />,
      },
      {
        path: 'settings',
        element: <SettingPage />,
      },
    ],
  },
]);
