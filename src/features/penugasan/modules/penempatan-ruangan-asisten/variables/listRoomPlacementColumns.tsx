import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FiEdit2, FiTrash2, FiUsers, FiClipboard } from 'react-icons/fi';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { usePenempatanAsistenActions } from '../hooks/usePenempatanAsistenActions';

dayjs.locale('id');

export const useListRoomPlacementColumns = (page: number = 1, limit: number = 10) => {
  const actions = usePenempatanAsistenActions();

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
      title: 'Tanggal & Sesi',
      sorting: false,
      isSearch: false,
      renderCell: (info: any) => {
        const session = info.row.original.examSessionRef;
        if (!session) return '-';
        return (
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-900">
              {dayjs(session.tanggal).format('DD MMMM YYYY')}
            </span>
            <span className="text-xs text-gray-500">
              {session.jamMulai} - {session.jamSelesai}
            </span>
          </div>
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
      accessorKey: 'pjRuanganList',
      title: 'PJ Ruangan',
      minSize: 200,
      renderCell: (info: any) => {
        const list = info.getValue();
        if (!list || list.length === 0) return <span className="text-gray-400 italic">Belum ada PJ</span>;
        
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1">
              <FiClipboard className="w-3.5 h-3.5" /> {list.length} Orang
            </div>
            <div className="flex flex-wrap gap-1">
              {list.map((pj: any) => (
                <Badge key={pj._id} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 hover:text-orange-800 truncate max-w-[120px]" title={pj.nama}>
                  {pj.nama.split(' ')[0]}
                </Badge>
              ))}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'penilaiList',
      title: 'Asisten Penilai',
      minSize: 200,
      renderCell: (info: any) => {
        const list = info.getValue();
        if (!list || list.length === 0) return <span className="text-gray-400 italic">Belum ada Penilai</span>;
        
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1">
              <FiUsers className="w-3.5 h-3.5" /> {list.length} Orang
            </div>
            <div className="flex flex-wrap gap-1">
              {list.map((p: any) => (
                <Badge key={p._id} variant="outline" className="bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-800 truncate max-w-[120px]" title={p.nama}>
                  {p.nama.split(' ')[0]}
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
          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              className="px-2 h-8 w-8 hover:bg-blue-50 border-gray-200 hover:border-blue-200 hover:text-blue-700 shadow-sm"
              onClick={() => actions.handleEdit(row)}
            >
              <FiEdit2 className="w-4 h-4 text-blue-600" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="px-2 h-8 w-8 hover:bg-red-50 border-gray-200 hover:border-red-200 hover:text-red-700 shadow-sm"
              onClick={() => actions.handleDelete(row)}
            >
              <FiTrash2 className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        );
      },
    },
  ];
};
