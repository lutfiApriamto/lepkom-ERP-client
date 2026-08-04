
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { usePenempatanAsistenStore } from '../store/usePenempatanAsistenStore';
import type { RoomPlacement } from '../api/penempatanAsisten.api';

import FormCreatePenempatan from '../components/FormCreatePenempatan';
import FormEditPenempatan from '../components/FormEditPenempatan';
import FormDeleteConfirm from '../components/FormDeleteConfirm';

export const usePenempatanAsistenActions = () => {
  const { setDialogContent, setOpenDialog } = useDialogStore();
  const { setSelectedRoomPlacement } = usePenempatanAsistenStore();

  const handleCreate = () => {
    setSelectedRoomPlacement(null);
    setDialogContent({
      title: 'Buat Penugasan Baru',
      body: <FormCreatePenempatan />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Simpan',
          btnProps: {
            type: 'submit',
            form: 'form-create-penempatan'
          }
        }
      }
    });
  };

  const handleEdit = (row: RoomPlacement) => {
    setSelectedRoomPlacement(row);
    setDialogContent({
      title: 'Ubah Data Penugasan',
      body: <FormEditPenempatan />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Simpan Perubahan',
          btnProps: {
            type: 'submit',
            form: 'form-edit-penempatan'
          }
        }
      }
    });
  };

  const handleDelete = (row: RoomPlacement) => {
    setSelectedRoomPlacement(row);
    setDialogContent({
      title: 'Hapus Penugasan',
      body: <FormDeleteConfirm />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Ya, Hapus',
          btnProps: {
            type: 'submit',
            form: 'form-delete-penempatan',
            className: 'bg-red-600 hover:bg-red-700'
          }
        }
      }
    });
  };

  return { 
    handleCreate, 
    handleEdit, 
    handleDelete,
  };
};
