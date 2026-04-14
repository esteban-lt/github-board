import { RouterProvider } from 'react-router/dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { AuthProvider } from './modules/auth/context/auth-context';
import { appRouter } from './router/app-router';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={appRouter} />
        <ReactQueryDevtools initialIsOpen={false}/>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
