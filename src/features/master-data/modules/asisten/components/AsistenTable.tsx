import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import DefaultTable from '@/components/table/DefaultTable';
import PaginationPage from '@/components/pagination/PaginationPage';
import useTableFiltersSortUrlSync from '@/hooks/shared/useTableFiltersSortUrlSync';
import { getListAsistenColumns } from '../variables/listAsistenColumns';
import { useGetAllAsisten } from '../api/asisten.api';
import { useAsistenActions } from '../hooks/useAsistenActions';
import { useAuthStore } from '@/features/auth/shared/store';
import { useGetAllRekrutmen } from '../../rekrutmen/api/rekrutmen.api';
import { path } from '@/utils/consts';

const AsistenTable = () => {
  const { role } = useAuthStore();
  const isSuperAdmin = role === 'super_admin';

  const { data: rekrutmenData } = useGetAllRekrutmen('?isActive=true');
  const isRecruitmentActive = Array.isArray(rekrutmenData?.data) && rekrutmenData.data.length > 0;

  const {
    columnFilters,
    setColumnFilters,
    sort,
    setState,
    pageSize,
    currentPage,
  } = useTableFiltersSortUrlSync({ listUrlBase: path.lepkom.masterData.asisten.default });

  const actions = useAsistenActions();
  const columns = useMemo(
    () => getListAsistenColumns(actions, currentPage, pageSize, isSuperAdmin, isRecruitmentActive),
    [actions, currentPage, pageSize, isSuperAdmin, isRecruitmentActive]
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

  const { data, isLoading, isError, error } = useGetAllAsisten(queryString);

  const errorMsg = error ? (error as any)?.response?.data?.message || 'Gagal memuat data asisten' : '';

  return (
    <Card className="flex flex-col gap-4">
      <DefaultTable
        title="Daftar Asisten"
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
          title: 'Tidak Ada Asisten',
          subTitle: 'Belum ada data asisten atau tidak ada yang cocok dengan filter.',
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

export default AsistenTable;
