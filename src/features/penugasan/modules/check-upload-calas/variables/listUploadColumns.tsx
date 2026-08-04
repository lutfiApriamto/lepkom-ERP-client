import { Button } from '@/components/ui/Button';
import { DownloadCloud } from 'lucide-react';
import { downloadJawabanFile } from '../api/checkUpload.api';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import toast from 'react-hot-toast';

dayjs.locale('id');

export const getListUploadColumns = (
  currentPage: number,
  pageSize: number
): any[] => [
  {
    accessorKey: 'index',
    title: 'No',
    renderCell: (info: any) => {
      const rowIndex = info.rowIndex;
      const index = (currentPage - 1) * pageSize + rowIndex + 1;
      return <div className="text-center w-full">{index}</div>;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'namaCalas',
    title: 'Nama Calas',
    sorting: true,
    isSearch: true,
  },
  {
    accessorKey: 'npm',
    title: 'NPM',
    sorting: true,
    isSearch: true,
  },
  {
    accessorKey: 'ruangan',
    title: 'Ruangan',
    sorting: true,
    renderCell: (info: any) => info.row.original.ruangan || '-',
  },
  {
    accessorKey: 'jenisUjian',
    title: 'Tipe Ujian',
    sorting: false,
    isSearch: true,
    filterOptions: [
      { label: 'Ujian Praktek', value: 'praktek' },
      { label: 'Ujian Project', value: 'project' }
    ],
    renderCell: (info: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
        info.row.original.jenisUjian === 'praktek' 
          ? 'bg-blue-100 text-blue-700' 
          : 'bg-indigo-100 text-indigo-700'
      }`}>
        {info.row.original.jenisUjian}
      </span>
    ),
  },
  {
    accessorKey: 'uploadedAt',
    title: 'Waktu Upload',
    sorting: true,
    renderCell: (info: any) => {
      const date = info.row.original.uploadedAt;
      if (!date) return '-';
      return dayjs(date).format('DD MMM YYYY, HH:mm');
    }
  },
  {
    accessorKey: 'actions',
    title: 'Aksi',
    sorting: false,
    renderCell: (info: any) => {
      const handleDownload = async () => {
        try {
          const rowData = info.row.original;
          const loadingToast = toast.loading('Memproses tautan unduhan...');
          await downloadJawabanFile(
            rowData._id, 
            rowData.jenisUjian, 
            `Jawaban_${rowData.jenisUjian}_${rowData.npm}.pdf`
          );
          toast.dismiss(loadingToast);
        } catch (error: any) {
          toast.dismiss();
          toast.error(error?.response?.data?.message || 'Gagal mengunduh file jawaban');
        }
      };

      return (
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 text-green-700 border-green-700 hover:bg-green-50"
          onClick={handleDownload}
        >
          <DownloadCloud className="w-4 h-4" />
          <span>Download</span>
        </Button>
      );
    }
  }
];
