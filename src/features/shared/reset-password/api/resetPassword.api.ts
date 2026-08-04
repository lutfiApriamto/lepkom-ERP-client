import { useMutation } from '@tanstack/react-query';
import api from '@/utils/interceptors';
import { useAuthStore } from '@/features/auth/shared/store';

// We assume these endpoints are general or we pass the role (asisten/calas) 
// For now, the backend has /api/auth/asisten/request-hard-reset and /api/auth/asisten/change-password
// Calas doesn't have hard reset yet, but let's make it flexible by passing the role.

export const useRequestHardReset = (role: 'asisten' | 'calas' = 'asisten') => {
  return useMutation({
    mutationFn: async (identifier: string) => {
      const res = await api.post(`/api/auth/${role}/request-hard-reset`, { identifier });
      return res.data;
    },
  });
};

export const useChangePassword = (role: 'asisten' | 'calas' = 'asisten') => {
  const { setWajibGantiPassword } = useAuthStore();
  return useMutation({
    mutationFn: async (newPassword: string) => {
      const res = await api.post(`/api/auth/${role}/change-password`, { newPassword });
      return res.data;
    },
    onSuccess: () => {
      // After successfully changing password, we update our local store to false
      if (setWajibGantiPassword) {
        setWajibGantiPassword(false);
      }
    }
  });
};
