import { createBrowserRouter } from 'react-router';
import ProtectedRoute from '@/components/auth/protected-route';
import AuthPage from '@/modules/auth/pages/auth-page';
import AppLayout from '@/layouts/app-layout';
import DashboardPage from '@/modules/dashboard/pages';
import ActivityFeedPage from '@/modules/activity-feed/pages/activity-feed-page';
import RepositoriesPage from '@/modules/repositories/pages';
import ConnectRepositoryPage from '@/modules/repositories/pages/connect-repository-page';

export const appRouter = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />
  },
  {
    path: '/',
    element: <ProtectedRoute />,
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
            ],
          },
        ],
      },
    ],
  },
]);
