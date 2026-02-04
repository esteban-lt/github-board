import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

import AppLayout from '@/layouts/app-layout';
import DashboardPage from '@/modules/dashboard/pages';

const ActivityFeedPage = lazy(() => import('@/modules/activity-feed/pages'));
const RepositoriesPage = lazy(() => import('@/modules/repositories/pages'));
const AutomationsPage = lazy(() => import('@/modules/automations/pages'));
const IntegrationsPage = lazy(() => import('@/modules/integrations/pages'));
const SettingPage = lazy(() => import('@/modules/settings/pages'));

export const appRouter = createBrowserRouter([
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
        element: <RepositoriesPage />,
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
