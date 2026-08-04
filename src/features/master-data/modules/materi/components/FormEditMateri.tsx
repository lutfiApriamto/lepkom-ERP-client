import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { useUpdateMateri } from '../api/materi.api';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { useMateriStore } from '../store/useMateriStore';
import toast from 'react-hot-toast';

const FormEditMateri = () => {
  const { selectedMateri } = useMateriStore();
  const [namaMateri, setNamaMateri] = useState(selectedMateri?.namaMateri || '');
  const [tingkat, setTingkat] = useState<1 | 2 | 3>(selectedMateri?.tingkat || 1);
  const [deskripsi, setDeskripsi] = useState(selectedMateri?.deskripsi || '');
  
  const updateMutation = useUpdateMateri();
  const { setOpenDialog } = useDialogStore();

  useEffect(() => {
    if (selectedMateri) {
      setNamaMateri(selectedMateri.namaMateri);
      setTingkat(selectedMateri.tingkat);
      setDeskripsi(selectedMateri.deskripsi || '');
    }
  }, [selectedMateri]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMateri || !namaMateri.trim()) return;

    updateMutation.mutate({ 
      id: selectedMateri._id, 
      data: { namaMateri, tingkat, deskripsi } 
    }, {
      onSuccess: () => {
        toast.success('Data materi berhasil diperbarui');
        setOpenDialog('defaultDialog', false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Gagal memperbarui materi');
      }
    });
  };

  return (
    <form id="form-edit-materi" onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Materi</label>
        <Input 
          required 
          placeholder="Contoh: Pemrograman Web" 
          value={namaMateri}
          onChange={(e) => setNamaMateri(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tingkat</label>
        <div className="flex items-center gap-4 mt-2">
          {[1, 2, 3].map((level) => (
            <label key={level} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tingkat"
                value={level}
                checked={tingkat === level}
                onChange={() => setTingkat(level as 1 | 2 | 3)}
                className="w-4 h-4 text-brand-green focus:ring-brand-green border-gray-300"
              />
              <span className="text-sm text-gray-700">Tingkat {level}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi (Opsional)</label>
        <textarea
          rows={3}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Deskripsi singkat mengenai materi..."
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
        />
      </div>
    </form>
  );
};

export default FormEditMateri;
