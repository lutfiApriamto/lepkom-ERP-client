import { useEffect } from 'react';
import HeaderContent from './components/HeaderContent';
import PenempatanAsistenTable from './components/PenempatanAsistenTable';
import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { path } from '@/utils/consts';

const PenempatanRuanganAsistenPage = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Penugasan', path: path.lepkom.penugasan?.default || '/penugasan' },
      { label: 'Penempatan Ruangan Asisten', path: '/penugasan/penempatan-ruangan-asisten' },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  return (
    <ContentLayout>
      <div className="space-y-6">
        <HeaderContent />
        <PenempatanAsistenTable />
      </div>
    </ContentLayout>
  );
};

export default PenempatanRuanganAsistenPage;