import { useEffect } from 'react';
import { TodayScheduleWidget } from './components/TodayScheduleWidget';
import { useGetKoordinatorStats } from '../../shared/api';
import { useKoordinatorDashboardStore } from '../../shared/store';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';

const KoordinatorDashboard = () => {
  const { data, isLoading } = useGetKoordinatorStats();
  const { setBreadcrumbItems } = useBreadcrumbStore();
  
  const setState = useKoordinatorDashboardStore(state => state.setState);
  const breadcrumbItems = useKoordinatorDashboardStore(state => state.breadcrumbItems);

  useEffect(() => {
    // Only set on mount
    setBreadcrumbItems(breadcrumbItems);
    return () => setBreadcrumbItems([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setState('koordinatorStats', data);
    }
  }, [data, setState]);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Manajemen Lapangan</h1>
        <p className="text-gray-500 mt-1">Pantau jadwal ujian dan ruangan yang aktif hari ini.</p>
      </div>
      
      <TodayScheduleWidget isLoading={isLoading} />
    </div>
  );
};

export default KoordinatorDashboard;
