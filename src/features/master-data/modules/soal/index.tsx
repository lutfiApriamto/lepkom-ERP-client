import { useEffect } from 'react';
import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useAuthStore } from '@/features/auth/shared/store';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { path } from '@/utils/consts';
import HeaderContent from './components/HeaderContent';
import SoalTable from './components/SoalTable';

const SoalModule = () => {
  const { user } = useAuthStore();
  const { setBreadcrumbItems } = useBreadcrumbStore();

  const isAllowedToManage = user?.role === 'super_admin' || user?.role === 'pj_soal_materi';

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Master Data', path: path.lepkom.masterData.default },
      { label: 'Master Data Soal', path: path.lepkom.masterData.soal.default },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  return (
    <ContentLayout>
      <div className="space-y-6">
        {isAllowedToManage && <HeaderContent />}
        <SoalTable />
      </div>
    </ContentLayout>
  );
};

export default SoalModule;
