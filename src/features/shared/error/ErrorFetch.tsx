import { TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui';

interface ErrorFetchProps {
  error?: any;
  resetErrorBoundary?: () => void;
}

export const ErrorFetch = ({ error, resetErrorBoundary }: ErrorFetchProps) => {
  return (
    <div className="flex min-h-full items-center justify-center bg-gray-50 p-4 dark:bg-black rounded-xl">
      <div className="w-full max-w-lg rounded-xl bg-white px-6 py-10 text-center shadow-xl dark:bg-gray-800">
        <div className="flex flex-col items-center space-y-6">
          <TriangleAlert className="h-16 w-16 text-red-500 dark:text-red-400" />
          
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Terjadi Kesalahan
          </h1>
          
          <p className="text-lg text-gray-800 dark:text-gray-100">
            Maaf, terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.
          </p>
          
          {error && (
            <p className="text-base text-red-500 dark:text-red-400">
              {error?.response?.status}
              <br />
              {error?.response?.data?.errors?.[0]?.message ||
                error?.response?.data?.errors?.[0] ||
                error?.message + (error?.response?.statusText ? ': ' + error?.response?.statusText : '')}
            </p>
          )}
          
          <Button onClick={resetErrorBoundary} className="w-full h-12 text-lg">
            Coba Lagi
          </Button>
        </div>
      </div>
    </div>
  );
};
