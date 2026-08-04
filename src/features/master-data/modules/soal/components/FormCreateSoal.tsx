import { useState, useMemo, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { useCreateSoal, useUploadTempSoalFile, useDeleteTempSoalFile } from '../api/soal.api';
import { useGetMateriNames } from '../../materi/api/materi.api';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { FiFile, FiUploadCloud, FiTrash2 } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';

const FormCreateSoal = () => {
  const [judulSoal, setJudulSoal] = useState('');
  const [materiRef, setMateriRef] = useState<string | null>(null);
  const [tingkat, setTingkat] = useState<1 | 2 | 3>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  const createMutation = useCreateSoal();
  const uploadTempMutation = useUploadTempSoalFile();
  const deleteTempMutation = useDeleteTempSoalFile();
  
  const { data: materiData, isLoading: loadingMateri } = useGetMateriNames('');
  const { setOpenDialog } = useDialogStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const materiOptions = useMemo(() => {
    if (!materiData?.data) return [];
    return materiData.data.map(m => ({
      value: m._id,
      label: m.namaMateri,
      tingkat: m.tingkat
    }));
  }, [materiData]);

  useEffect(() => {
    if (materiRef) {
      const selectedMateri = materiOptions.find(m => m.value === materiRef);
      if (selectedMateri && selectedMateri.tingkat) {
        setTingkat(selectedMateri.tingkat as 1 | 2 | 3);
      }
    }
  }, [materiRef, materiOptions]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran file maksimal adalah 5MB');
      e.target.value = '';
      return;
    }

    const validTypes = [
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
      'application/pdf'
    ];
    if (!validTypes.includes(file.type)) {
      toast.error('Format file harus berupa DOC, DOCX, atau PDF');
      e.target.value = '';
      return;
    }

    // Process auto-upload
    try {
      const res = await uploadTempMutation.mutateAsync(file);
      setUploadedFileUrl(res.fileUrl);
      setSelectedFile(file);
      toast.success('File berhasil diunggah');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Gagal mengunggah file ke server');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteTempFile = async () => {
    if (!uploadedFileUrl) return;
    try {
      await deleteTempMutation.mutateAsync(uploadedFileUrl);
      setUploadedFileUrl(null);
      setSelectedFile(null);
      toast.success('File lama berhasil dihapus');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Gagal menghapus file dari server');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judulSoal.trim()) {
      toast.error('Judul soal wajib diisi');
      return;
    }
    if (!materiRef) {
      toast.error('Materi terkait wajib dipilih');
      return;
    }

    const payload = {
      judulSoal,
      materiRef,
      tingkat,
      file: uploadedFileUrl
    };

    try {
      await createMutation.mutateAsync(payload);
      toast.success('Soal berhasil ditambahkan');
      setOpenDialog('defaultDialog', false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Gagal menambahkan soal');
    }
  };

  const isLoading = createMutation.isPending || uploadTempMutation.isPending || deleteTempMutation.isPending;

  return (
    <form id="form-create-soal" onSubmit={handleSubmit} className="space-y-5 px-1 py-2">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Judul Soal <span className="text-red-500">*</span></label>
        <Input 
          required 
          placeholder="Tuliskan judul soal di sini..." 
          value={judulSoal}
          onChange={(e) => setJudulSoal(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Materi <span className="text-red-500">*</span></label>
          <Select
            options={materiOptions}
            isLoading={loadingMateri}
            isDisabled={isLoading}
            placeholder="Cari materi..."
            noOptionsMessage={() => "Materi tidak ditemukan"}
            value={materiOptions.find(o => o.value === materiRef) || null}
            onChange={(opt) => setMateriRef(opt?.value || null)}
            isClearable
            styles={{
              control: (base) => ({
                ...base,
                borderColor: '#D1D5DB',
                '&:hover': { borderColor: '#10B981' },
                boxShadow: 'none',
                minHeight: '40px',
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
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tingkat</label>
          <select
            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green bg-gray-100 text-gray-500 text-sm cursor-not-allowed"
            value={tingkat}
            disabled
          >
            <option value={1}>Tingkat 1</option>
            <option value={2}>Tingkat 2</option>
            <option value={3}>Tingkat 3</option>
          </select>
          <p className="text-[10px] text-gray-400 mt-1">Otomatis dari materi</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">File Soal (Opsional)</label>
        
        {uploadedFileUrl ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-blue-100 bg-blue-50/50 rounded-lg gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-md">
                <FiFile className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 line-clamp-1">
                  {selectedFile ? selectedFile.name : 'File sudah terunggah'}
                </p>
                {selectedFile && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
              </div>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleDeleteTempFile}
              disabled={isLoading}
              className="whitespace-nowrap"
            >
              <FiTrash2 className="w-4 h-4 mr-2" />
              Hapus File
            </Button>
          </div>
        ) : (
          <div 
            className={`relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition-colors flex flex-col items-center justify-center group ${uploadTempMutation.isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 hover:border-brand-green cursor-pointer'}`}
            onClick={() => !uploadTempMutation.isPending && fileInputRef.current?.click()}
          >
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
              className="hidden"
              disabled={isLoading}
            />
            
            {uploadTempMutation.isPending ? (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-sm font-medium text-gray-700">Mengunggah file...</p>
              </div>
            ) : (
              <>
                <div className="p-3 rounded-full mb-3 transition-colors bg-gray-100 text-gray-400 group-hover:bg-brand-green/10 group-hover:text-brand-green">
                  <FiUploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Klik untuk memilih file</p>
                  <p className="text-xs text-gray-500 mt-1">Hanya mendukung DOC, DOCX, dan PDF (Max: 5MB)</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default FormCreateSoal;
