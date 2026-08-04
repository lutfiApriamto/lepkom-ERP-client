import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { FiPlus, FiChevronDown, FiUserPlus, FiUploadCloud } from 'react-icons/fi';
import { useAuthStore } from '@/features/auth/shared/store';
import { useCalasActions } from '../hooks/useCalasActions';

const HeaderContent = () => {
  const { role } = useAuthStore();
  const { handleCreateManual, handleImportExcel } = useCalasActions();
  const isSuperAdmin = role === 'super_admin';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Master Data Calas</h1>
        <p className="text-sm text-gray-500 mt-1">
          Kelola data Calon Asisten, pantau progres rekrutmen, dan integrasikan hasil.
        </p>
      </div>
      
      {isSuperAdmin && (
        <div className="flex items-center gap-2">

          <div className="relative">
            <Button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-green-600 hover:bg-green-700 text-white shadow-sm flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              <span>Tambah Calas</span>
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
