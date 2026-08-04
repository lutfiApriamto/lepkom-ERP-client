import React, { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import DefaultTable from '@/components/table/DefaultTable';
import PaginationPage from '@/components/pagination/PaginationPage';
import { useGetListJawaban } from '../api/checkUpload.api';
import { getListUploadColumns } from '../variables/listUploadColumns';

interface UploadTableProps {
  columnFilters: { id: string; value: string }[];
  setColumnFilters: React.Dispatch<React.SetStateAction<{ id: string; value: string }[]>>;
  sort: string;
  setState: (key: string, value: any) => void;
  pageSize: number;
  currentPage: number;
}

const UploadTable: React.FC<UploadTableProps> = ({
  columnFilters,
  setColumnFilters,
  sort,
  setState,
  pageSize,
  currentPage,
}) => {
  const columns = useMemo(
    () => getListUploadColumns(currentPage, pageSize),
    [currentPage, pageSize]
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

  const { data, isLoading, isError, error } = useGetListJawaban(queryString);

  const errorMsg = error ? (error as any)?.response?.data?.message || 'Gagal memuat data upload' : '';

  return (
    <Card className="flex flex-col gap-4">
      <DefaultTable
        title="Daftar Upload Jawaban Calas"
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
          title: 'Tidak ada data',
          subTitle: 'Belum ada calas yang mengunggah jawaban sesuai filter saat ini.'
        }}
      />
      
      <PaginationPage
        totalData={data?.meta?.total || 0}
        pageSize={pageSize}
        currentPage={currentPage}
        setPageSize={setState}
        loading={isLoading}
      />
    </Card>
  );
};

export default UploadTable;
