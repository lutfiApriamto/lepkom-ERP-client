import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/utils/interceptors';

const BASE_URL_ASISTEN = '/api/auth/asisten';
const BASE_URL_CALAS = '/api/auth/calas';

// ==========================================
// ASISTEN AUTH HOOKS
// ==========================================

export const useLoginAsisten = () => {
  return useMutation({
    mutationFn: async (credentials: Record<string, any>) => {
      const res = await axios.post(`${BASE_URL_ASISTEN}/login`, credentials);
      return res.data;
    }
  });
};

export const useLogoutAsisten = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await axios.post(`${BASE_URL_ASISTEN}/logout`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.clear();
      window.location.href = '/login';
    }
  });
};

export const useRequestHardResetAsisten = () => {
  return useMutation({
    mutationFn: async (data: { identifier: string }) => {
      const res = await axios.post(`${BASE_URL_ASISTEN}/request-hard-reset`, data);
      return res.data;
    }
  });
};

export const useChangePasswordAsisten = () => {
  return useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const res = await axios.post(`${BASE_URL_ASISTEN}/change-password`, data);
      return res.data;
    }
  });
};

export const useApproveHardReset = () => {
  return useMutation({
    mutationFn: async (requestId: string) => {
      const res = await axios.post(`${BASE_URL_ASISTEN}/approve-hard-reset/${requestId}`);
      return res.data;
    }
  });
};

export const useRejectHardReset = () => {
  return useMutation({
    mutationFn: async (requestId: string) => {
      const res = await axios.post(`${BASE_URL_ASISTEN}/reject-hard-reset/${requestId}`);
      return res.data;
    }
  });
};

// ==========================================
// CALAS AUTH HOOKS
// ==========================================

export const useLoginCalas = () => {
  return useMutation({
    mutationFn: async (credentials: Record<string, any>) => {
      const res = await axios.post(`${BASE_URL_CALAS}/login`, credentials);
      return res.data;
    }
  });
};

export const useLogoutCalas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await axios.post(`${BASE_URL_CALAS}/logout`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.clear();
      window.location.href = '/login';
    }
  });
};

export const useForgotPasswordCalas = () => {
  return useMutation({
    mutationFn: async (data: { identifier: string }) => {
      const res = await axios.post(`${BASE_URL_CALAS}/forgot-password`, data);
      return res.data;
    }
  });
};

export const useResetPasswordCalas = () => {
  return useMutation({
    mutationFn: async ({ token, ...data }: { token: string; [key: string]: any }) => {
      const res = await axios.post(`${BASE_URL_CALAS}/reset-password/${token}`, data);
      return res.data;
    }
  });
};

export const useChangePasswordCalas = () => {
  return useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const res = await axios.post(`${BASE_URL_CALAS}/change-password`, data);
      return res.data;
    }
  });
};
