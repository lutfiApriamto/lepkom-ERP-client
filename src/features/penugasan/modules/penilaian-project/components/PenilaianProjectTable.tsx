import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import DefaultTable from '@/components/table/DefaultTable';
import { useGetCalasToScoreProject } from '../api/penilaianProject.api';
import { usePenilaianProjectStore } from '../store/usePenilaianProjectStore';
import { usePenilaianProjectActions } from '../hooks/usePenilaianProjectActions';
import { listPenilaianProjectColumns } from '../variables/listPenilaianProjectColumns';

const PenilaianProjectTable = () => {
  const [search, setSearch] = useState('');
  const { selectedDate } = usePenilaianProjectStore();
  const { handleBeriPenilaian } = usePenilaianProjectActions();

  const { data: calasList, isLoading, isError, error } = useGetCalasToScoreProject(selectedDate, search);

  const columns = useMemo(
    () => listPenilaianProjectColumns({ handleBeriPenilaian }),
    [handleBeriPenilaian]
  );

  if (isError) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-500 py-10">
          Gagal memuat data calas: {(error as any)?.message || 'Terjadi kesalahan'}
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-t-none border-t-0 shadow-sm">
      <DefaultTable
        data={calasList || []}
        columnDefs={columns}
        loading={isLoading}

        emptyState={{
          title: 'Tidak Ada Calas',
          subTitle: `Anda tidak memiliki jadwal untuk menilai calas ujian project pada tanggal ini, atau semua calas sudah dinilai.`,
        }}
        columnFilters={[{ id: 'global_search', value: search }]}
        setColumnFilters={(filters: any) => {
          const filterArr = typeof filters === 'function' ? filters([]) : filters;
          const searchFilter = filterArr.find((f: any) => f.id === 'global_search');
          setSearch((searchFilter?.value as string) || '');
        }}
      />
    </Card>
  );
};

export default PenilaianProjectTable;
