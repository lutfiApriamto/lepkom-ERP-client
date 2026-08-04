import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FiUploadCloud, FiFile, FiTrash2, FiExternalLink } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { 
  useUploadTempDokumen, 
  useDeleteTempDokumen, 
  useDeletePermanentDokumen,
  downloadDokumen
} from '../../../shared/api/biodata.api';

interface FileUploaderProps {
  jenisDokumen: 'cv' | 'krs' | 'rangkumanNilai';
  label: string;
  description: string;
  existingUrl?: string | null;
  isEditing: boolean;
  onTempUrlChange: (url: string | null) => void;
  tempUrl: string | null;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  jenisDokumen,
  label,
  description,
  existingUrl,
  isEditing,
  onTempUrlChange,
  tempUrl
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { setAlert, resetAlert } = useDialogStore();

  const uploadTempMutation = useUploadTempDokumen();
  const deleteTempMutation = useDeleteTempDokumen();
  const deletePermanentMutation = useDeletePermanentDokumen();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Ukuran file maksimal adalah 2MB');
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

    try {
      const res = await uploadTempMutation.mutateAsync({ jenisDokumen, file });
      onTempUrlChange(res?.fileUrl || null);
      setSelectedFile(file);
      toast.success('File berhasil diunggah secara sementara');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Gagal mengunggah file');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCancelTempUpload = async () => {
    if (!tempUrl) return;
    try {
      await deleteTempMutation.mutateAsync(tempUrl);
      onTempUrlChange(null);
      setSelectedFile(null);
      toast.success('File sementara berhasil dibatalkan');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Gagal membatalkan upload file');
    }
  };

  const handleDeletePermanent = () => {
    setAlert({
      type: 'warning',
      text: {
        heading: 'Hapus File Permanen?',
        body: 'Apakah Anda yakin ingin menghapus file ini? Tindakan ini akan menghapus file dari database dan storage secara permanen dan tidak dapat dibatalkan.',
      },
      btnTrue: { text: 'Ya, Hapus Permanen' },
      btnFalse: { text: 'Batal' },
      onTrueCallback: async () => {
        try {
          await deletePermanentMutation.mutateAsync(jenisDokumen);
          toast.success('File berhasil dihapus permanen');
        } catch (error: any) {
          toast.error(error?.response?.data?.message || 'Gagal menghapus file');
        } finally {
          resetAlert();
        }
      }
    });
  };

  const isLoading = uploadTempMutation.isPending || deleteTempMutation.isPending || deletePermanentMutation.isPending;

  // Case 1: Sudah ada file tersimpan di DB
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
                    await downloadDokumen(jenisDokumen, `${jenisDokumen}.pdf`);
                  } catch (err: any) {
                    toast.error(err?.response?.data?.message || 'Gagal mengunduh dokumen');
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
            disabled={!isEditing || isLoading}
            className="whitespace-nowrap shrink-0"
          >
            <FiTrash2 className="w-4 h-4 mr-2" />
            Hapus Permanen
          </Button>
        </div>
      </div>
    );
  }

  // Case 2: Sedang ada file yang diunggah sementara (temp URL ada)
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
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCancelTempUpload}
            disabled={!isEditing || isLoading}
            className="whitespace-nowrap shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <FiTrash2 className="w-4 h-4 mr-2" />
            Batal Unggah
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
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors flex flex-col items-center justify-center group
          ${!isEditing ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-70' : 
            isLoading ? 'bg-gray-50 border-gray-300 cursor-not-allowed opacity-70' : 
            'border-gray-300 hover:bg-teal-50 hover:border-teal-500 cursor-pointer bg-gray-50/50'
          }`}
        onClick={() => {
          if (isEditing && !isLoading) {
            fileInputRef.current?.click();
          }
        }}
      >
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
          className="hidden"
          disabled={!isEditing || isLoading}
        />
        
        {uploadTempMutation.isPending ? (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm font-medium text-gray-700">Mengunggah file...</p>
          </div>
        ) : (
          <>
            <div className={`p-3 rounded-full mb-3 transition-colors ${!isEditing ? 'bg-gray-200 text-gray-400' : 'bg-white text-gray-400 shadow-sm group-hover:text-teal-600'}`}>
              <FiUploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className={`text-sm font-medium ${!isEditing ? 'text-gray-400' : 'text-gray-700'}`}>Klik untuk memilih file</p>
              <p className="text-xs text-gray-500 mt-1">Hanya mendukung DOC, DOCX, dan PDF (Max: 2MB)</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
