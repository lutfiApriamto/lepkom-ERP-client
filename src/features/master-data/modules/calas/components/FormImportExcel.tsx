import React, { useState, useRef } from 'react';
import { FiUploadCloud, FiFileText, FiX } from 'react-icons/fi';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { useImportCalas } from '../api/calas.api';
import toast from 'react-hot-toast';

const FormImportExcel = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setOpenDialog } = useDialogStore();
  const importMutation = useImportCalas();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'text/csv' // .csv
    ];
    
    if (!validTypes.includes(file.type) && !file.name.endsWith('.xlsx') && !file.name.endsWith('.csv')) {
      toast.error('Gunakan format file .xlsx atau .csv');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('Ukuran file maksimal 10MB');
      return;
    }

    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Pilih file terlebih dahulu');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    importMutation.mutate(formData, {
      onSuccess: (res) => {
        toast.success((res as any)?.message || 'Import data selesai');
        setOpenDialog('defaultDialog', false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Gagal melakukan import data');
      }
    });
  };

  return (
    <form id="form-import-calas" onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-2">
        <p className="text-sm text-gray-600">Unggah file Excel (.xlsx) yang berisi data calon asisten sesuai format yang telah ditentukan.</p>
      </div>

      {!selectedFile ? (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <FiUploadCloud className="w-10 h-10 text-gray-400 mb-2" />
          <p className="text-sm font-medium text-gray-700">Klik atau seret file ke sini</p>
          <p className="text-xs text-gray-500 mt-1">Maksimal ukuran file: 10MB</p>
          <input 
            type="file" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange}
            accept=".xlsx, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv"
          />
        </div>
      ) : (
        <div className="border border-green-200 bg-green-50 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded text-green-600">
              <FiFileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={removeFile}
            className="text-gray-400 hover:text-red-500 p-1"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      )}

      {importMutation.isPending && (
        <div className="text-sm text-blue-600 animate-pulse text-center mt-2">
          Sedang memproses file, mohon tunggu...
        </div>
      )}
    </form>
  );
};

export default FormImportExcel;
