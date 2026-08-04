import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import DefaultTable from '@/components/table/DefaultTable';
import PaginationPage from '@/components/pagination/PaginationPage';
import useTableFiltersSortUrlSync from '@/hooks/shared/useTableFiltersSortUrlSync';
import { useListRoomPlacementColumns } from '../variables/listRoomPlacementColumns';
import { useGetRoomPlacements } from '../api/penempatanAsisten.api';
import { path } from '@/utils/consts';

const PenempatanAsistenTable = () => {
  const {
    columnFilters,
    setColumnFilters,
    sort,
    setState,
    pageSize,
    currentPage,
  } = useTableFiltersSortUrlSync({ listUrlBase: path.lepkom.penugasan?.penempatanRuanganAsisten?.default || '/penugasan/penempatan-ruangan-asisten' });

  const actionsColumns = useListRoomPlacementColumns(currentPage, pageSize);
  const columns = useMemo(
    () => actionsColumns,
    [actionsColumns, currentPage, pageSize]
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

  const { data, isLoading, isError, error } = useGetRoomPlacements(queryString);
  const errorMsg = error ? (error as any)?.response?.data?.message || 'Gagal memuat data penugasan ruangan' : '';

  return (
    <Card className="flex flex-col gap-4">
      <DefaultTable
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
          title: 'Tidak Ada Data Penugasan',
          subTitle: 'Belum ada jadwal penugasan ruangan asisten yang dibuat.',
        }}
      />

      <PaginationPage
        totalData={data?.meta?.totalData || 0}
        pageSize={pageSize}
        currentPage={currentPage}
        setPageSize={setState}
        loading={isLoading}
      />
    </Card>
  );
};

export default PenempatanAsistenTable;
