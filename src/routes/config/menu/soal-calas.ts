import { path } from '@/utils/consts';
import { FaListAlt } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import { TiUpload } from "react-icons/ti";

export const calasSoalMenu = {
  label: 'Soal & Upload Jawaban',
  icon: MdLibraryBooks,
  path: path.lepkom.calasSoal.default,
  type: 'management',
  role: ['super_admin','calas', 'pj_soal_materi'],
  children: [
    {
      key: 'daftarSoal',
      label: 'Daftar Soal',
      path: path.lepkom.calasSoal.daftarSoal.default,
      description: 'Download File Soal',
      icon: FaListAlt,
      role: ['super_admin','calas', 'pj_soal_materi']
    },
    {
      key: 'uploadJawaban',
      label: 'upload Jawaban',
      path: path.lepkom.calasSoal.uploadJawaban.default,
      description: 'Upload File Ujian',
      icon: TiUpload,
      role: ['super_admin','calas', 'pj_soal_materi']
    }
  ]
};
