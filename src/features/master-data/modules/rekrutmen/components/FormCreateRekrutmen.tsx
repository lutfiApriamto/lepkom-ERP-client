import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { useCreateRekrutmen } from '../api/rekrutmen.api';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import toast from 'react-hot-toast';

const FormCreateRekrutmen = () => {
  const [gelombangAktif, setGelombangAktif] = useState('');
  const createMutation = useCreateRekrutmen();
  const { setOpenDialog } = useDialogStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gelombangAktif.trim()) return;

    createMutation.mutate({ gelombangAktif }, {
      onSuccess: () => {
        toast.success('Gelombang rekrutmen berhasil ditambahkan');
        setOpenDialog('defaultDialog', false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Gagal menambahkan gelombang rekrutmen');
      }
    });
  };

  return (
    <form id="form-create-rekrutmen" onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Gelombang Aktif</label>
        <Input 
          required 
          placeholder="Contoh: Oprec Calas 2026" 
          value={gelombangAktif}
          onChange={(e) => setGelombangAktif(e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-2">Gelombang yang ditambahkan akan otomatis diaktifkan.</p>
      </div>
    </form>
  );
};

export default FormCreateRekrutmen;
