import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utils/interceptors';

export const useGetCalasStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'calasStats'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/dashboard/calas');
      return response.data.data;
    }
  });
};
