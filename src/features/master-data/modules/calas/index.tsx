import { useEffect } from 'react';
import HeaderContent from './components/HeaderContent';
import CalasTable from './components/CalasTable';
import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { path } from '@/utils/consts';

const MasterDataCalas = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Master Data', path: path.lepkom.masterData.default },
      { label: 'Master Data Calas', path: '/master-data/calas' },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  return (
    <ContentLayout>
      <div className="space-y-6">
        <HeaderContent />
        <CalasTable />
      </div>
    </ContentLayout>
  );
};

export default MasterDataCalas;
