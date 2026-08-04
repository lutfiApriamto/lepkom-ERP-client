import React, { useEffect } from 'react';
import { ContentLayout } from '@/components/layout';
import { useBreadcrumbStore } from '@/hooks/globalStore';
import { path } from '@/utils/consts';
import FormJawabanPraktek from './components/FormJawabanPraktek';
import FormJawabanProject from './components/FormJawabanProject';

const UploadJawabanModule: React.FC = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Soal & Upload Jawaban', path: path.lepkom.calasSoal.default },
      { label: 'Upload Jawaban', path: path.lepkom.calasSoal.uploadJawaban.default },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  return (
    <ContentLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Upload Jawaban</h1>
        <p className="text-sm text-gray-500 mt-1">
          Upload file jawaban ujian praktek dan ujian project Anda di sini.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormJawabanPraktek />
        <FormJawabanProject />
      </div>
    </ContentLayout>
  );
};

export default UploadJawabanModule;

