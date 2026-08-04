import { create } from 'zustand';
import { getAuthUserData, setAuthUserData, deleteAuthUserData } from '@/utils/helpers/authUserData';
import type { AuthUserData } from '@/utils/helpers/authUserData';
import { getCookie, setCookie, deleteCookie } from '@/utils/helpers/cookie';
import { STORAGE_TOKEN_KEY, STORAGE_ROLE_KEY } from '@/utils/consts';

interface AuthState {
  user: AuthUserData | null;
  token: string | null;
  role: string | null;
  setUser: (user: AuthUserData) => void;
  setToken: (token: string, role: string) => void;
  setWajibGantiPassword: (value: boolean) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getAuthUserData(),
  token: getCookie(STORAGE_TOKEN_KEY) || null,
  role: getCookie(STORAGE_ROLE_KEY) || null,

  setUser: (user: AuthUserData) => {
    setAuthUserData(user);
    set({ user });
  },

  setToken: (token: string, role: string) => {
    setCookie(STORAGE_TOKEN_KEY, token);
    setCookie(STORAGE_ROLE_KEY, role);
    set({ token, role });
  },

  setWajibGantiPassword: (value: boolean) => {
    set((state) => {
      if (state.user) {
        const updatedUser = { ...state.user, wajibGantiPassword: value };
        setAuthUserData(updatedUser);
        return { user: updatedUser };
      }
      return state;
    });
  },

  logout: () => {
    deleteAuthUserData();
    
    // Hard delete all potential auth cookies using wildcard logic from helpers
    deleteCookie(STORAGE_TOKEN_KEY);
    deleteCookie(STORAGE_ROLE_KEY);
    deleteCookie('lepkom_asisten_refresh');
    deleteCookie('lepkom_calas_refresh');

    localStorage.clear();
    sessionStorage.clear();
    
    set({ user: null, token: null, role: null });
    
    // Force reload via replacing location
    window.location.replace('/login');
  },

  checkAuth: () => {
    const user = getAuthUserData();
    const token = getCookie(STORAGE_TOKEN_KEY);
    const role = getCookie(STORAGE_ROLE_KEY);
    
    if (!token || !user) {
      set({ user: null, token: null, role: null });
    } else {
      set({ user, token, role });
    }
  }
}));
