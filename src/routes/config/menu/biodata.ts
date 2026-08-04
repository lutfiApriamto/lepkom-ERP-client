import { path } from '@/utils/consts';
import { FaUserEdit, FaGraduationCap, FaUsers, FaFileArchive } from 'react-icons/fa';
import { BsPersonVcard } from 'react-icons/bs';

export const biodataMenu = {
  label: 'Biodata Calas',
  icon: BsPersonVcard,
  path: path.lepkom.biodata.default,
  type: 'management',
  role: ['calas'],
  children: [
    {
      key: 'personal',
      label: 'Data Pribadi',
      path: path.lepkom.biodata.personal.default,
      description: 'Kelola Data Pribadi Anda',
      icon: FaUserEdit,
      role: ['calas']
    },
    {
      key: 'pendidikan',
      label: 'Pendidikan',
      path: path.lepkom.biodata.pendidikan.default,
      description: 'Kelola Data Pendidikan Anda.',
      icon: FaGraduationCap,
      role: ['calas']
    },
    {
      key: 'keluarga',
      label: 'Keluarga',
      path: path.lepkom.biodata.keluarga.default,
      description: 'Kelola Data Keluarga Anda.',
      icon: FaUsers,
      role: ['calas']
    },
    {
      key: 'berkas',
      label: 'Upload Berkas',
      path: path.lepkom.biodata.berkas.default,
      description: 'Upload File KRS,DNS & CV anda',
      icon: FaFileArchive,
      role: ['calas']
    }
  ]
};
