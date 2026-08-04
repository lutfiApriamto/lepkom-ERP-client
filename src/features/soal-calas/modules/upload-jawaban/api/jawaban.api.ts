import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/interceptors';
import type { ApiResponse } from '@/types';
import { BIODATA_KEYS, type CalasProfile } from '@/features/biodata/shared/api/biodata.api';

type JenisUjian = 'praktek' | 'project';

export const useUploadTempJawaban = () => {
  return useMutation({
    mutationFn: async ({ jenisUjian, file }: { jenisUjian: JenisUjian; file: File }) => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await api.post<ApiResponse<{ fileUrl: string }>>(`/api/ujian/jawaban/${jenisUjian}/temp`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (!res.data.data) throw new Error('Failed to get fileUrl');
      return res.data.data;
    },
  });
};

export const useDeleteTempJawaban = () => {
  return useMutation({
    mutationFn: async (fileUrl: string) => {
      const res = await api.delete<ApiResponse<null>>(`/api/ujian/jawaban/temp`, {
        data: { fileUrl },
      });
      return res.data;
    },
  });
};

export const useSaveJawaban = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ jenisUjian, fileUrl }: { jenisUjian: JenisUjian; fileUrl: string }) => {
      const res = await api.patch<ApiResponse<CalasProfile>>(`/api/ujian/jawaban/${jenisUjian}`, { fileUrl });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BIODATA_KEYS.profile() });
    },
  });
};

export const useDeletePermanentJawaban = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (jenisUjian: JenisUjian) => {
      const res = await api.delete<ApiResponse<CalasProfile>>(`/api/ujian/jawaban/${jenisUjian}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BIODATA_KEYS.profile() });
    },
  });
};

export const downloadJawaban = async (jenisUjian: JenisUjian, filename?: string) => {
  const res = await api.get<ApiResponse<{ signedUrl: string }>>(`/api/ujian/jawaban/${jenisUjian}/download`);
  const downloadUrl = res.data.data?.signedUrl;
  
  if (!downloadUrl) throw new Error('Failed to get signedUrl');
  
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  if (filename) link.download = filename;
  
  document.body.appendChild(link);
  link.click();
  link.remove();
};

