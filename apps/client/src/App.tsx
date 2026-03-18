import { RouterProvider } from 'react-router/dom';
import { AuthProvider } from './modules/auth/context/auth-context';
import { appRouter } from './router/app-router';

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  );
}

export default App;
