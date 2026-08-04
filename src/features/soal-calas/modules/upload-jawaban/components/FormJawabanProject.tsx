import React from 'react';
import JawabanFileUploader from './JawabanFileUploader';
import StateLockLayout from './StateLockLayout';
import { useGetMyBiodata } from '@/features/biodata/shared/api/biodata.api';

const FormJawabanProject: React.FC = () => {
  const { data: res } = useGetMyBiodata();
  const calas = res?.data;

  if (!calas) return null;

  if (calas.statusRekrutmen.tahapSaatIni !== 'ujian_project') {
    return (
      <StateLockLayout 
        title="Fitur Terkunci" 
        description="Anda tidak dapat mengunggah jawaban ujian project pada tahap ini. Pastikan tahap rekrutmen Anda saat ini adalah Ujian Project." 
      />
    );
  }

  return (
    <div className="space-y-6">
      <JawabanFileUploader
        jenisUjian="project"
        label="Jawaban Ujian Project"
        description="Unggah file PPT/PPTX jawaban project Anda di sini."
        existingUrl={calas.jawabanProject}
        acceptedTypes=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
        validTypes={['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']}
        maxSizeMB={10}
      />
    </div>
  );
};

export default FormJawabanProject;

