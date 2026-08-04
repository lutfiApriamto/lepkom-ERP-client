import { useEffect } from 'react';
import { CalasStatusWidget } from './components/CalasStatusWidget';
import { useGetCalasStats } from '../../shared/api';
import { useCalasDashboardStore } from '../../shared/store';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';

const CalasDashboard = () => {
  const { data, isLoading } = useGetCalasStats();
  const { setBreadcrumbItems } = useBreadcrumbStore();
  
  const setState = useCalasDashboardStore(state => state.setState);
  const breadcrumbItems = useCalasDashboardStore(state => state.breadcrumbItems);

  useEffect(() => {
    // Only set on mount
    setBreadcrumbItems(breadcrumbItems);
    return () => setBreadcrumbItems([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setState('calasStats', data);
    }
  }, [data, setState]);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Calon Asisten</h1>
        <p className="text-gray-500 mt-1">Pantau perkembangan seleksi dan jadwal Anda.</p>
      </div>

      <CalasStatusWidget isLoading={isLoading} />
    </div>
  );
};

export default CalasDashboard;
