import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FiCheck, FiX } from 'react-icons/fi';
import type { HardResetRequest } from '../api/requestReset.api';
import { useApproveHardReset, useRejectHardReset } from '../api/requestReset.api';
import toast from 'react-hot-toast';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';

export const useListRequestResetColumns = (page: number = 1, limit: number = 10) => {
  const approveMutation = useApproveHardReset();
  const rejectMutation = useRejectHardReset();
  const { setAlert, resetAlert } = useDialogStore();

  const handleApprove = (request: HardResetRequest) => {
    setAlert({
      type: 'confirm',
      text: {
        heading: 'Setujui Permintaan Reset Password',
        body: `Apakah Anda yakin ingin menyetujui permintaan reset password untuk asisten ${request.asistenRef?.nama} (${request.asistenRef?.idAsisten})? Password akan direset ke default dan asisten diwajibkan mengganti password saat login berikutnya.`,
      },
      onTrueCallback: async () => {
        try {
          await approveMutation.mutateAsync(request._id);
          toast.success('Permintaan reset password berhasil disetujui');
          resetAlert();
        } catch (error: any) {
          toast.error(error?.response?.data?.message || 'Gagal menyetujui permintaan');
        }
      }
    });
  };

  const handleReject = (request: HardResetRequest) => {
    setAlert({
      type: 'confirm',
      text: {
        heading: 'Tolak Permintaan Reset Password',
        body: `Apakah Anda yakin ingin menolak permintaan reset password untuk asisten ${request.asistenRef?.nama} (${request.asistenRef?.idAsisten})?`,
      },
      onTrueCallback: async () => {
        try {
          await rejectMutation.mutateAsync(request._id);
          toast.success('Permintaan reset password berhasil ditolak');
          resetAlert();
        } catch (error: any) {
          toast.error(error?.response?.data?.message || 'Gagal menolak permintaan');
        }
      }
    });
  };

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
      accessorKey: 'inputAwal',
      title: 'Input Permintaan',
      sorting: true,
      isSearch: true,
      renderCell: (info: any) => {
        return <span className="font-medium text-gray-800">{info.getValue() || '-'}</span>;
      }
    },
    {
      accessorKey: 'asistenRef.nama',
      title: 'Nama Asisten',
      sorting: true,
      isSearch: true,
      renderCell: (info: any) => {
        const row = info.row.original;
        return row.asistenRef?.nama || '-';
      }
    },
    {
      accessorKey: 'asistenRef.idAsisten',
      title: 'ID Asisten',
      sorting: true,
      isSearch: true,
      renderCell: (info: any) => {
        const row = info.row.original;
        return row.asistenRef?.idAsisten || '-';
      }
    },
    {
      accessorKey: 'status',
      title: 'Status',
      sorting: true,
      filterOptions: [
        { label: 'Menunggu', value: 'menunggu' },
        { label: 'Disetujui', value: 'disetujui' },
        { label: 'Ditolak', value: 'ditolak' },
      ],
      renderCell: (info: any) => {
        const status = info.getValue() as string;
        if (status === 'menunggu') return <Badge variant="warning">Menunggu</Badge>;
        if (status === 'disetujui') return <Badge variant="success">Disetujui</Badge>;
        if (status === 'ditolak') return <Badge variant="destructive">Ditolak</Badge>;
        return <Badge variant="default">{status}</Badge>;
      }
    },
    {
      accessorKey: 'createdAt',
      title: 'Tanggal Request',
      sorting: true,
      renderCell: (info: any) => {
        return new Date(info.getValue() as string).toLocaleString('id-ID');
      }
    },
    {
      accessorKey: 'action',
      title: 'Aksi',
      align: 'center',
      renderCell: (info: any) => {
        const request = info.row.original;
        
        if (request.status !== 'menunggu') {
          return (
            <div className="text-xs text-gray-500 text-center">
              {request.status === 'disetujui' ? 'Disetujui oleh ' : 'Ditolak oleh '}
              <span className="font-medium">{request.disetujuiOleh?.nama || '-'}</span>
              <br />
              {request.diprosesPada && new Date(request.diprosesPada).toLocaleString('id-ID')}
            </div>
          );
        }

        const isLoading = approveMutation.isPending || rejectMutation.isPending;

        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              size="sm"
              onClick={() => handleApprove(request)}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white transition-colors h-8"
            >
              <FiCheck className="w-4 h-4 mr-1" />
              Setujui
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleReject(request)}
              disabled={isLoading}
              className="h-8"
            >
              <FiX className="w-4 h-4 mr-1" />
              Tolak
            </Button>
          </div>
        );
      }
    }
  ];

  return columns;
};
