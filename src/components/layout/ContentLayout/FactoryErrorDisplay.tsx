import React from 'react';
import GearErrorIllustration from './GearErrorIllustration';

interface FactoryErrorDisplayProps {
  error: any;
}

const FactoryErrorDisplay: React.FC<FactoryErrorDisplayProps> = ({ error }) => {
  const statusCode = error?.response?.status;
  const errorMessage =
    error?.response?.data?.errors?.[0]?.message ||
    error?.response?.data?.errors?.[0] ||
    (error?.message
      ? error.message + (error?.response?.statusText ? ': ' + error.response.statusText : '')
      : null);

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden rounded-[inherit] bg-white dark:bg-gray-900">
      <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-blue-400 to-blue-600" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[200px] w-[200px] -translate-x-[30%] translate-y-[30%] opacity-60"
           style={{ background: 'radial-gradient(circle, rgba(219,234,254,1) 0%, transparent 70%)' }} />
      <div className="pointer-events-none absolute right-0 top-0 h-[200px] w-[200px] translate-x-[30%] -translate-y-[30%] opacity-50"
           style={{ background: 'radial-gradient(circle, rgba(219,234,254,1) 0%, transparent 70%)' }} />

      {statusCode && (
        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[52%] select-none whitespace-nowrap text-[18vw] font-black leading-none tracking-tighter text-blue-50 dark:text-gray-800">
          {statusCode}
        </span>
      )}

      <div className="relative z-10 flex max-w-[400px] flex-col items-center space-y-4 px-6 text-center">
        <div className="mx-auto h-[220px] w-full max-w-[280px]">
          <GearErrorIllustration />
        </div>
        
        <div className="flex flex-col space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-gray-700 dark:text-gray-100">
            Gagal Memuat Data
          </h2>
          <p className="text-sm leading-relaxed text-gray-400 dark:text-gray-500">
            Maaf, terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.
          </p>
        </div>
        
        {errorMessage && (
          <div className="w-full rounded-lg border border-blue-100 bg-white px-4 py-3 text-left dark:border-blue-900 dark:bg-gray-800">
            <h3 className="mb-1 text-xs font-bold tracking-wider text-blue-400">
              DETAIL ERROR
            </h3>
            <p className="break-words font-mono text-xs text-gray-500 dark:text-gray-400">
              {errorMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FactoryErrorDisplay;
