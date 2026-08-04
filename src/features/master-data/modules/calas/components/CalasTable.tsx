import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import DefaultTable from '@/components/table/DefaultTable';
import PaginationPage from '@/components/pagination/PaginationPage';
import useTableFiltersSortUrlSync from '@/hooks/shared/useTableFiltersSortUrlSync';
import { getListCalasColumns } from '../variables/listCalasColumns';
import { useGetAllCalas, useGetCalasFilters } from '../api/calas.api';
import { useCalasActions } from '../hooks/useCalasActions';
import { useAuthStore } from '@/features/auth/shared/store';
import { path } from '@/utils/consts';

const CalasTable = () => {
  const { role } = useAuthStore();
  const isSuperAdmin = role === 'super_admin';

  const { data: filtersData } = useGetCalasFilters();

  const {
    columnFilters,
    setColumnFilters,
    sort,
    setState,
    pageSize,
    currentPage,
  } = useTableFiltersSortUrlSync({ listUrlBase: path.lepkom.masterData.calas.default });

  const actions = useCalasActions();
  const columns = useMemo(
    () => getListCalasColumns(actions, currentPage, pageSize, isSuperAdmin, filtersData),
    [actions, currentPage, pageSize, isSuperAdmin, filtersData]
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
    } else if (filter.id === 'statusRekrutmen.tahapSaatIni') {
      queryParams.set('tahapSaatIni', filter.value);
    } else if (filter.id === 'statusRekrutmen.hasil') {
      queryParams.set('hasil', filter.value);
    } else {
      queryParams.set(filter.id, filter.value);
    }
  });

  const queryString = `?${queryParams.toString()}`;

  const { data, isLoading, isError, error } = useGetAllCalas(queryString);

  const errorMsg = error ? (error as any)?.response?.data?.message || 'Gagal memuat data calas' : '';

  return (
    <Card className="flex flex-col gap-4">
      <DefaultTable
        title="Daftar Calon Asisten"
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
          title: 'Tidak Ada Data Calas',
          subTitle: 'Belum ada pendaftar atau tidak ada yang cocok dengan filter.',
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

export default CalasTable;
