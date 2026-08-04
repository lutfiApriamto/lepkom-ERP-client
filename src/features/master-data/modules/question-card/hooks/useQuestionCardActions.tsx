import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { useQuestionCardStore } from '../store/useQuestionCardStore';
import { useDeleteQuestionCard } from '../api/questionCard.api';
import type { QuestionCard } from '../api/questionCard.api';
import toast from 'react-hot-toast';

import FormEditQC from '../components/FormEditQC';

export const useQuestionCardActions = () => {
  const { setAlert, resetAlert, setDialogContent, setOpenDialog } = useDialogStore();
  const { setSelectedQC } = useQuestionCardStore();

  const deleteMutation = useDeleteQuestionCard();

  const handleEdit = (row: QuestionCard) => {
    setSelectedQC(row);
    setDialogContent({
      title: 'Ubah Question Card',
      body: <FormEditQC data={row} />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Simpan Perubahan',
          btnProps: {
            type: 'submit',
            form: `form-edit-qc-${row._id}`
          }
        }
      }
    });
  };

  const handleDelete = (id: string) => {
    setAlert({
      type: 'error',
      text: {
        heading: 'Hapus Pertanyaan?',
        body: 'Apakah Anda yakin ingin menghapus pertanyaan ini secara permanen?',
        detail: 'Tindakan ini tidak dapat dibatalkan.',
      },
      btnTrue: {
        text: 'Ya, Hapus',
        disabled: deleteMutation.isPending,
      },
      btnFalse: { text: 'Batal' },
      onTrueCallback: () => {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            toast.success('Question card berhasil dihapus');
            resetAlert();
          },
          onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Gagal menghapus question card');
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
