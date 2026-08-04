import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/interceptors';

const PENUGASAN_URL = '/api/penugasan';

export interface RoomPlacement {
  _id: string;
  ruangan: number;
  examSessionRef: {
    _id: string;
    tanggal: string;
    jamMulai: string;
    jamSelesai: string;
    jenisUjian: string;
  };
  pjRuanganList: { _id: string; idAsisten: string; nama: string; role: string; npm: string }[];
  penilaiList: { _id: string; idAsisten: string; nama: string; role: string; npm: string }[];
  calasList: { _id: string; idCalas: string; namaCalas: string; npm: string; kelas: string }[];
}

export interface AvailableCalas {
  _id: string;
  idCalas: string;
  namaCalas: string;
  npm: string;
  kelas: string;
}

export const useGetRoomPlacements = (queryString: string) => {
  return useQuery({
    queryKey: ['room-placements-calas', queryString],
    queryFn: async () => {
      const { data } = await api.get(`${PENUGASAN_URL}/ruangan${queryString}`);
      return data;
    },
  });
};

export const useGetAvailableCalas = (tanggal: string, jenisUjian: string, ruangan: number) => {
  return useQuery({
    queryKey: ['available-calas', tanggal, jenisUjian, ruangan],
    queryFn: async () => {
      const { data } = await api.get(`${PENUGASAN_URL}/calas/available?tanggal=${tanggal}&jenisUjian=${jenisUjian}&ruangan=${ruangan}`);
      return data.data as AvailableCalas[];
    },
    enabled: !!tanggal && !!jenisUjian && !!ruangan,
  });
};

export const useUpdateCalasPlacement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: { calasIds: string[] } }) => {
      const { data } = await api.put(`${PENUGASAN_URL}/ruangan/${id}/calas`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room-placements-calas'] });
    },
  });
};
