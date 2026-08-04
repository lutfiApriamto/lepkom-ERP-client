import { useEffect } from 'react';
import { AdminGlobalStatsWidget } from './components/AdminGlobalStatsWidget';
import { AdminChartWidget } from './components/AdminChartWidget';
import { AdminQuickActionsWidget } from './components/AdminQuickActionsWidget';
import { AdminActivitiesWidget } from './components/AdminActivitiesWidget';
import { useGetAdminStats } from '../../shared/api';
import { useAdminDashboardStore } from '../../shared/store';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';

const SuperAdminDashboard = () => {
  const { data, isLoading } = useGetAdminStats();
  const { setBreadcrumbItems } = useBreadcrumbStore();
  
  const setState = useAdminDashboardStore(state => state.setState);
  const breadcrumbItems = useAdminDashboardStore(state => state.breadcrumbItems);

  useEffect(() => {
    // Only set on mount
    setBreadcrumbItems(breadcrumbItems);
    return () => setBreadcrumbItems([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setState('adminStats', data);
    }
  }, [data, setState]);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Super Admin</h1>
        <p className="text-gray-500 mt-1">Ringkasan statistik pendaftaran dan performa asisten.</p>
      </div>
      
      <AdminGlobalStatsWidget isLoading={isLoading} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AdminChartWidget isLoading={isLoading} />
        </div>
        <div className="space-y-6 flex flex-col">
          <AdminQuickActionsWidget />
          <div className="flex-1">
            <AdminActivitiesWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
