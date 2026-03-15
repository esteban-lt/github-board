import AppLayout from '@/layouts/app-layout';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <h1>GitHub Board</h1>
      }
    ]
  },
]);
