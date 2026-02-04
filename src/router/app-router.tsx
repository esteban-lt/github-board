import { createBrowserRouter } from 'react-router';

import AppLayout from '@/layouts/app-layout';
import DashboardPage from '@/modules/dashboard/pages';
import RepositoriesPage from '@/modules/repositories/pages';

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
        path: 'repositories',
        element: <RepositoriesPage />,
      },
    ],
  },
]);
