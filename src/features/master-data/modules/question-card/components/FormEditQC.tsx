import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/Input';
import { useUpdateQuestionCard } from '../api/questionCard.api';
import { useGetMateriNames } from '../../materi/api/materi.api';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import toast from 'react-hot-toast';
import Select from 'react-select';

const FormEditQC = ({ data }: { data: any }) => {
  const [judulPertanyaan, setJudulPertanyaan] = useState(data.judulPertanyaan || '');
  const [kategori, setKategori] = useState<'materi' | 'teknis' | 'kepribadian' | 'motivasi'>(data.kategori || 'materi');
  const [tingkat, setTingkat] = useState<1 | 2 | 3>(data.tingkat || 1);
  const [deskripsi, setDeskripsi] = useState(data.deskripsi || '');
  const [namaMateri, setNamaMateri] = useState<string | null>(data.namaMateri || null);
  
  const updateMutation = useUpdateQuestionCard();
  const { data: materiData, isLoading: loadingMateri } = useGetMateriNames('');
  const { setOpenDialog } = useDialogStore();

  const materiOptions = useMemo(() => {
    if (!materiData?.data) return [];
    return materiData.data.map(m => ({
      value: m.namaMateri,
      label: m.namaMateri,
      tingkat: m.tingkat
    }));
  }, [materiData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judulPertanyaan.trim()) return;
    
    if (kategori === 'materi' && !namaMateri) {
      toast.error('Pilih nama materi terlebih dahulu!');
      return;
    }

    const payload = {
      judulPertanyaan,
      kategori,
      tingkat,
      deskripsi: deskripsi.trim() || undefined,
      namaMateri: kategori === 'materi' ? namaMateri : null
    };

    updateMutation.mutate({ id: data._id, data: payload }, {
      onSuccess: () => {
        toast.success('Question card berhasil diperbarui');
        setOpenDialog('defaultDialog', false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Gagal memperbarui question card');
      }
    });
  };

  return (
    <form id={`form-edit-qc-${data._id}`} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Judul Pertanyaan <span className="text-red-500">*</span></label>
        <Input 
          required 
          placeholder="Tuliskan pertanyaan di sini..." 
          value={judulPertanyaan}
          onChange={(e) => setJudulPertanyaan(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green bg-white text-sm"
            value={kategori}
            onChange={(e) => {
              setKategori(e.target.value as any);
              if (e.target.value !== 'materi') {
                setNamaMateri(null);
              }
            }}
          >
            <option value="materi">Materi</option>
            <option value="teknis">Teknis</option>
            <option value="kepribadian">Kepribadian</option>
            <option value="motivasi">Motivasi</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tingkat</label>
          <select
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green bg-white text-sm ${kategori === 'materi' ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
            value={tingkat}
            disabled={kategori === 'materi'}
            onChange={(e) => setTingkat(Number(e.target.value) as 1 | 2 | 3)}
          >
            <option value={1}>Tingkat 1</option>
            <option value={2}>Tingkat 2</option>
            <option value={3}>Tingkat 3</option>
          </select>
        </div>
      </div>

      {kategori === 'materi' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Materi <span className="text-red-500">*</span></label>
          <Select
            options={materiOptions}
            isLoading={loadingMateri}
            placeholder="Cari materi..."
            noOptionsMessage={() => "Materi tidak ditemukan"}
            value={materiOptions.find(o => o.value === namaMateri) || null}
            onChange={(opt) => {
              setNamaMateri(opt?.value || null);
              if (opt?.tingkat) {
                setTingkat(opt.tingkat as 1 | 2 | 3);
              }
            }}
            isClearable
            styles={{
              control: (base) => ({
                ...base,
                borderColor: '#D1D5DB', // gray-300
                '&:hover': { borderColor: '#10B981' }, // brand-green approx
                boxShadow: 'none',
                minHeight: '38px',
                borderRadius: '0.5rem',
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? '#10B981' : state.isFocused ? '#D1FAE5' : 'white',
                color: state.isSelected ? 'white' : '#111827',
                '&:active': { backgroundColor: '#10B981' }
              })
            }}
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi / Konteks (Opsional)</label>
        <textarea
          rows={3}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
          placeholder="Berikan ekspektasi jawaban atau catatan untuk asisten penilai..."
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
        />
      </div>
    </form>
  );
};

export default FormEditQC;
