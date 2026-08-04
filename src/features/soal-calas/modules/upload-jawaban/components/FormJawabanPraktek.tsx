import React from 'react';
import JawabanFileUploader from './JawabanFileUploader';
import StateLockLayout from './StateLockLayout';
import { useGetMyBiodata } from '@/features/biodata/shared/api/biodata.api';

const FormJawabanPraktek: React.FC = () => {
  const { data: res } = useGetMyBiodata();
  const calas = res?.data;

  if (!calas) return null;

  if (calas.statusRekrutmen.tahapSaatIni !== 'ujian_praktek') {
    return (
      <StateLockLayout 
        title="Fitur Terkunci" 
        description="Anda tidak dapat mengunggah jawaban ujian praktek pada tahap ini. Pastikan tahap rekrutmen Anda saat ini adalah Ujian Praktek." 
      />
    );
  }

  return (
    <div className="space-y-6">
      <JawabanFileUploader
        jenisUjian="praktek"
        label="Jawaban Ujian Praktek"
        description="Unggah file jawaban praktek Anda di sini."
        existingUrl={calas.jawabanPraktek}
        acceptedTypes=".doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
        validTypes={['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf']}
        maxSizeMB={10}
      />
    </div>
  );
};

export default FormJawabanPraktek;

