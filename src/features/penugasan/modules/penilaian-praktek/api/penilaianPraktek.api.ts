import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/interceptors';

const PENILAIAN_URL = '/api/penilaian';

export interface CalasToScore {
  _id: string;
  idCalas: string;
  namaCalas: string;
  npm: string;
  kelas: string;
  jurusan: string;
  examSessionId: string;
}

export const useGetCalasToScorePraktek = (tanggal: string, search?: string) => {
  return useQuery({
    queryKey: ['calas-to-score-praktek', tanggal, search],
    queryFn: async () => {
      let queryParams = `?jenisUjian=praktek&tanggal=${tanggal}`;
      if (search) queryParams += `&search=${search}`;
      
      const { data } = await api.get(`${PENILAIAN_URL}/calas-to-score${queryParams}`);
      return data.data as CalasToScore[];
    },
    enabled: !!tanggal,
  });
};

export const useSubmitPenilaianPraktek = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      calasId: string;
      examSessionId: string;
      deskripsi: string;
      kriteria: {
        konsep: number;
        eksekusi: number;
        analisa: number;
        klarifikasi: number;
      };
    }) => {
      const { data } = await api.post(`${PENILAIAN_URL}/praktek`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calas-to-score-praktek'] });
    },
  });
};
