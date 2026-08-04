import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { useUpdateRekrutmen } from '../api/rekrutmen.api';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { useRekrutmenStore } from '../store/useRekrutmenStore';
import toast from 'react-hot-toast';

const FormEditRekrutmen = () => {
  const { selectedRekrutmen } = useRekrutmenStore();
  const [gelombangAktif, setGelombangAktif] = useState('');
  const updateMutation = useUpdateRekrutmen();
  const { setOpenDialog } = useDialogStore();

  useEffect(() => {
    if (selectedRekrutmen) {
      setGelombangAktif(selectedRekrutmen.gelombangAktif);
    }
  }, [selectedRekrutmen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gelombangAktif.trim() || !selectedRekrutmen) return;

    updateMutation.mutate({ 
      id: selectedRekrutmen._id, 
      data: { gelombangAktif } 
    }, {
      onSuccess: () => {
        toast.success('Nama gelombang rekrutmen berhasil diperbarui');
        setOpenDialog('defaultDialog', false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Gagal memperbarui gelombang rekrutmen');
      }
    });
  };

  return (
    <form id="form-edit-rekrutmen" onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Gelombang Aktif</label>
        <Input 
          required 
          placeholder="Contoh: Oprec Calas 2026" 
          value={gelombangAktif}
          onChange={(e) => setGelombangAktif(e.target.value)}
        />
      </div>
    </form>
  );
};

export default FormEditRekrutmen;
