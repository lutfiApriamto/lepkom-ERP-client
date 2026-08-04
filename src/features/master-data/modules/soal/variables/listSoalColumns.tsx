import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FiEdit2, FiTrash2, FiDownload, FiEye, FiEyeOff } from 'react-icons/fi';
import type { Soal } from '../api/soal.api';
import { downloadSoalFile } from '../api/soal.api';
import { EmptyCellText } from '@/components/shared/EmptyCellText';
import toast from 'react-hot-toast';

export const getListSoalColumns = (
  actions: {
    handleEdit: (row: Soal) => void;
    handleDelete: (id: string) => void;
    handleToggleView: (id: string) => void;
  },
  page: number = 1,
  limit: number = 10,
  isAuthorized: boolean = false
) => {
  const columns: any[] = [
    {
      accessorKey: 'no',
      title: 'No',
      renderCell: (info: any) => {
        const rowIndex = info.rowIndex;
        return ((page - 1) * limit) + rowIndex + 1;
      }
    },
    {
      accessorKey: 'judulSoal',
      title: 'Judul Soal',
      sorting: true,
      isSearch: true,
    },
    {
      accessorKey: 'materiRef.namaMateri',
      title: 'Materi Terkait',
      sorting: true,
      renderCell: (info: any) => {
        const materi = info.row.original.materiRef;
        return materi ? materi.namaMateri : <EmptyCellText />;
      }
    },
    {
      accessorKey: 'tingkat',
      title: 'Tingkat',
      sorting: true,
      isSearch: true,
      filterOptions: [
        { label: 'Tingkat 1', value: 1 },
        { label: 'Tingkat 2', value: 2 },
        { label: 'Tingkat 3', value: 3 },
      ],
      renderCell: (info: any) => {
        const tingkat = info.getValue();
        return (
          <Badge variant="info">
            Tingkat {tingkat}
          </Badge>
        );
      }
    },
    {
      accessorKey: 'file',
      title: 'File Soal',
      renderCell: (info: any) => {
        const row = info.row.original as Soal;
        return row.file ? (
          <button
            onClick={() => {
              const toastId = toast.loading('Mendownload...');
              downloadSoalFile(row._id, row.file?.split('/').pop() || 'soal_file')
                .then(() => toast.success('Berhasil mendownload', { id: toastId }))
                .catch(() => toast.error('Gagal mendownload', { id: toastId }));
            }}
            className="inline-flex items-center gap-1.5 text-sm text-brand-green hover:text-brand-green/80 font-medium bg-brand-green/10 px-2.5 py-1 rounded-md transition-colors"
          >
            <FiDownload className="w-4 h-4" />
            Download
          </button>
        ) : (
          <EmptyCellText />
        );
      }
    }
  ];

  if (isAuthorized) {
    columns.push({
      accessorKey: 'isViewed',
      title: 'Status Publikasi',
      sorting: true,
      isSearch: true,
      filterOptions: [
        { label: 'Published', value: 'true' },
        { label: 'Hidden', value: 'false' },
      ],
      renderCell: (info: any) => {
        const isViewed = info.getValue();
        return (
          <Badge variant={isViewed ? 'success' : 'default'}>
            {isViewed ? 'Published' : 'Hidden'}
          </Badge>
        );
      }
    });

    columns.push({
      accessorKey: 'action',
      title: 'Aksi',
      align: 'center',
      renderCell: (info: any) => {
        const row = info.row.original as Soal;
        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              title={row.isViewed ? 'Sembunyikan' : 'Publikasikan'}
              className={`h-8 w-8 ${row.isViewed ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}`}
              onClick={() => actions.handleToggleView(row._id)}
            >
              {row.isViewed ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              title="Edit"
              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => actions.handleEdit(row)}
            >
              <FiEdit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              title="Hapus"
              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => actions.handleDelete(row._id)}
            >
              <FiTrash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      }
    });
  } else {
    // Untuk Calas / Asisten biasa (walaupun sebenernya isViewed true semua yg tampil)
    // Tampilkan kolom isViewed sebagai informasi tambahan
    columns.push({
      accessorKey: 'isViewed',
      title: 'Status Publikasi',
      renderCell: (info: any) => {
        const isViewed = info.getValue();
        return (
          <Badge variant={isViewed ? 'success' : 'default'}>
            {isViewed ? 'Published' : 'Hidden'}
          </Badge>
        );
      }
    });
  }

  return columns;
};
