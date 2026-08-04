import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { useAuthStore } from '@/features/auth/shared/store';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

import FormCreateQC from './FormCreateQC';

const HeaderContent = () => {
  const { setOpenDialog, setDialogContent } = useDialogStore();
  const { user } = useAuthStore();

  const handleOpenCreateModal = () => {
    setDialogContent({
      title: 'Tambah Question Card',
      body: <FormCreateQC />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Tambah',
          btnProps: {
            type: 'submit',
            form: 'form-create-qc'
          }
        }
      }
    });
  };

  const isAllowedToManage = user?.role === 'super_admin' || user?.role === 'pj_soal_materi';

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Data Question Card</h1>
        <p className="text-sm text-gray-500 mt-1">
          Kelola daftar pertanyaan yang digunakan selama seleksi asisten.
        </p>
      </div>
      
      {isAllowedToManage && (
        <Button 
          onClick={handleOpenCreateModal} 
          className="bg-green-600 hover:bg-green-700 text-white shadow-sm flex items-center gap-2 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pertanyaan</span>
        </Button>
      )}
    </div>
  );
};

export default HeaderContent;
