import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import type { Materi } from '../api/materi.api';

export const getListMateriColumns = (actions: {
  handleEdit: (row: Materi) => void;
  handleDelete: (id: string) => void;
}, page: number = 1, limit: number = 10, isAuthorized: boolean = false) => {
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
      accessorKey: 'namaMateri',
      title: 'Nama Materi',
      sorting: true,
      isSearch: true,
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
      accessorKey: 'dibuatOleh.nama',
      title: 'Dibuat Oleh',
      sorting: true,
      renderCell: (info: any) => {
        const author = info.row.original.dibuatOleh;
        return author ? author.nama : '-';
      }
    }
  ];

  if (isAuthorized) {
    columns.push({
      accessorKey: 'action',
      title: 'Aksi',
      align: 'center',
      renderCell: (info: any) => {
        const row = info.row.original;
        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => actions.handleEdit(row)}
            >
              <FiEdit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => actions.handleDelete(row._id)}
            >
              <FiTrash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      }
    });
  }

  return columns;
};
