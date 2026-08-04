import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import DefaultTable from '@/components/table/DefaultTable';
import { useGetCalasToScorePraktek } from '../api/penilaianPraktek.api';
import { usePenilaianPraktekStore } from '../store/usePenilaianPraktekStore';
import { usePenilaianPraktekActions } from '../hooks/usePenilaianPraktekActions';
import { listPenilaianPraktekColumns } from '../variables/listPenilaianPraktekColumns';

const PenilaianPraktekTable = () => {
  const [search, setSearch] = useState('');
  const { selectedDate } = usePenilaianPraktekStore();
  const { handleBeriPenilaian } = usePenilaianPraktekActions();

  const { data: calasList, isLoading, isError, error } = useGetCalasToScorePraktek(selectedDate, search);

  const columns = useMemo(
    () => listPenilaianPraktekColumns({ handleBeriPenilaian }),
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
          subTitle: `Anda tidak memiliki jadwal untuk menilai calas ujian praktek pada tanggal ini, atau semua calas sudah dinilai.`,
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

export default PenilaianPraktekTable;
