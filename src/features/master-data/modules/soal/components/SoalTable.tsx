import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import DefaultTable from '@/components/table/DefaultTable';
import PaginationPage from '@/components/pagination/PaginationPage';
import useTableFiltersSortUrlSync from '@/hooks/shared/useTableFiltersSortUrlSync';
import { path } from '@/utils/consts';
import { useAuthStore } from '@/features/auth/shared/store';
import { useGetAllSoal } from '../api/soal.api';
import { getListSoalColumns } from '../variables/listSoalColumns';
import { useSoalActions } from '../hooks/useSoalActions';

const SoalTable = () => {
  const { user } = useAuthStore();
  const isAllowedToManage = user?.role === 'super_admin' || user?.role === 'pj_soal_materi';

  const {
    columnFilters,
    setColumnFilters,
    sort,
    setState,
    pageSize,
    currentPage,
  } = useTableFiltersSortUrlSync({ listUrlBase: path.lepkom.masterData.soal.default });

  const actions = useSoalActions();

  const columns = useMemo(
    () => getListSoalColumns(actions, currentPage, pageSize, isAllowedToManage),
    [actions, currentPage, pageSize, isAllowedToManage]
  );

  const queryParams = new URLSearchParams();
  queryParams.set('page', String(currentPage));
  queryParams.set('limit', String(pageSize));
  
  if (sort) {
    const [sortBy, sortOrder] = sort.split(',');
    queryParams.set('sortBy', sortBy);
    queryParams.set('sortOrder', sortOrder);
  }

  columnFilters.forEach((filter) => {
    if (filter.id === 'global_search' || filter.id === 'judulSoal') {
      queryParams.set('search', filter.value);
    } else {
      queryParams.set(filter.id, filter.value);
    }
  });

  const queryString = `?${queryParams.toString()}`;

  const { data, isLoading, isError, error } = useGetAllSoal(queryString);

  const errorMsg = error ? (error as any)?.response?.data?.message || 'Gagal memuat data soal' : '';

  return (
    <Card className="flex flex-col gap-4">
      <DefaultTable
        title="Daftar Soal"
        data={data?.data || []}
        columnDefs={columns}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        sort={sort}
        setSort={setState}
        loading={isLoading}
        loadingCountRows={pageSize}
        isError={isError}
        errorMsg={errorMsg}
        emptyState={{
          title: 'Data tidak ditemukan',
          subTitle: 'Belum ada soal yang ditambahkan atau dipublikasikan.'
        }}
      />
      
      <PaginationPage
        totalData={data?.totalData || 0}
        pageSize={pageSize}
        currentPage={currentPage}
        setPageSize={setState}
        loading={isLoading}
      />
    </Card>
  );
};

export default SoalTable;
