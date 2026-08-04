
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { usePenempatanCalasStore } from '../store/usePenempatanCalasStore';
import type { RoomPlacement } from '../api/penempatanCalas.api';

import FormAturCalas from '../components/FormAturCalas';

export const usePenempatanCalasActions = () => {
  const { setDialogContent, setOpenDialog } = useDialogStore();
  const { setSelectedRoomPlacement } = usePenempatanCalasStore();

  const handleAturCalas = (row: RoomPlacement) => {
    setSelectedRoomPlacement(row);
    setDialogContent({
      title: `Atur Calas - Ruangan ${row.ruangan}`,
      body: <FormAturCalas />,
      size: 'lg',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Simpan Perubahan',
          btnProps: {
            type: 'submit',
            form: 'form-atur-calas'
          }
        }
      }
    });
  };

  return { 
    handleAturCalas,
  };
};
