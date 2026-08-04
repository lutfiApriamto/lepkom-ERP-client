import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FiUsers, FiSettings } from 'react-icons/fi';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { usePenempatanCalasActions } from '../hooks/usePenempatanCalasActions';

dayjs.locale('id');

export const useListRoomPlacementCalasColumns = (page: number = 1, limit: number = 10) => {
  const actions = usePenempatanCalasActions();

  return [
    {
      accessorKey: 'no',
      title: 'No',
      renderCell: (info: any) => {
        const rowIndex = info.rowIndex;
        return (page - 1) * limit + rowIndex + 1;
      },
    },
    {
      accessorKey: 'examSessionRef.tanggal',
      title: 'Tanggal Ujian',
      sorting: false,
      isSearch: false,
      renderCell: (info: any) => {
        const session = info.row.original.examSessionRef;
        if (!session) return '-';
        return (
          <span className="font-semibold text-gray-900">
            {dayjs(session.tanggal).format('DD MMMM YYYY')}
          </span>
        );
      },
    },
    {
      accessorKey: 'ruangan',
      title: 'Ruangan',
      sorting: true,
      isSearch: true,
      renderCell: (info: any) => {
        const ruangan = info.getValue();
        return (
          <Badge variant="outline" className="font-bold border-indigo-200 text-indigo-700 bg-indigo-50">
            {ruangan}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'examSessionRef.jenisUjian',
      title: 'Jenis Ujian',
      sorting: false,
      isSearch: false,
      renderCell: (info: any) => {
        const jenis = info.row.original.examSessionRef?.jenisUjian;
        const color = jenis === 'praktek' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
        return (
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${color}`}>
            {jenis || '-'}
          </span>
        );
      },
    },
    {
      accessorKey: 'calasList',
      title: 'Daftar Calas',
      minSize: 200,
      renderCell: (info: any) => {
        const list = info.getValue();
        if (!list || list.length === 0) return <span className="text-gray-400 italic">Kosong</span>;
        
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1">
              <FiUsers className="w-3.5 h-3.5" /> {list.length} Calas
            </div>
            <div className="flex flex-wrap gap-1">
              {list.map((c: any) => (
                <Badge key={c._id} variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 truncate max-w-[120px]" title={c.namaCalas}>
                  {c.namaCalas.split(' ')[0]}
                </Badge>
              ))}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'action',
      title: 'Aksi',
      align: 'center',
      renderCell: (info: any) => {
        const row = info.row.original;
        return (
          <div className="flex justify-center">
            <Button
              size="sm"
              className="h-8 gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-medium px-3"
              onClick={() => actions.handleAturCalas(row)}
            >
              <FiSettings className="w-4 h-4" /> Atur Calas
            </Button>
          </div>
        );
      },
    },
  ];
};
