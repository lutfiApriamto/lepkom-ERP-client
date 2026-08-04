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

export const useGetCalasToScoreProject = (tanggal: string, search?: string) => {
  return useQuery({
    queryKey: ['calas-to-score-project', tanggal, search],
    queryFn: async () => {
      let queryParams = `?jenisUjian=project&tanggal=${tanggal}`;
      if (search) queryParams += `&search=${search}`;
      
      const { data } = await api.get(`${PENILAIAN_URL}/calas-to-score${queryParams}`);
      return data.data as CalasToScore[];
    },
    enabled: !!tanggal,
  });
};

export const useSubmitPenilaianProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      calasId: string;
      examSessionId: string;
      deskripsi: string;
      kriteria: {
        penguasaan: number;
        kreatifitas: number;
        kontribusi: number;
        presentasi: number;
        motivasi: number;
        interpersonal: number;
        integritas: number;
        potensi: number;
      };
    }) => {
      const { data } = await api.post(`${PENILAIAN_URL}/project`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calas-to-score-project'] });
    },
  });
};
