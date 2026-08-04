import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { useMateriStore } from '../store/useMateriStore';
import { useDeleteMateri } from '../api/materi.api';
import type { Materi } from '../api/materi.api';
import toast from 'react-hot-toast';

import FormEditMateri from '../components/FormEditMateri';

export const useMateriActions = () => {
  const { setAlert, resetAlert, setDialogContent, setOpenDialog } = useDialogStore();
  const { setSelectedMateri } = useMateriStore();

  const deleteMutation = useDeleteMateri();

  const handleEdit = (row: Materi) => {
    setSelectedMateri(row);
    setDialogContent({
      title: 'Ubah Materi',
      body: <FormEditMateri />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Simpan Perubahan',
          btnProps: {
            type: 'submit',
            form: 'form-edit-materi'
          }
        }
      }
    });
  };

  const handleDelete = (id: string) => {
    setAlert({
      type: 'error',
      text: {
        heading: 'Hapus Materi?',
        body: 'Apakah Anda yakin ingin menghapus materi ini secara permanen?',
        detail: 'Tindakan ini tidak dapat dibatalkan dan seluruh SOAL yang berkaitan dengan materi ini juga akan terhapus secara permanen.',
      },
      btnTrue: {
        text: 'Ya, Hapus',
        disabled: deleteMutation.isPending,
      },
      btnFalse: { text: 'Batal' },
      onTrueCallback: () => {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            toast.success('Materi beserta soal terkait berhasil dihapus');
            resetAlert();
          },
          onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Gagal menghapus materi');
            resetAlert();
          }
        });
      },
      onFalseCallback: () => resetAlert(),
      onCloseCallback: () => resetAlert(),
    });
  };

  return { handleEdit, handleDelete };
};
