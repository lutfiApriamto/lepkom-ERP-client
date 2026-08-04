import { useQuery, useMutation } from '@tanstack/react-query';
import { getSoalCalas, downloadSoalCalas } from '../api';
import { useDaftarSoalStore } from '../store/useDaftarSoalStore';
import toast from 'react-hot-toast';

export const useGetSoalCalas = () => {
  const { page, limit, search, tingkat } = useDaftarSoalStore();

  return useQuery({
    queryKey: ['soal-calas', { page, limit, search, tingkat }],
    queryFn: () => getSoalCalas({ page, limit, search, tingkat }),
  });
};

export const useDownloadSoal = () => {
  return useMutation({
    mutationFn: (id: string) => downloadSoalCalas(id),
    onSuccess: (data) => {
      // Buka URL download di tab baru
      window.open(data.url, '_blank');
      toast.success('Berhasil mengunduh soal');
    },
    onError: (error: any) => {
      const message = error.response?.data?.errors?.[0]?.message || 'Gagal mengunduh soal';
      toast.error(message);
    },
  });
};
