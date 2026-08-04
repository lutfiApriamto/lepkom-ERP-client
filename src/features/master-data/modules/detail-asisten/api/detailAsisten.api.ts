import { useQuery } from '@tanstack/react-query';
import api from '@/utils/interceptors';
import type { ApiResponse } from '@/types';
import type { DetailAsisten, HistoryPenilaianResponse } from '../types/detailAsisten.types';

export const DETAIL_ASISTEN_KEYS = {
  all: ['detailAsisten'] as const,
  detail: (id: string) => [...DETAIL_ASISTEN_KEYS.all, id, 'info'] as const,
  penilaian: (id: string, qs: string) => [...DETAIL_ASISTEN_KEYS.all, id, 'penilaian', qs] as const,
};

export const useGetDetailAsisten = (id: string) => {
  return useQuery({
    queryKey: DETAIL_ASISTEN_KEYS.detail(id),
    queryFn: async () => {
      const res = await api.get<ApiResponse<DetailAsisten>>(`/api/asisten/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useGetHistoryPenilaian = (id: string, queryString: string) => {
  return useQuery({
    queryKey: DETAIL_ASISTEN_KEYS.penilaian(id, queryString),
    queryFn: async () => {
      const res = await api.get<HistoryPenilaianResponse>(`/api/asisten/${id}/penilaian${queryString}`);
      return res.data;
    },
    enabled: !!id,
  });
};
