import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/interceptors';
import type { ApiResponse } from '@/types';

export interface Recruitment {
  _id: string;
  gelombangAktif: string;
  isActive: boolean;
  dibuatOleh?: { _id: string; nama: string };
  diaktifkanOleh?: { _id: string; nama: string };
  diaktifkanPada?: string;
  dinonaktifkanOleh?: { _id: string; nama: string };
  dinonaktifkanPada?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecruitmentListResponse {
  errorStatus: boolean;
  message: string;
  data: Recruitment[];
  totalData?: number;
  totalPage?: number;
}

export const REKRUTMEN_KEYS = {
  all: ['rekrutmen'] as const,
  lists: () => [...REKRUTMEN_KEYS.all, 'list'] as const,
  list: (filters: string) => [...REKRUTMEN_KEYS.lists(), { filters }] as const,
  details: () => [...REKRUTMEN_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...REKRUTMEN_KEYS.details(), id] as const,
};

export const useGetAllRekrutmen = (queryString: string) => {
  return useQuery({
    queryKey: REKRUTMEN_KEYS.list(queryString),
    queryFn: async () => {
      const res = await api.get<RecruitmentListResponse>(`/api/recruitment${queryString}`);
      return res.data;
    }
  });
};

export const useCreateRekrutmen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { gelombangAktif: string }) => {
      const res = await api.post<ApiResponse<Recruitment>>('/api/recruitment', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REKRUTMEN_KEYS.lists() });
    },
  });
};

export const useUpdateRekrutmen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { gelombangAktif: string } }) => {
      const res = await api.put<ApiResponse<Recruitment>>(`/api/recruitment/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: REKRUTMEN_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: REKRUTMEN_KEYS.detail(variables.id) });
    },
  });
};

export const useActivateRekrutmen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.patch<ApiResponse<Recruitment>>(`/api/recruitment/${id}/activate`);
      return res.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: REKRUTMEN_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: REKRUTMEN_KEYS.detail(id) });
    },
  });
};

export const useDeactivateRekrutmen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.patch<ApiResponse<Recruitment>>(`/api/recruitment/${id}/deactivate`);
      return res.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: REKRUTMEN_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: REKRUTMEN_KEYS.detail(id) });
    },
  });
};

export const useDeleteRekrutmen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete<ApiResponse<{ deletedId: string }>>(`/api/recruitment/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REKRUTMEN_KEYS.lists() });
    },
  });
};
