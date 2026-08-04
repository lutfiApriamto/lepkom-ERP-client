import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/interceptors';

export interface Soal {
  _id: string;
  judulSoal: string;
  materiRef: {
    _id: string;
    namaMateri: string;
    tingkat: number;
  };
  tingkat: number;
  file: string | null;
  isViewed: boolean;
  dibuatOleh: {
    _id: string;
    nama: string;
    idAsisten: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface SoalListResponse {
  errorStatus: boolean;
  message: string;
  data: Soal[];
  totalData?: number;
  totalPage?: number;
}

export interface CreateSoalPayload {
  judulSoal: string;
  materiRef: string;
  tingkat: number;
  file?: string | null;
}

export const SOAL_KEYS = {
  all: ['soal'] as const,
  lists: () => [...SOAL_KEYS.all, 'list'] as const,
  list: (filters: string) => [...SOAL_KEYS.lists(), { filters }] as const,
  details: () => [...SOAL_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...SOAL_KEYS.details(), id] as const,
};

export const useGetAllSoal = (queryString: string = '') => {
  return useQuery({
    queryKey: SOAL_KEYS.list(queryString),
    queryFn: async () => {
      const res = await api.get<SoalListResponse>(`/api/soal${queryString}`);
      return res.data;
    }
  });
};

export const useGetSoal = (id: string) => {
  return useQuery({
    queryKey: SOAL_KEYS.detail(id),
    queryFn: async () => {
      const res = await api.get<{ data: Soal }>(`/api/soal/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
};

export const useCreateSoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateSoalPayload) => {
      const res = await api.post<{ data: Soal }>('/api/soal', payload);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SOAL_KEYS.lists() });
    },
  });
};

export const useUpdateSoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Partial<CreateSoalPayload> }) => {
      const res = await api.patch<{ data: Soal }>(`/api/soal/${id}`, payload);
      return res.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: SOAL_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: SOAL_KEYS.detail(variables.id) });
    },
  });
};

export const useHardDeleteSoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/soal/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SOAL_KEYS.lists() });
    },
  });
};

export const useToggleViewSoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.patch<{ data: Soal }>(`/api/soal/${id}/toggle-view`);
      return res.data.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: SOAL_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: SOAL_KEYS.detail(id) });
    },
  });
};

export const useUploadTempSoalFile = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await api.post<{ data: { fileUrl: string } }>(`/api/soal/temp-file`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data.data;
    },
  });
};

export const useDeleteTempSoalFile = () => {
  return useMutation({
    mutationFn: async (fileUrl: string) => {
      const res = await api.delete(`/api/soal/temp-file`, {
        data: { fileUrl },
      });
      return res.data;
    },
  });
};

export const downloadSoalFile = async (id: string, filename: string = 'soal_file') => {
  const res = await api.get<{ data: { url: string } }>(`/api/soal/${id}/download`);
  const downloadUrl = res.data.data.url;
  
  // Use a temporary anchor tag to force download with correct filename if possible,
  // or fallback to window.open if it's a cross-origin signed URL.
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
};
