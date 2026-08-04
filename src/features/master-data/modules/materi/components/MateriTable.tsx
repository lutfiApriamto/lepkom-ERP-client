import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import DefaultTable from '@/components/table/DefaultTable';
import PaginationPage from '@/components/pagination/PaginationPage';
import useTableFiltersSortUrlSync from '@/hooks/shared/useTableFiltersSortUrlSync';
import { getListMateriColumns } from '../variables/listMateriColumns';
import { useGetAllMateri } from '../api/materi.api';
import { useMateriActions } from '../hooks/useMateriActions';
import { useAuthStore } from '@/features/auth/shared/store';
import { path } from '@/utils/consts';

const MateriTable = () => {
  const { role } = useAuthStore();
  const isAuthorized = role === 'super_admin' || role === 'pj_soal_materi';

  const {
    columnFilters,
    setColumnFilters,
    sort,
    setState,
    pageSize,
    currentPage,
  } = useTableFiltersSortUrlSync({ listUrlBase: path.lepkom.masterData.materi.default });

  const actions = useMateriActions();
  const columns = useMemo(
    () => getListMateriColumns(actions, currentPage, pageSize, isAuthorized),
    [actions, currentPage, pageSize, isAuthorized]
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
    if (filter.id === 'global_search') {
      queryParams.set('search', filter.value);
    } else {
      queryParams.set(filter.id, filter.value);
    }
  });

  const queryString = `?${queryParams.toString()}`;

  const { data, isLoading, isError, error } = useGetAllMateri(queryString);

  const errorMsg = error ? (error as any)?.response?.data?.message || 'Gagal memuat data materi' : '';

  return (
    <Card className="flex flex-col gap-4">
      <DefaultTable
        title="Daftar Materi"
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
          title: 'Tidak Ada Materi',
          subTitle: 'Belum ada data materi atau tidak ada yang cocok dengan filter.',
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

export default MateriTable;
