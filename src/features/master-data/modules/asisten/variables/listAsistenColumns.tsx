import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FiEdit2, FiShield, FiKey, FiPower, FiTrash2, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { path } from '@/utils/consts';
import type { Asisten } from '../api/asisten.api';

// Map role value to display label
const roleLabels: Record<string, string> = {
  'asisten': 'Asisten',
  'staff': 'Staff',
  'koordinator_lapangan': 'Koor Lapangan',
  'pj_soal_materi': 'PJ Soal & Materi',
  'penanggung_jawab_ruangan': 'PJ Ruangan',
  'asisten_penilai': 'Asisten Penilai',
  'super_admin': 'Super Admin'
};

export const getListAsistenColumns = (actions: {
  handleEditData: (row: Asisten) => void;
  handleEditRole: (row: Asisten) => void;
  handleToggleActive: (row: Asisten) => void;
  handleResetPassword: (row: Asisten) => void;
  handleDelete: (row: Asisten) => void;
}, page: number = 1, limit: number = 10, isSuperAdmin: boolean = false, isRecruitmentActive: boolean = false) => {
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
      accessorKey: 'idAsisten',
      title: 'ID Asisten',
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
      accessorKey: 'nama',
      title: 'Nama',
      sorting: true,
      isSearch: true,
    },
    {
      accessorKey: 'kelasSaatIni',
      title: 'Kelas',
      sorting: true,
      isSearch: true,
      filterOptions: [
        { label: 'Tingkat 1', value: '1' },
        { label: 'Tingkat 2', value: '2' },
        { label: 'Tingkat 3', value: '3' },
        { label: 'Tingkat 4', value: '4' },
        { label: 'NON CLASS', value: 'NON CLASS' },
      ],
      renderCell: (info: any) => {
        const kelas = info.getValue();
        return kelas || '-';
      }
    },
    {
      accessorKey: 'role',
      title: 'Role',
      sorting: true,
      isSearch: true,
      filterOptions: isRecruitmentActive 
        ? Object.entries(roleLabels).map(([value, label]) => ({ label, value }))
        : ['asisten', 'staff', 'super_admin'].map(value => ({ label: roleLabels[value] || value, value })),
      renderCell: (info: any) => {
        const role = info.getValue() as string;
        const displayLabel = roleLabels[role] || role;
        
        let badgeVariant: any = 'default';
        if (role === 'super_admin') badgeVariant = 'destructive';
        else if (role === 'staff') badgeVariant = 'warning';
        else if (role === 'asisten') badgeVariant = 'secondary';
        else badgeVariant = 'info';

        return (
          <Badge variant={badgeVariant}>
            {displayLabel}
          </Badge>
        );
      }
    },
    {
      accessorKey: 'isActive',
      title: 'Status',
      sorting: true,
      isSearch: true,
      filterOptions: [
        { label: 'Aktif', value: 'true' },
        { label: 'Nonaktif', value: 'false' }
      ],
      filterFn: (row: any, columnId: string, filterValue: any) => {
        if (!filterValue) return true;
        const rowValue = row.getValue(columnId);
        return String(rowValue).toLowerCase() === String(filterValue).toLowerCase();
      },
      renderCell: (info: any) => {
        const isActive = info.getValue() as boolean;
        return (
          <Badge variant={isActive ? 'success' : 'secondary'}>
            {isActive ? 'Aktif' : 'Nonaktif'}
          </Badge>
        );
      }
    }
  ];

  if (isSuperAdmin) {
    columns.push({
      accessorKey: 'action',
      title: 'Aksi',
      align: 'center',
      renderCell: (info: any) => {
        const row = info.row.original as Asisten;
        return (
          <div className="flex flex-wrap items-center justify-center gap-1">
            <Button
              variant="outline"
              size="icon"
              title="Edit Data Profil (Hard Update)"
              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => actions.handleEditData(row)}
            >
              <FiEdit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              title="Ubah Role"
              className="h-8 w-8 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
              onClick={() => actions.handleEditRole(row)}
            >
              <FiShield className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              title="Reset Password Default"
              className="h-8 w-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              onClick={() => actions.handleResetPassword(row)}
            >
              <FiKey className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              title={row.isActive ? 'Nonaktifkan' : 'Aktifkan'}
              className={`h-8 w-8 ${row.isActive ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}`}
              onClick={() => actions.handleToggleActive(row)}
            >
              <FiPower className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              title="Hapus Asisten"
              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => actions.handleDelete(row)}
            >
              <FiTrash2 className="w-4 h-4" />
            </Button>
            <Link to={`${path.lepkom.masterData.asisten.detailAsisten}/${row._id}`}>
              <Button
                variant="outline"
                size="icon"
                title="Lihat Detail (Routing)"
                className="h-8 w-8 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
              >
                <FiEye className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        );
      }
    });
  } else {
    // Basic asisten can still view detail
    columns.push({
      accessorKey: 'action',
      title: 'Aksi',
      align: 'center',
      renderCell: (info: any) => {
        const row = info.row.original as Asisten;
        return (
          <div className="flex items-center justify-center">
             <Link to={`${path.lepkom.masterData.asisten.detailAsisten}/${row._id}`}>
              <Button
                variant="outline"
                size="icon"
                title="Lihat Detail (Routing)"
                className="h-8 w-8 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
              >
                <FiEye className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        );
      }
    });
  }

  return columns;
};
