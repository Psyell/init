import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, AuthState, LoginCredentials } from '@/types';
import { authApi } from '@/services/api';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authApi.getCurrentUser();
        if (response.data) {
          setState({
            user: response.data,
            token: localStorage.getItem('noir_store_auth_token'),
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };
    
    checkAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await authApi.login(credentials);
      setState({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const err = error as { message: string };
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err.message || 'Login failed',
      }));
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    if (!state.user) return;
    
    try {
      const response = await authApi.updateProfile(data);
      setState(prev => ({
        ...prev,
        user: response.data,
      }));
    } catch (error) {
      const err = error as { message: string };
      throw new Error(err.message || 'Failed to update profile');
    }
  }, [state.user]);

  const hasPermission = useCallback((permission: string) => {
    if (!state.user) return false;
    if (state.user.role === 'admin') return true;
    return state.user.permissions.includes(permission as User['permissions'][number]);
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        updateProfile,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
