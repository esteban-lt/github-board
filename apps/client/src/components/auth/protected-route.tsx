import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/modules/auth/context/auth-context';

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (!user) return <Navigate to="/auth" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
