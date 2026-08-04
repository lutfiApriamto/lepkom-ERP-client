import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/interceptors';
import type { ApiResponse } from '@/types';

export interface Calas {
  _id: string;
  idCalas: string;
  npm: string;
  namaCalas: string;
  emailCalas: string;
  kelas: string;
  jurusan: string;
  isKursusDelete: boolean;
  SemesterKursusDel?: string;
  gelombangDaftar: string;
  statusRekrutmen: {
    tahapSaatIni: string;
    hasil: string;
    alasanTidakLolos?: string | null;
    deskripsiPenolakan?: string | null;
  };
  isBanned: boolean;
  isBiodataEmailSending: boolean;
  daftarVia: string;
  didaftarkanOleh: string | null;
  skorAkhirNilai: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CalasListResponse {
  errorStatus: boolean;
  message: string;
  data: Calas[];
  totalData?: number;
  totalPage?: number;
}

export const CALAS_KEYS = {
  all: ['calas'] as const,
  lists: () => [...CALAS_KEYS.all, 'list'] as const,
  list: (filters: string) => [...CALAS_KEYS.lists(), { filters }] as const,
  details: () => [...CALAS_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...CALAS_KEYS.details(), id] as const,
  filters: () => [...CALAS_KEYS.all, 'filters'] as const,
};

// ─── READ ───────────────────────────────────────────────────────────────────

export const useGetAllCalas = (queryString: string) => {
  return useQuery({
    queryKey: CALAS_KEYS.list(queryString),
    queryFn: async () => {
      const res = await api.get<CalasListResponse>(`/api/calas${queryString}`);
      return res.data;
    }
  });
};

export const useGetCalasFilters = () => {
  return useQuery({
    queryKey: CALAS_KEYS.filters(),
    queryFn: async () => {
      const res = await api.get<ApiResponse<{ jurusan: string[]; kelas: string[]; semesterKursusDel: string[] }>>('/api/calas/filters');
      return res.data;
    }
  });
};

// ─── CREATE & IMPORT ─────────────────────────────────────────────────────────

export const useCreateCalas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const res = await api.post<ApiResponse<Calas>>('/api/calas', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.lists() });
    },
  });
};

export const useImportCalas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.post<ApiResponse<any>>('/api/calas/import', formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.lists() });
    },
  });
};

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export const useUpdateCalas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Record<string, any> }) => {
      const res = await api.patch<ApiResponse<Calas>>(`/api/calas/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.detail(variables.id) });
    },
  });
};

export const useUpdateTimeline = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { tahapSaatIni: string; hasil: string; alasanTidakLolos?: string | null; deskripsiPenolakan?: string | null } }) => {
      const res = await api.patch<ApiResponse<Calas>>(`/api/calas/${id}/timeline`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.detail(variables.id) });
    },
  });
};

export const useAcceptCalas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.patch<ApiResponse<Calas>>(`/api/calas/${id}/accept`);
      return res.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.detail(id) });
    },
  });
};

export const useRejectCalas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { alasanTidakLolos: string; deskripsiPenolakan?: string | null } }) => {
      const res = await api.patch<ApiResponse<Calas>>(`/api/calas/${id}/reject`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.detail(variables.id) });
    },
  });
};

export const useResetCalasPassword = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.patch<ApiResponse<Calas>>(`/api/calas/${id}/reset-password`);
      return res.data;
    },
  });
};

export const useSendBiodataEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.post<ApiResponse<Calas>>(`/api/calas/${id}/send-biodata-email`);
      return res.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.detail(id) });
    },
  });
};

// ─── DELETE ──────────────────────────────────────────────────────────────────

export const useDeleteCalas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, password }: { id: string; password?: string }) => {
      const res = await api.delete<ApiResponse<{ deletedId: string }>>(`/api/calas/${id}`, {
        data: { password }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CALAS_KEYS.lists() });
    },
  });
};

// ─── EXPORT ──────────────────────────────────────────────────────────────────

export const downloadExportCalas = async () => {
  const res = await api.get('/api/calas/export', {
    responseType: 'blob',
  });
  
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'data_calas.xlsx');
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
