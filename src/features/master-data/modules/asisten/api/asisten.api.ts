import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/interceptors';
import type { ApiResponse } from '@/types';

export interface Asisten {
  _id: string;
  idAsisten: string;
  npm: string;
  nama: string;
  email: string;
  kelasSaatIni: string;
  role: string;
  isActive: boolean;
  wajibGantiPassword?: boolean;
  calasRef?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AsistenListResponse {
  errorStatus: boolean;
  message: string;
  data: Asisten[];
  totalData?: number;
  totalPage?: number;
}

export const ASISTEN_KEYS = {
  all: ['asisten'] as const,
  lists: () => [...ASISTEN_KEYS.all, 'list'] as const,
  list: (filters: string) => [...ASISTEN_KEYS.lists(), { filters }] as const,
  details: () => [...ASISTEN_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ASISTEN_KEYS.details(), id] as const,
  filters: () => [...ASISTEN_KEYS.all, 'filters'] as const,
};

export const useGetAllAsisten = (queryString: string) => {
  return useQuery({
    queryKey: ASISTEN_KEYS.list(queryString),
    queryFn: async () => {
      const res = await api.get<AsistenListResponse>(`/api/asisten${queryString}`);
      return res.data;
    }
  });
};

export const useGetAsistenFilters = () => {
  return useQuery({
    queryKey: ASISTEN_KEYS.filters(),
    queryFn: async () => {
      const res = await api.get<ApiResponse<{ kelasSaatIni: string[]; roles: string[] }>>('/api/asisten/filters');
      return res.data;
    }
  });
};

export const useCreateAsisten = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { idAsisten: string; npm: string; nama: string; kelasSaatIni?: string }) => {
      const res = await api.post<ApiResponse<Asisten>>('/api/asisten', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ASISTEN_KEYS.lists() });
    },
  });
};

export const useUpdateAsisten = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { idAsisten: string; npm: string; nama: string; kelasSaatIni?: string } }) => {
      const res = await api.patch<ApiResponse<Asisten>>(`/api/asisten/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ASISTEN_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: ASISTEN_KEYS.detail(variables.id) });
    },
  });
};

export const useUpdateAsistenRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { role: string } }) => {
      const res = await api.patch<ApiResponse<Asisten>>(`/api/asisten/${id}/role`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ASISTEN_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: ASISTEN_KEYS.detail(variables.id) });
    },
  });
};

export const useToggleAsistenActive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.patch<ApiResponse<Asisten>>(`/api/asisten/${id}/toggle-active`);
      return res.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ASISTEN_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: ASISTEN_KEYS.detail(id) });
    },
  });
};

export const useResetAsistenPassword = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.patch<ApiResponse<{ asistenId: string }>>(`/api/asisten/${id}/reset-password`);
      return res.data;
    },
  });
};

export const useDeleteAsisten = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete<ApiResponse<{ deletedId: string }>>(`/api/asisten/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ASISTEN_KEYS.lists() });
    },
  });
};

export const useImportAsisten = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      // Axios akan otomatis mengatur multipart/form-data
      const res = await api.post<ApiResponse<any>>('/api/asisten/import', formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ASISTEN_KEYS.lists() });
    },
  });
};

export const downloadExportAsisten = async () => {
  const res = await api.get('/api/asisten/export', {
    responseType: 'blob',
  });
  
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'data_asisten.xlsx');
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
