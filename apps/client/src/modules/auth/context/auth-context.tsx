import { createContext, useContext, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import apiService from '@/services/api-service';

interface User {
  userId: string;
  githubId: number;
}

interface AuthContext {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext>({
  user: null,
  isLoading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = async () => {
    await apiService.post('/api/auth/logout');
    setUser(null);
  }

  useEffect(() => {
    apiService.get('/api/auth/me')
      .then((response) => {
        console.log('Auth response:', response.data);
        setUser(response.data.user)
      })
      .catch((error) => {
        console.log('Auth error:', error);
        setUser(null)
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
