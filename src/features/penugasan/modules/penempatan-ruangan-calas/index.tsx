import { useEffect } from 'react';
import HeaderContent from './components/HeaderContent';
import PenempatanCalasTable from './components/PenempatanCalasTable';
import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { path } from '@/utils/consts';

const PenempatanRuanganCalasPage = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Penugasan', path: path.lepkom.penugasan?.default || '/penugasan' },
      { label: 'Penempatan Ruangan Calas', path: '/penugasan/penempatan-ruangan-calas' },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  return (
    <ContentLayout>
      <div className="space-y-6">
        <HeaderContent />
        <PenempatanCalasTable />
      </div>
    </ContentLayout>
  );
};

export default PenempatanRuanganCalasPage;