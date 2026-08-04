import { Button } from '@/components/ui/Button';
import { FiPlus } from 'react-icons/fi';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import FormCreateRekrutmen from './FormCreateRekrutmen';

const HeaderContent = () => {
  const { setDialogContent, setOpenDialog } = useDialogStore();

  const handleAddClick = () => {
    setDialogContent({
      title: 'Tambah Gelombang Rekrutmen',
      body: <FormCreateRekrutmen />,
      size: 'md',
      action: {
        cancel: { text: 'Batal', onCallback: () => setOpenDialog('defaultDialog', false) },
        submit: { 
          text: 'Simpan',
          btnProps: {
            type: 'submit',
            form: 'form-create-rekrutmen'
          }
        }
      }
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Master Data Rekrutmen</h1>
        <p className="text-sm text-gray-500 mt-1">
          Kelola gelombang pendaftaran (rekrutmen) asisten baru, aktifkan atau nonaktifkan pendaftaran.
        </p>
      </div>
      <Button 
        onClick={handleAddClick}
        className="bg-green-600 hover:bg-green-700 text-white shadow-sm flex items-center gap-2"
      >
        <FiPlus className="w-4 h-4" />
        <span>Tambah Gelombang</span>
      </Button>
    </div>
  );
};

export default HeaderContent;
