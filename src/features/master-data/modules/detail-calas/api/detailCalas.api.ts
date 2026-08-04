import { useQuery } from '@tanstack/react-query';
import api from '@/utils/interceptors';
import type { DetailCalasResponse } from '../types/detailCalas.types';

export const DETAIL_CALAS_KEYS = {
  all: ['detailCalas'] as const,
  detail: (id: string) => [...DETAIL_CALAS_KEYS.all, id] as const,
};

export const useGetDetailCalas = (id: string) => {
  return useQuery({
    queryKey: DETAIL_CALAS_KEYS.detail(id),
    queryFn: async () => {
      const res = await api.get<DetailCalasResponse>(`/api/calas/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
};

export const downloadDokumenCalas = async (id: string, jenisDokumen: string, filename?: string) => {
  const urlParam = jenisDokumen === 'rangkumanNilai' ? 'rangkuman-nilai' : jenisDokumen;
  const res = await api.get<{ data: { signedUrl: string } }>(`/api/calas/${id}/dokumen/${urlParam}/download`);
  const downloadUrl = res.data.data.signedUrl;
  
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  if (filename) link.download = filename;
  
  document.body.appendChild(link);
  link.click();
  link.remove();
};
