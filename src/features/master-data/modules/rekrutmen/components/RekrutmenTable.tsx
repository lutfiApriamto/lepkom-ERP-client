import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import DefaultTable from '@/components/table/DefaultTable';
import PaginationPage from '@/components/pagination/PaginationPage';
import useTableFiltersSortUrlSync from '@/hooks/shared/useTableFiltersSortUrlSync';
import { useGetAllRekrutmen } from '../api/rekrutmen.api';
import { getListRekrutmenColumns } from '../variables/listRekrutmenColumns';
import { useRekrutmenActions } from '../hooks/useRekrutmenActions';
import { path } from '@/utils/consts';

const RekrutmenTable = () => {
  const {
    columnFilters,
    setColumnFilters,
    sort,
    setState,
    pageSize,
    currentPage,
  } = useTableFiltersSortUrlSync({ listUrlBase: path.lepkom.masterData.rekrutmen.default });

  const actions = useRekrutmenActions();
  const columns = useMemo(() => getListRekrutmenColumns(actions, currentPage, pageSize), [actions, currentPage, pageSize]);

  // Construct query string for API
  const queryParams = new URLSearchParams();
  queryParams.set('page', String(currentPage));
  queryParams.set('limit', String(pageSize));
  
  if (sort) {
    const [sortBy, sortOrder] = sort.split(',');
    queryParams.set('sortBy', sortBy);
    queryParams.set('sortOrder', sortOrder);
  }

  // Handle columnFilters from URL Sync hook
  columnFilters.forEach((filter) => {
    if (filter.id === 'global_search') {
      queryParams.set('search', filter.value);
    } else {
      queryParams.set(filter.id, filter.value);
    }
  });

  const queryString = `?${queryParams.toString()}`;

  const { data, isLoading, isError, error } = useGetAllRekrutmen(queryString);

  const errorMsg = error ? (error as any)?.response?.data?.message || 'Gagal memuat data rekrutmen' : '';

  return (
    <Card className="flex flex-col gap-4">
      <DefaultTable
        title="Daftar Gelombang Rekrutmen"
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
          title: 'Tidak Ada Gelombang Rekrutmen',
          subTitle: 'Belum ada data gelombang rekrutmen atau tidak ada yang cocok dengan filter.',
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

export default RekrutmenTable;
