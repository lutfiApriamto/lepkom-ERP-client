import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { useAsistenStore } from '../store/useAsistenStore';
import { useDeleteAsisten, useToggleAsistenActive, useResetAsistenPassword } from '../api/asisten.api';
import type { Asisten } from '../api/asisten.api';
import toast from 'react-hot-toast';

import FormCreateAsisten from '../components/FormCreateAsisten';
import FormImportExcel from '../components/FormImportExcel';
import FormEditAsisten from '../components/FormEditAsisten';
import FormEditRole from '../components/FormEditRole';

export const useAsistenActions = () => {
  const { setAlert, resetAlert, setDialogContent, setOpenDialog } = useDialogStore();
  const { setSelectedAsisten } = useAsistenStore();

  const deleteMutation = useDeleteAsisten();
  const toggleMutation = useToggleAsistenActive();
  const resetPwMutation = useResetAsistenPassword();

  const handleCreateManual = () => {
    setDialogContent({
      title: 'Tambah Asisten Manual',
      body: <FormCreateAsisten />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Simpan',
          btnProps: {
            type: 'submit',
            form: 'form-create-asisten'
          }
        }
      }
    });
  };

  const handleImportExcel = () => {
    setDialogContent({
      title: 'Import Data Asisten',
      body: <FormImportExcel />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Mulai Import',
          btnProps: {
            type: 'submit',
            form: 'form-import-asisten'
          }
        }
      }
    });
  };

  const handleEditData = (row: Asisten) => {
    setSelectedAsisten(row);
    setDialogContent({
      title: 'Ubah Data Asisten',
      body: <FormEditAsisten />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Simpan Perubahan',
          btnProps: {
            type: 'submit',
            form: 'form-edit-asisten'
          }
        }
      }
    });
  };

  const handleEditRole = (row: Asisten) => {
    setSelectedAsisten(row);
    setDialogContent({
      title: 'Ubah Role Asisten',
      body: <FormEditRole />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Simpan Role',
          btnProps: {
            type: 'submit',
            form: 'form-edit-role'
          }
        }
      }
    });
  };

  const handleToggleActive = (row: Asisten) => {
    const isActivating = !row.isActive;
    const actionText = isActivating ? 'mengaktifkan' : 'menonaktifkan';
    
    setAlert({
      type: isActivating ? 'info' : 'warning',
      text: {
        heading: `${isActivating ? 'Aktifkan' : 'Nonaktifkan'} Asisten?`,
        body: `Apakah Anda yakin ingin ${actionText} akun asisten ${row.nama}?`,
      },
      btnTrue: {
        text: `Ya, ${isActivating ? 'Aktifkan' : 'Nonaktifkan'}`,
        disabled: toggleMutation.isPending,
      },
      btnFalse: { text: 'Batal' },
      onTrueCallback: () => {
        toggleMutation.mutate(row._id, {
          onSuccess: (res) => {
            toast.success((res as any).message || 'Berhasil');
            resetAlert();
          },
          onError: (error: any) => {
            toast.error(error?.response?.data?.message || `Gagal ${actionText} asisten`);
            resetAlert();
          }
        });
      },
      onFalseCallback: () => resetAlert(),
      onCloseCallback: () => resetAlert(),
    });
  };

  const handleResetPassword = (row: Asisten) => {
    setAlert({
      type: 'warning',
      text: {
        heading: 'Reset Password?',
        body: `Password asisten ${row.nama} akan diubah menjadi default.`,
        detail: 'Asisten akan diminta mengganti password pada saat login berikutnya.',
      },
      btnTrue: {
        text: 'Ya, Reset',
        disabled: resetPwMutation.isPending,
      },
      btnFalse: { text: 'Batal' },
      onTrueCallback: () => {
        resetPwMutation.mutate(row._id, {
          onSuccess: (res) => {
            toast.success((res as any).message || 'Password berhasil direset');
            resetAlert();
          },
          onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Gagal reset password');
            resetAlert();
          }
        });
      },
      onFalseCallback: () => resetAlert(),
      onCloseCallback: () => resetAlert(),
    });
  };

  const handleDelete = (row: Asisten) => {
    setAlert({
      type: 'error',
      text: {
        heading: 'Hapus Asisten Secara Permanen?',
        body: `Menghapus asisten ${row.nama} akan menghapus seluruh data terkait (kecuali riwayat aksi).`,
        detail: 'Tindakan ini tidak dapat dibatalkan.',
      },
      btnTrue: {
        text: 'Ya, Hapus Permanen',
        disabled: deleteMutation.isPending,
      },
      btnFalse: { text: 'Batal' },
      onTrueCallback: () => {
        deleteMutation.mutate(row._id, {
          onSuccess: () => {
            toast.success(`Asisten ${row.nama} berhasil dihapus`);
            resetAlert();
          },
          onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Gagal menghapus asisten');
            resetAlert();
          }
        });
      },
      onFalseCallback: () => resetAlert(),
      onCloseCallback: () => resetAlert(),
    });
  };

  return { 
    handleCreateManual, 
    handleImportExcel, 
    handleEditData, 
    handleEditRole,
    handleToggleActive,
    handleResetPassword,
    handleDelete 
  };
};
