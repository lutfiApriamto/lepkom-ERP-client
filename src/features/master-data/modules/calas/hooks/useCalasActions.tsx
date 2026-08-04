
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { useCalasStore } from '../store/useCalasStore';
import { useResetCalasPassword, useSendBiodataEmail, useAcceptCalas } from '../api/calas.api';
import type { Calas } from '../api/calas.api';
import toast from 'react-hot-toast';

import FormCreateCalas from '../components/FormCreateCalas';
import FormImportExcel from '../components/FormImportExcel';
import FormEditCalas from '../components/FormEditCalas';
import FormUpdateProgress from '../components/FormUpdateProgress';
import FormRejectCalas from '../components/FormRejectCalas';
import FormDeleteConfirm from '../components/FormDeleteConfirm';

export const useCalasActions = () => {
  const { setAlert, resetAlert, setDialogContent, setOpenDialog } = useDialogStore();
  const { setSelectedCalas } = useCalasStore();

  const resetPwMutation = useResetCalasPassword();
  const sendEmailMutation = useSendBiodataEmail();
  const acceptMutation = useAcceptCalas();

  const handleCreateManual = () => {
    setDialogContent({
      title: 'Tambah Calas Manual',
      body: <FormCreateCalas />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Simpan',
          btnProps: {
            type: 'submit',
            form: 'form-create-calas'
          }
        }
      }
    });
  };

  const handleImportExcel = () => {
    setDialogContent({
      title: 'Import Data Calas',
      body: <FormImportExcel />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Mulai Import',
          btnProps: {
            type: 'submit',
            form: 'form-import-calas'
          }
        }
      }
    });
  };

  const handleEditData = (row: Calas) => {
    setSelectedCalas(row);
    setDialogContent({
      title: 'Ubah Data Calas',
      body: <FormEditCalas />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Simpan Perubahan',
          btnProps: {
            type: 'submit',
            form: 'form-edit-calas'
          }
        }
      }
    });
  };

  const handleUpdateProgress = (row: Calas) => {
    setSelectedCalas(row);
    setDialogContent({
      title: 'Update Progres Rekrutmen',
      body: <FormUpdateProgress />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Simpan & Pindah Tahap',
          btnProps: {
            type: 'submit',
            form: 'form-update-progress'
          }
        }
      }
    });
  };

  const handleReject = (row: Calas) => {
    setSelectedCalas(row);
    setDialogContent({
      title: 'Tolak Calas',
      body: <FormRejectCalas />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Konfirmasi Penolakan',
          btnProps: {
            type: 'submit',
            form: 'form-reject-calas',
            className: 'bg-red-600 hover:bg-red-700'
          }
        }
      }
    });
  };

  const handleAccept = (row: Calas) => {
    setAlert({
      type: 'info',
      text: {
        heading: 'Terima Calon Asisten?',
        body: `Apakah Anda yakin ingin menerima ${row.namaCalas} sebagai asisten baru?`,
        detail: 'Calas akan langsung dikonversi menjadi Asisten dan akan mendapatkan notifikasi penerimaan melalui email.',
      },
      btnTrue: {
        text: 'Ya, Terima',
        disabled: acceptMutation.isPending,
      },
      btnFalse: { text: 'Batal' },
      onTrueCallback: () => {
        toast.promise(
          acceptMutation.mutateAsync(row._id),
          {
            loading: `Memproses penerimaan ${row.namaCalas}...`,
            success: (res: any) => {
              resetAlert();
              return res?.message || `Berhasil menerima ${row.namaCalas}`;
            },
            error: (error: any) => {
              resetAlert();
              return error?.response?.data?.message || 'Gagal menerima calas';
            }
          }
        ).catch(() => {});
      },
      onFalseCallback: () => resetAlert(),
      onCloseCallback: () => resetAlert(),
    });
  };

  const handleDelete = (row: Calas) => {
    setSelectedCalas(row);
    setDialogContent({
      title: 'Hapus Calas Permanen',
      body: <FormDeleteConfirm />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Ya, Hapus',
          btnProps: {
            type: 'submit',
            form: 'form-delete-calas',
            className: 'bg-red-600 hover:bg-red-700'
          }
        }
      }
    });
  };

  const handleResetPassword = (row: Calas) => {
    setAlert({
      type: 'warning',
      text: {
        heading: 'Reset Password?',
        body: `Password calas ${row.namaCalas} akan diubah menjadi default.`,
        detail: 'Akun calas tidak akan menerima email notifikasi atas aksi ini.',
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

  const handleSendBiodataEmail = (row: Calas) => {
    setAlert({
      type: 'info',
      text: {
        heading: 'Kirim Email Registrasi?',
        body: `Email pendaftaran beserta kredensial login akan dikirimkan ulang ke ${row.emailCalas}.`,
      },
      btnTrue: {
        text: 'Kirim Email',
        disabled: sendEmailMutation.isPending,
      },
      btnFalse: { text: 'Batal' },
      onTrueCallback: () => {
        toast.promise(
          sendEmailMutation.mutateAsync(row._id),
          {
            loading: 'Mengirim email registrasi...',
            success: (res: any) => {
              resetAlert();
              return res?.message || 'Email registrasi berhasil dikirim';
            },
            error: (error: any) => {
              resetAlert();
              return error?.response?.data?.message || 'Gagal mengirim email registrasi';
            }
          }
        ).catch(() => {});
      },
      onFalseCallback: () => resetAlert(),
      onCloseCallback: () => resetAlert(),
    });
  };

  return { 
    handleCreateManual, 
    handleImportExcel, 
    handleEditData, 
    handleUpdateProgress,
    handleReject,
    handleAccept,
    handleDelete,
    handleResetPassword,
    handleSendBiodataEmail
  };
};
