import React, { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { FiUploadCloud, FiFile, FiTrash2, FiExternalLink } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { 
  useUploadTempJawaban, 
  useDeleteTempJawaban, 
  useDeletePermanentJawaban,
  downloadJawaban,
  useSaveJawaban
} from '../api/jawaban.api';
import { useJawabanStore } from '../store/useJawabanStore';

interface JawabanFileUploaderProps {
  jenisUjian: 'praktek' | 'project';
  label: string;
  description: string;
  existingUrl?: string | null;
  acceptedTypes: string;
  validTypes: string[];
  maxSizeMB: number;
}

const JawabanFileUploader: React.FC<JawabanFileUploaderProps> = ({
  jenisUjian,
  label,
  description,
  existingUrl,
  acceptedTypes,
  validTypes,
  maxSizeMB,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { setAlert, resetAlert } = useDialogStore();
  
  const { 
    tempPraktek, filePraktek, setTempPraktek, setFilePraktek,
    tempProject, fileProject, setTempProject, setFileProject
  } = useJawabanStore();

  const tempUrl = jenisUjian === 'praktek' ? tempPraktek : tempProject;
  const selectedFile = jenisUjian === 'praktek' ? filePraktek : fileProject;

  const uploadTempMutation = useUploadTempJawaban();
  const deleteTempMutation = useDeleteTempJawaban();
  const deletePermanentMutation = useDeletePermanentJawaban();
  const saveMutation = useSaveJawaban();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Ukuran file maksimal adalah ${maxSizeMB}MB`);
      e.target.value = '';
      return;
    }

    if (!validTypes.includes(file.type)) {
      toast.error('Format file tidak didukung');
      e.target.value = '';
      return;
    }

    try {
      const res = await uploadTempMutation.mutateAsync({ jenisUjian, file });
      if (jenisUjian === 'praktek') {
        setTempPraktek(res.fileUrl);
        setFilePraktek(file);
      } else {
        setTempProject(res.fileUrl);
        setFileProject(file);
      }
      toast.success('File berhasil diunggah secara sementara');
    } catch (error: any) {
      const errorMsg = error?.response?.data?.errors?.[0]?.message || error?.response?.data?.message || 'Gagal mengunggah file';
      toast.error(errorMsg);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCancelTempUpload = async () => {
    if (!tempUrl) return;
    try {
      await deleteTempMutation.mutateAsync(tempUrl);
      if (jenisUjian === 'praktek') {
        setTempPraktek(null);
        setFilePraktek(null);
      } else {
        setTempProject(null);
        setFileProject(null);
      }
      toast.success('File sementara berhasil dibatalkan');
    } catch (error: any) {
      const errorMsg = error?.response?.data?.errors?.[0]?.message || error?.response?.data?.message || 'Gagal membatalkan upload file';
      toast.error(errorMsg);
    }
  };

  const handleSave = async () => {
    if (!tempUrl) return;
    try {
      await saveMutation.mutateAsync({ jenisUjian, fileUrl: tempUrl });
      if (jenisUjian === 'praktek') {
        setTempPraktek(null);
        setFilePraktek(null);
      } else {
        setTempProject(null);
        setFileProject(null);
      }
      toast.success('File berhasil disimpan permanen');
    } catch (error: any) {
      const errorMsg = error?.response?.data?.errors?.[0]?.message || error?.response?.data?.message || 'Gagal menyimpan file';
      toast.error(errorMsg);
    }
  };

  const handleDeletePermanent = () => {
    setAlert({
      type: 'error',
      text: {
        heading: 'Hapus File Permanen?',
        body: 'Apakah Anda yakin ingin menghapus file ini? Tindakan ini akan menghapus file dari database dan storage secara permanen dan tidak dapat dibatalkan.',
      },
      btnTrue: { text: 'Ya, Hapus Permanen' },
      btnFalse: { text: 'Batal' },
      onTrueCallback: async () => {
        try {
          await deletePermanentMutation.mutateAsync(jenisUjian);
          toast.success('File berhasil dihapus permanen');
        } catch (error: any) {
          const errorMsg = error?.response?.data?.errors?.[0]?.message || error?.response?.data?.message || 'Gagal menghapus file';
          toast.error(errorMsg);
        } finally {
          resetAlert();
        }
      }
    });
  };

  const isLoading = uploadTempMutation.isPending || deleteTempMutation.isPending || deletePermanentMutation.isPending || saveMutation.isPending;

  // Case 1: Sedang ada file yang diunggah sementara (temp URL ada)
  if (tempUrl) {
    return (
      <div className="border border-teal-500/30 rounded-xl p-5 bg-teal-50 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">{label}</h3>
        <p className="text-xs text-teal-700 mb-4">File ini belum tersimpan permanen. Klik Simpan untuk menyimpan.</p>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-blue-100 bg-white rounded-lg gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-md shrink-0">
              <FiFile className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 line-clamp-1">
                {selectedFile ? selectedFile.name : 'File siap disimpan'}
              </p>
              {selectedFile && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCancelTempUpload}
              disabled={isLoading}
              className="whitespace-nowrap shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <FiTrash2 className="w-4 h-4 mr-2" />
              Batal
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSave}
              disabled={isLoading}
              className="whitespace-nowrap shrink-0"
            >
              Simpan
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: Sudah ada file tersimpan di DB
  if (existingUrl) {
    return (
      <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">{label}</h3>
        <p className="text-xs text-gray-500 mb-4">{description}</p>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-lepkom-green/20 bg-lepkom-green/5 rounded-lg gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 bg-lepkom-green/10 text-lepkom-green rounded-md shrink-0">
              <FiFile className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 line-clamp-1">
                File tersimpan
              </p>
              <button 
                type="button"
                onClick={async () => {
                  try {
                    await downloadJawaban(jenisUjian, `jawaban_${jenisUjian}.pdf`);
                  } catch (err: any) {
                    const errorMsg = err?.response?.data?.errors?.[0]?.message || err?.response?.data?.message || 'Gagal mengunduh dokumen';
                    toast.error(errorMsg);
                  }
                }}
                className="text-xs text-lepkom-green hover:underline flex items-center gap-1 mt-0.5 cursor-pointer bg-transparent border-none p-0"
              >
                Lihat Dokumen <FiExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDeletePermanent}
            disabled={isLoading}
            className="whitespace-nowrap shrink-0"
          >
            <FiTrash2 className="w-4 h-4 mr-2" />
            Hapus Permanen
          </Button>
        </div>
      </div>
    );
  }

  // Case 3: Kosong (Siap upload)
  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-1">{label}</h3>
      <p className="text-xs text-gray-500 mb-4">{description}</p>
      
      <div 
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors flex flex-col items-center justify-center group ${
          isLoading ? 'bg-gray-50 border-gray-300 cursor-not-allowed opacity-70' : 'border-gray-300 hover:bg-teal-50 hover:border-teal-500 cursor-pointer bg-gray-50/50'
        }`}
        onClick={() => {
          if (!isLoading) {
            fileInputRef.current?.click();
          }
        }}
      >
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={acceptedTypes}
          className="hidden"
          disabled={isLoading}
        />
        
        {uploadTempMutation.isPending ? (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm font-medium text-gray-700">Mengunggah file...</p>
          </div>
        ) : (
          <>
            <div className="p-3 rounded-full mb-3 transition-colors bg-white text-gray-400 shadow-sm group-hover:text-teal-600">
              <FiUploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Klik untuk memilih file</p>
              <p className="text-xs text-gray-500 mt-1">Max: {maxSizeMB}MB</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JawabanFileUploader;

