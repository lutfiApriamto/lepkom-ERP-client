import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { useRekrutmenStore } from '../store/useRekrutmenStore';
import { useActivateRekrutmen, useDeactivateRekrutmen, useDeleteRekrutmen } from '../api/rekrutmen.api';
import type { Recruitment } from '../api/rekrutmen.api';
import toast from 'react-hot-toast';

import FormEditRekrutmen from '../components/FormEditRekrutmen';

export const useRekrutmenActions = () => {
  const { setAlert, resetAlert, setDialogContent, setOpenDialog } = useDialogStore();
  const { setSelectedRekrutmen } = useRekrutmenStore();

  const activateMutation = useActivateRekrutmen();
  const deactivateMutation = useDeactivateRekrutmen();
  const deleteMutation = useDeleteRekrutmen();

  const handleEdit = (row: Recruitment) => {
    setSelectedRekrutmen(row);
    setDialogContent({
      title: 'Ubah Gelombang Rekrutmen',
      body: <FormEditRekrutmen />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Simpan Perubahan',
          btnProps: {
            type: 'submit',
            form: 'form-edit-rekrutmen'
          }
        }
      }
    });
  };

  const handleToggleActive = (row: Recruitment) => {
    const isCurrentlyActive = row.isActive;
    
    setAlert({
      type: 'warning',
      text: {
        heading: isCurrentlyActive ? 'Nonaktifkan Gelombang?' : 'Aktifkan Gelombang?',
        body: `Apakah Anda yakin ingin ${isCurrentlyActive ? 'menonaktifkan' : 'mengaktifkan'} gelombang "${row.gelombangAktif}"?`,
        detail: isCurrentlyActive ? 'Tindakan ini akan menghentikan pendaftaran.' : 'Pastikan gelombang aktif yang lain telah dinonaktifkan.',
      },
      btnTrue: {
        text: 'Ya, Lanjutkan',
        disabled: activateMutation.isPending || deactivateMutation.isPending,
      },
      btnFalse: { text: 'Batal' },
      onTrueCallback: () => {
        const action = isCurrentlyActive ? deactivateMutation : activateMutation;
        action.mutate(row._id, {
          onSuccess: () => {
            toast.success(`Gelombang berhasil ${isCurrentlyActive ? 'dinonaktifkan' : 'diaktifkan'}`);
            resetAlert();
          },
          onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Gagal mengubah status gelombang');
            resetAlert();
          }
        });
      },
      onFalseCallback: () => resetAlert(),
      onCloseCallback: () => resetAlert(),
    });
  };

  const handleDelete = (id: string) => {
    setAlert({
      type: 'error',
      text: {
        heading: 'Hapus Gelombang?',
        body: 'Apakah Anda yakin ingin menghapus gelombang ini secara permanen?',
        detail: 'Tindakan ini tidak dapat dibatalkan dan seluruh data terkait mungkin hilang.',
      },
      btnTrue: {
        text: 'Ya, Hapus',
        disabled: deleteMutation.isPending,
      },
      btnFalse: { text: 'Batal' },
      onTrueCallback: () => {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            toast.success('Gelombang berhasil dihapus');
            resetAlert();
          },
          onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Gagal menghapus gelombang');
            resetAlert();
          }
        });
      },
      onFalseCallback: () => resetAlert(),
      onCloseCallback: () => resetAlert(),
    });
  };

  return { handleEdit, handleToggleActive, handleDelete };
};
