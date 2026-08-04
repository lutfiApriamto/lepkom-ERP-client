import React from 'react';
import { useGetMyBiodata } from '../api/biodata.api';
import FactoryErrorDisplay from '@/components/layout/ContentLayout/FactoryErrorDisplay';

interface BiodataAccessGuardProps {
  children: React.ReactNode;
}

const BiodataAccessGuard: React.FC<BiodataAccessGuardProps> = ({ children }) => {
  const { data, isLoading, error } = useGetMyBiodata();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lepkom-green"></div>
      </div>
    );
  }

  // Handle fetch error
  if (error) {
    return (
      <div className="relative h-full min-h-[500px]">
        <FactoryErrorDisplay error={error} />
      </div>
    );
  }

  const hasil = data?.data?.statusRekrutmen?.hasil;

  // Handle unallowed access
  if (hasil !== 'proses') {
    const customError = {
      response: {
        status: 403,
        statusText: 'Forbidden',
        data: {
          errors: [
            {
              message: `Aksi ini tidak diizinkan karena status hasil rekrutmen Anda adalah "${hasil}". Hanya calas dengan status "proses" yang diizinkan mengubah biodata.`
            }
          ]
        }
      }
    };
    return (
      <div className="relative h-full min-h-[500px]">
        <FactoryErrorDisplay error={customError} />
      </div>
    );
  }

  return <>{children}</>;
};

export default BiodataAccessGuard;
