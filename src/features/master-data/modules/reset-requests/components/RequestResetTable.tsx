import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import DefaultTable from '@/components/table/DefaultTable';
import PaginationPage from '@/components/pagination/PaginationPage';
import useTableFiltersSortUrlSync from '@/hooks/shared/useTableFiltersSortUrlSync';
import { path } from '@/utils/consts';
import { useGetAllHardResetRequests } from '../api/requestReset.api';
import { useListRequestResetColumns } from '../variables/listRequestResetColumns';

const RequestResetTable = () => {
  const {
    columnFilters,
    setColumnFilters,
    sort,
    setState,
    pageSize,
    currentPage,
  } = useTableFiltersSortUrlSync({ listUrlBase: path.lepkom.masterData.default + '/reset-requests' });

  const actionsColumns = useListRequestResetColumns(currentPage, pageSize);
  const columns = useMemo(() => actionsColumns, [actionsColumns, currentPage, pageSize]);

  const queryParams = new URLSearchParams();
  queryParams.set('page', String(currentPage));
  queryParams.set('limit', String(pageSize));
  
  if (sort) {
    const [sortBy, sortOrder] = sort.split(',');
    queryParams.set('sortBy', sortBy);
    queryParams.set('sortOrder', sortOrder);
  }

  columnFilters.forEach((filter) => {
    if (filter.id === 'global_search' || filter.id === 'inputAwal') {
      queryParams.set('search', filter.value);
    } else {
      queryParams.set(filter.id, filter.value);
    }
  });

  const queryString = `?${queryParams.toString()}`;

  const { data, isLoading, isError, error } = useGetAllHardResetRequests(queryString);

  const errorMsg = error ? (error as any)?.response?.data?.message || 'Gagal memuat data request reset password' : '';

  return (
    <Card className="flex flex-col gap-4">
      <DefaultTable
        title="Daftar Permintaan Reset Password"
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
          title: 'Tidak ada permintaan reset',
          subTitle: 'Saat ini belum ada permintaan reset password dari asisten.'
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

export default RequestResetTable;
