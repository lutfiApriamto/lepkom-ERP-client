import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { FiPlus, FiDownload, FiChevronDown, FiUserPlus, FiUploadCloud } from 'react-icons/fi';
import { useAuthStore } from '@/features/auth/shared/store';
import { useAsistenActions } from '../hooks/useAsistenActions';
import { downloadExportAsisten } from '../api/asisten.api';
import toast from 'react-hot-toast';

const HeaderContent = () => {
  const { role } = useAuthStore();
  const { handleCreateManual, handleImportExcel } = useAsistenActions();
  const isSuperAdmin = role === 'super_admin';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await downloadExportAsisten();
      toast.success('Data asisten berhasil diekspor');
    } catch (error) {
      toast.error('Gagal mengekspor data asisten');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Master Data Asisten</h1>
        <p className="text-sm text-gray-500 mt-1">
          Kelola profil, role, dan status aktif seluruh asisten.
        </p>
      </div>
      
      {isSuperAdmin && (
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2"
          >
            <FiDownload className="w-4 h-4" />
            <span>{isExporting ? 'Mengekspor...' : 'Export Excel'}</span>
          </Button>

          <div className="relative">
            <Button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-green-600 hover:bg-green-700 text-white shadow-sm flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              <span>Tambah Asisten</span>
              <FiChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </Button>

            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 py-1 border border-gray-100">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      handleCreateManual();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FiUserPlus className="w-4 h-4" />
                    Tambah Manual
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      handleImportExcel();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FiUploadCloud className="w-4 h-4" />
                    Import Excel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderContent;
