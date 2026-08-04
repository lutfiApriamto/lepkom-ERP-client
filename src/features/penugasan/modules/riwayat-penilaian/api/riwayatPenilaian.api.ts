import { useQuery } from '@tanstack/react-query';
import api from '@/utils/interceptors';

export interface RiwayatPenilaian {
  _id: string;
  calasRef: {
    _id: string;
    namaCalas: string;
    idCalas: string;
    npm: string;
    kelas: string;
    jurusan: string;
  };
  penilaiRef: {
    _id: string;
    nama: string;
    npm: string;
  };
  examSessionRef: {
    _id: string;
    tanggal: string;
    jenisUjian: string;
  };
  roomPlacementRef: {
    _id: string;
    ruangan: string;
  };
  jenisUjian: string;
  kriteria: Record<string, number>;
  deskripsi: string;
  skorKeseluruhan: number;
  createdAt: string;
}

export interface RiwayatPenilaianResponse {
  errorStatus: boolean;
  message: string;
  data: RiwayatPenilaian[];
  totalData?: number;
  totalPage?: number;
}

export const RIWAYAT_PENILAIAN_KEYS = {
  all: ['riwayat_penilaian_all'] as const,
  lists: () => [...RIWAYAT_PENILAIAN_KEYS.all, 'list'] as const,
  list: (filters: string) => [...RIWAYAT_PENILAIAN_KEYS.lists(), { filters }] as const,
};

export const useGetAllHistoryPenilaian = (queryString: string) => {
  return useQuery({
    queryKey: RIWAYAT_PENILAIAN_KEYS.list(queryString),
    queryFn: async () => {
      const res = await api.get<RiwayatPenilaianResponse>(`/api/penilaian/all/history${queryString}`);
      return res.data;
    },
  });
};
