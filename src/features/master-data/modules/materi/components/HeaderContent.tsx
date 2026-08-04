import { Button } from '@/components/ui/Button';
import { FiPlus } from 'react-icons/fi';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { useAuthStore } from '@/features/auth/shared/store';
import FormCreateMateri from './FormCreateMateri';

const HeaderContent = () => {
  const { setDialogContent, setOpenDialog } = useDialogStore();
  const { role } = useAuthStore();
  const isAuthorized = role === 'super_admin' || role === 'pj_soal_materi';

  const handleAddClick = () => {
    setDialogContent({
      title: 'Tambah Materi',
      body: <FormCreateMateri />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Simpan',
          btnProps: {
            type: 'submit',
            form: 'form-create-materi'
          }
        }
      }
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Master Data Materi</h1>
        <p className="text-sm text-gray-500 mt-1">
          Kelola data materi untuk asisten baru tingkat 1, 2, dan 3.
        </p>
      </div>
      {isAuthorized && (
        <Button 
          onClick={handleAddClick}
          className="bg-green-600 hover:bg-green-700 text-white shadow-sm flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          <span>Tambah Materi</span>
        </Button>
      )}
    </div>
  );
};

export default HeaderContent;
