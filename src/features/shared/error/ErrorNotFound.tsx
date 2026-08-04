import { useNavigate } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';
import { ContentLayout } from '@/components/layout';

export const ErrorNotFound = () => {
  const navigate = useNavigate();

  return (
    <ContentLayout>
      <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
          <div className="absolute h-24 w-24 rounded-full bg-gray-200"></div>
          <FileQuestion className="relative z-10 h-16 w-16 text-gray-400" strokeWidth={1.5} />
        </div>
        
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-gray-900">
          Halaman Tidak Ditemukan
        </h1>
        
        <p className="mb-8 max-w-md text-lg text-gray-500">
          Maaf, halaman yang Anda cari tidak tersedia, telah dipindahkan, atau Anda mengetik URL yang salah.
        </p>
        
        <div className="flex gap-4">
          <Button 
            onClick={() => navigate('/lepkom/dashboard', { replace: true })}
            className="flex items-center gap-2 bg-lepkom-green hover:bg-lepkom-green/90 px-6 py-2.5 text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    </ContentLayout>
  );
};
