import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FiEdit2, FiTrash2, FiPower } from 'react-icons/fi';
import type { Recruitment } from '../api/rekrutmen.api';
import { customFormatDateTime } from '@/utils/helpers/dateFormatter';

export const getListRekrutmenColumns = (actions: {
  handleEdit: (row: Recruitment) => void;
  handleDelete: (id: string) => void;
  handleToggleActive: (row: Recruitment) => void;
}, page: number = 1, limit: number = 10) => [
  {
    accessorKey: 'no',
    title: 'No',
    renderCell: (info: any) => {
      const rowIndex = info.rowIndex;
      return ((page - 1) * limit) + rowIndex + 1;
    }
  },
  {
    accessorKey: 'gelombangAktif',
    title: 'Gelombang Aktif',
    sorting: true,
    isSearch: true,
  },
  {
    accessorKey: 'isActive',
    title: 'Status',
    sorting: true,
    renderCell: (info: any) => {
      const isActive = info.getValue();
      return (
        <Badge variant={isActive ? 'status-green' : 'secondary'}>
          {isActive ? 'Aktif' : 'Non-Aktif'}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'dibuatOleh',
    title: 'Dibuat Oleh',
    renderCell: (info: any) => {
      const dibuatOleh = info.getValue();
      return dibuatOleh?.nama || '-';
    }
  },
  {
    accessorKey: 'diaktifkanOleh',
    title: 'Diaktifkan Oleh',
    renderCell: (info: any) => {
      const val = info.getValue();
      return val?.nama || '-';
    }
  },
  {
    accessorKey: 'diaktifkanPada',
    sorting: true,
    title: 'Tgl Diaktifkan',
    renderCell: (info: any) => {
      const val = info.getValue();
      return val ? customFormatDateTime(val) : '-';
    }
  },
  {
    accessorKey: 'actions',
    title: 'Aksi',
    renderCell: (info: any) => {
      const row = info.row.original as Recruitment;
      return (
        <div className="flex items-center justify-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className={`p-2 h-auto hover:bg-muted ${row.isActive ? 'text-red-600 hover:text-red-700 hover:bg-red-50' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}`}
            title={row.isActive ? 'Nonaktifkan Gelombang' : 'Aktifkan Gelombang'}
            onClick={() => actions.handleToggleActive(row)}
          >
            <FiPower className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="p-2 h-auto text-blue-600 hover:bg-blue-50"
            title="Edit Data"
            onClick={() => actions.handleEdit(row)}
          >
            <FiEdit2 className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="p-2 h-auto text-red-600 hover:bg-red-50 disabled:opacity-50" 
            title="Hapus Gelombang"
            onClick={() => actions.handleDelete(row._id)}
            disabled={row.isActive}
          >
            <FiTrash2 className="w-4 h-4" />
          </Button>
        </div>
      );
    }
  }
];
