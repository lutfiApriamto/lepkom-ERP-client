import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/interceptors';

export interface HardResetRequest {
  _id: string;
  asistenRef: {
    _id: string;
    idAsisten: string;
    npm: string;
    nama: string;
    email: string;
    role: string;
    isActive: boolean;
  };
  inputAwal: string;
  status: 'menunggu' | 'disetujui' | 'ditolak';
  disetujuiOleh?: {
    _id: string;
    idAsisten: string;
    nama: string;
  } | null;
  diprosesPada?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface HardResetRequestListResponse {
  errorStatus: boolean;
  message: string;
  data: HardResetRequest[];
  totalData?: number;
  totalPage?: number;
}

export const RR_KEYS = {
  all: ['hardResetRequest'] as const,
  lists: () => [...RR_KEYS.all, 'list'] as const,
  list: (filters: string) => [...RR_KEYS.lists(), { filters }] as const,
};

export const useGetAllHardResetRequests = (queryString: string = '') => {
  return useQuery({
    queryKey: RR_KEYS.list(queryString),
    queryFn: async () => {
      const res = await api.get<HardResetRequestListResponse>(`/api/auth/asisten/hard-reset-requests${queryString}`);
      return res.data;
    }
  });
};

export const useApproveHardReset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestId: string) => {
      const res = await api.post(`/api/auth/asisten/approve-hard-reset/${requestId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RR_KEYS.lists() });
    },
  });
};

export const useRejectHardReset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestId: string) => {
      const res = await api.post(`/api/auth/asisten/reject-hard-reset/${requestId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RR_KEYS.lists() });
    },
  });
};
