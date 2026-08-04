import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/interceptors';

export interface Materi {
  _id: string;
  namaMateri: string;
  tingkat: 1 | 2 | 3;
  deskripsi?: string | null;
  dibuatOleh?: {
    _id: string;
    nama: string;
    idAsisten: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface MateriListResponse {
  errorStatus: boolean;
  message: string;
  data: Materi[];
  totalData?: number;
  totalPage?: number;
}

export const MATERI_KEYS = {
  all: ['materi'] as const,
  lists: () => [...MATERI_KEYS.all, 'list'] as const,
  list: (filters: string) => [...MATERI_KEYS.lists(), { filters }] as const,
  details: () => [...MATERI_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...MATERI_KEYS.details(), id] as const,
  names: (filters: string) => [...MATERI_KEYS.all, 'names', { filters }] as const,
};

export const useGetAllMateri = (queryString: string) => {
  return useQuery({
    queryKey: MATERI_KEYS.list(queryString),
    queryFn: async () => {
      const res = await api.get<MateriListResponse>(`/api/materi${queryString}`);
      return res.data;
    }
  });
};

export const useGetMateriNames = (queryString: string = '') => {
  return useQuery({
    queryKey: MATERI_KEYS.names(queryString),
    queryFn: async () => {
      const res = await api.get<{ errorStatus: boolean; message: string; data: Pick<Materi, '_id' | 'namaMateri' | 'tingkat'>[] }>(`/api/materi/names${queryString}`);
      return res.data;
    }
  });
};

export const useCreateMateri = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { namaMateri: string; tingkat: number; deskripsi?: string }) => {
      const res = await api.post('/api/materi', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MATERI_KEYS.lists() });
    },
  });
};

export const useUpdateMateri = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { namaMateri?: string; tingkat?: number; deskripsi?: string } }) => {
      const res = await api.patch(`/api/materi/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: MATERI_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: MATERI_KEYS.detail(variables.id) });
    },
  });
};

export const useDeleteMateri = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/materi/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MATERI_KEYS.lists() });
    },
  });
};
