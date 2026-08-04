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

export interface AvailableAsisten {
  _id: string;
  idAsisten: string;
  nama: string;
  npm: string;
  role: string;
}

export const useGetRoomPlacements = (queryString: string) => {
  return useQuery({
    queryKey: ['room-placements', queryString],
    queryFn: async () => {
      const { data } = await api.get(`${PENUGASAN_URL}/ruangan${queryString}`);
      return data;
    },
  });
};

export const useGetAvailablePJ = (tanggal: string, jenisUjian: string, ruangan: number) => {
  return useQuery({
    queryKey: ['available-pj', tanggal, jenisUjian, ruangan],
    queryFn: async () => {
      const { data } = await api.get(`${PENUGASAN_URL}/asisten/available-pj?tanggal=${tanggal}&jenisUjian=${jenisUjian}&ruangan=${ruangan}`);
      return data.data as AvailableAsisten[];
    },
    enabled: !!tanggal && !!jenisUjian && !!ruangan,
  });
};

export const useGetAvailablePenilai = (tanggal: string, jenisUjian: string, ruangan: number) => {
  return useQuery({
    queryKey: ['available-penilai', tanggal, jenisUjian, ruangan],
    queryFn: async () => {
      const { data } = await api.get(`${PENUGASAN_URL}/asisten/available-penilai?tanggal=${tanggal}&jenisUjian=${jenisUjian}&ruangan=${ruangan}`);
      return data.data as AvailableAsisten[];
    },
    enabled: !!tanggal && !!jenisUjian && !!ruangan,
  });
};

export const useCreateRoomPlacement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      tanggal: string;
      jenisUjian: string;
      ruangan: number;
      pjRuanganIds: string[];
      penilaiIds: string[];
    }) => {
      const { data } = await api.post(`${PENUGASAN_URL}/ruangan/asisten`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room-placements'] });
    },
  });
};

export const useUpdateRoomPlacement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: { pjRuanganIds: string[]; penilaiIds: string[] } }) => {
      const { data } = await api.put(`${PENUGASAN_URL}/ruangan/${id}/asisten`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room-placements'] });
    },
  });
};

export const useDeleteRoomPlacement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`${PENUGASAN_URL}/ruangan/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room-placements'] });
    },
  });
};
