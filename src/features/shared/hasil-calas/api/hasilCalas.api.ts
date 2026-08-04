import { useQuery } from '@tanstack/react-query';
import api from '@/utils/interceptors';

export const HASIL_CALAS_KEYS = {
  all: ['hasilCalas'] as const,
  me: () => [...HASIL_CALAS_KEYS.all, 'me'] as const,
};

export const useGetHasilCalasMe = () => {
  return useQuery({
    queryKey: HASIL_CALAS_KEYS.me(),
    queryFn: async () => {
      // Endpoint yang digunakan adalah /api/calas/me sesuai dengan getMe di management.controller.js
      const res = await api.get<{ data: any }>('/api/calas/me');
      return res.data.data;
    },
  });
};

export const downloadDokumenSelf = async (jenisDokumen: string, filename?: string) => {
  // Menggunakan endpoint biodata yang diperuntukkan bagi Calas (calasAuth)
  const urlParam = jenisDokumen === 'rangkumanNilai' ? 'rangkuman-nilai' : jenisDokumen;
  const res = await api.get<{ data: { signedUrl: string } }>(`/api/calas/me/biodata/dokumen/${urlParam}/download`);
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
