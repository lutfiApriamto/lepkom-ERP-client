import { TriangleAlert } from 'lucide-react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { Button } from '@/components/ui';

export const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError() as any;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-800 p-4">
      <div className="flex flex-col items-center space-y-8 text-center max-w-2xl">
        <TriangleAlert className="h-24 w-24 text-orange-500 dark:text-orange-300" />
        
        <h1 className="text-4xl font-bold text-red-800 dark:text-red-100">
          Oops! Terjadi Kesalahan
        </h1>
        
        <p className="text-xl text-red-800 dark:text-red-100">
          {error?.statusText || error?.message || 'Maaf, terjadi kesalahan yang tidak diketahui.'}
        </p>
        
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate('/', { replace: true })}>
            Kembali ke Beranda
          </Button>
          <Button onClick={() => navigate(0)}>
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};
