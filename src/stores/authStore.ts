import { create } from 'zustand';
import { AuthState, AuthUser, LoginCredentials } from '../types';
import { authService } from '../services/authService';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ loading: true, error: null });
    
    try {
      const user = await authService.login(credentials);
      set({ 
        isAuthenticated: true, 
        user, 
        loading: false 
      });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Đăng nhập thất bại' 
      });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true });
    
    try {
      await authService.logout();
      set({ 
        isAuthenticated: false, 
        user: null, 
        loading: false,
        error: null 
      });
    } catch (error) {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
  setLoading: (loading: boolean) => set({ loading })
}));
