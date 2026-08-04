import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import DefaultTable from '@/components/table/DefaultTable';
import PaginationPage from '@/components/pagination/PaginationPage';
import useTableFiltersSortUrlSync from '@/hooks/shared/useTableFiltersSortUrlSync';
import { path } from '@/utils/consts';
import { useAuthStore } from '@/features/auth/shared/store';
import { useGetAllQuestionCards } from '../api/questionCard.api';
import { getListQuestionCardColumns } from '../variables/listQuestionCardColumns';
import { useQuestionCardActions } from '../hooks/useQuestionCardActions';

const QuestionCardTable = () => {
  const { user } = useAuthStore();
  const { handleEdit, handleDelete } = useQuestionCardActions();
  
  const isAllowedToManage = user?.role === 'super_admin' || user?.role === 'pj_soal_materi';

  const {
    columnFilters,
    setColumnFilters,
    sort,
    setState,
    pageSize,
    currentPage,
  } = useTableFiltersSortUrlSync({ listUrlBase: path.lepkom.masterData.questionCard.default });

  const columns = useMemo(
    () => getListQuestionCardColumns(handleEdit, handleDelete, isAllowedToManage, currentPage, pageSize),
    [handleEdit, handleDelete, isAllowedToManage, currentPage, pageSize]
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
    if (filter.id === 'global_search' || filter.id === 'judulPertanyaan') {
      queryParams.set('search', filter.value);
    } else {
      queryParams.set(filter.id, filter.value);
    }
  });

  const queryString = `?${queryParams.toString()}`;

  const { data, isLoading, isError, error } = useGetAllQuestionCards(queryString);

  const errorMsg = error ? (error as any)?.response?.data?.message || 'Gagal memuat data question card' : '';

  return (
    <Card className="flex flex-col gap-4">
      <DefaultTable
        title="Daftar Question Card"
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
          subTitle: 'Belum ada question card yang ditambahkan.'
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

export default QuestionCardTable;
