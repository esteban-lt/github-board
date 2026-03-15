import { createBrowserRouter } from 'react-router';
import AppLayout from '@/layouts/app-layout';
import DashbaordPage from '@/modules/dashboard/pages/dashboard-page';
import ActivityFeedPage from '@/modules/activity-feed/pages/activity-feed-page';
import RepositoriesPage from '@/modules/repositories/pages/repositories-page';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashbaordPage />,
      },
      {
        path: 'activity-feed',
        element: <ActivityFeedPage />,
      },
      {
        path: 'repositories',
        element: <RepositoriesPage />,
      },
    ],
  },
]);
