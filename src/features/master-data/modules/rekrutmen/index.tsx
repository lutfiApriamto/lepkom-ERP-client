import { useEffect } from 'react';
import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import HeaderContent from './components/HeaderContent';
import RekrutmenTable from './components/RekrutmenTable';
import { path } from '@/utils/consts';

const RekrutmenModule = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Master Data', path: path.lepkom.masterData.default },
      { label: 'Master Data Rekrutmen', path: path.lepkom.masterData.rekrutmen.default },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  return (
    <ContentLayout>
      <div className="space-y-6">
        <HeaderContent />
        <RekrutmenTable />
      </div>
    </ContentLayout>
  );
};

export default RekrutmenModule;
