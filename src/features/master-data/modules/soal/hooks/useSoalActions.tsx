import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { useSoalStore } from '../store/useSoalStore';
import { useHardDeleteSoal, useToggleViewSoal, type Soal } from '../api/soal.api';
import toast from 'react-hot-toast';
import FormEditSoal from '../components/FormEditSoal';
import { AlertCircle } from 'lucide-react';

export const useSoalActions = () => {
  const { setDialogContent, setOpenDialog } = useDialogStore();
  const { setSelectedSoal } = useSoalStore();

  const deleteMutation = useHardDeleteSoal();
  const toggleViewMutation = useToggleViewSoal();

  const handleEdit = (row: Soal) => {
    setSelectedSoal(row);
    setDialogContent({
      title: 'Ubah Soal',
      body: <FormEditSoal />,
      size: 'md',
      action: {
        submit: {
          text: 'Simpan Perubahan',
          btnProps: {
            type: 'submit',
            form: 'form-soal',
          },
        },
        cancel: {
          text: 'Batal',
          onCallback: () => setOpenDialog('defaultDialog', false),
        }
      }
    });
  };

  const handleDelete = (id: string) => {
    setDialogContent({
      title: 'Hapus Soal',
      body: (
        <div className="flex flex-col items-center justify-center space-y-4 py-4 text-center">
          <div className="p-3 bg-red-100 text-red-600 rounded-full">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-medium text-gray-900">Apakah Anda yakin?</h4>
            <p className="text-sm text-gray-500 max-w-sm">
              Data soal beserta file unggahannya (jika ada) akan dihapus secara permanen dan tidak dapat dikembalikan.
            </p>
          </div>
        </div>
      ),
      size: 'sm',
      action: {
        submit: {
          text: 'Ya, Hapus',
          variant: 'destructive',
          onCallback: () => {
            deleteMutation.mutate(id, {
              onSuccess: () => {
                toast.success('Soal berhasil dihapus');
                setOpenDialog('defaultDialog', false);
              },
              onError: (error: any) => {
                toast.error(error?.response?.data?.message || 'Gagal menghapus soal');
              }
            });
          }
        },
        cancel: {
          text: 'Batal',
          onCallback: () => setOpenDialog('defaultDialog', false)
        }
      }
    });
  };

  const handleToggleView = (id: string) => {
    toggleViewMutation.mutate(id, {
      onSuccess: (res: any) => {
        toast.success(res?.message || 'Status publikasi soal berhasil diubah');
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Gagal mengubah status publikasi');
      }
    });
  };

  return { handleEdit, handleDelete, handleToggleView };
};
