import { useEffect } from 'react';
import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { path } from '@/utils/consts';
import HeaderContent from './components/HeaderContent';
import UploadTable from './components/UploadTable';
import useTableFiltersSortUrlSync from '@/hooks/shared/useTableFiltersSortUrlSync';
import { useCheckUploadSocket } from './hooks/useCheckUploadSocket';

const CheckUploadCalasModule = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();

  const {
    columnFilters,
    setColumnFilters,
    sort,
    setState,
    pageSize,
    currentPage,
  } = useTableFiltersSortUrlSync({ listUrlBase: path.lepkom.penugasan.checkUploadJawaban.default });

  // Initialize socket realtime listener
  useCheckUploadSocket();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Penugasan', path: path.lepkom.penugasan.default },
      { label: 'Check Upload Calas', path: path.lepkom.penugasan.checkUploadJawaban.default },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  return (
    <ContentLayout>
      <div className="space-y-6">
        <HeaderContent 
          columnFilters={columnFilters} 
          setColumnFilters={setColumnFilters} 
        />
        <UploadTable 
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          sort={sort}
          setState={setState}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </div>
    </ContentLayout>
  );
};

export default CheckUploadCalasModule;