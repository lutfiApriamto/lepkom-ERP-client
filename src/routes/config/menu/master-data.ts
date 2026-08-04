import { path } from '@/utils/consts';
import { 
  FiDatabase, 
  FiUsers, 
  FiUserPlus, 
  FiCalendar, 
  FiKey, 
  FiBookOpen, 
  FiFileText, 
  FiList 
} from 'react-icons/fi';

export const masterDataMenu = {
  label: 'Master Data',
  icon: FiDatabase,
  path: path.lepkom.masterData.default,
  type: 'master',
  role: ['super_admin', 'pj_soal_materi', "penanggung_jawab_ruangan", "koordinator_lapangan", "asisten_penilai", "asisten", "staff"],
  children: [
    {
      key: 'asisten',
      label: 'Data Asisten',
      description: 'Kelola data dan role seluruh asisten.',
      path: path.lepkom.masterData.asisten.default,
      icon: FiUsers,
      role: ['super_admin', 'pj_soal_materi', "penanggung_jawab_ruangan", "koordinator_lapangan", "asisten_penilai", "asisten", "staff"]
    },
    {
      key: 'calas',
      label: 'Data Calas',
      description: 'Pantau rekrutmen dan tahapan calon asisten.',
      path: path.lepkom.masterData.calas.default,
      icon: FiUserPlus,
      role: ['super_admin', 'pj_soal_materi', "penanggung_jawab_ruangan", "koordinator_lapangan", "asisten_penilai", "asisten", "staff"]
    },
    {
      key: 'rekrutmen',
      label: 'Gelombang Rekrutmen',
      description: 'Buka atau tutup periode pendaftaran asisten.',
      path: path.lepkom.masterData.rekrutmen.default,
      icon: FiCalendar,
      role: ['super_admin']
    },
    {
      key: 'resetRequests',
      label: 'Request Reset Password',
      description: 'Kelola permohonan reset password.',
      path: path.lepkom.masterData.resetRequests.default,
      icon: FiKey,
      role: ['super_admin']
    },
    {
      key: 'materi',
      label: 'Data Materi',
      description: 'Kelola data materi pembelajaran lepkom.',
      path: path.lepkom.masterData.materi.default,
      icon: FiBookOpen,
      role: ['super_admin', 'pj_soal_materi', "penanggung_jawab_ruangan", "koordinator_lapangan", "asisten_penilai", "asisten", "staff"]
    },
    {
      key: 'soal',
      label: 'Data Soal',
      description: 'Kelola data soal ujian.',
      path: path.lepkom.masterData.soal.default,
      icon: FiFileText,
      role: ['super_admin', 'pj_soal_materi', "staff"]
    }, 
    {
      key: 'questionCard',
      label: 'Data Question Card',
      description: 'Kelola bank pertanyaan wawancara.',
      path: path.lepkom.masterData.questionCard.default,
      icon: FiList,
      role: ['super_admin', 'pj_soal_materi', "penanggung_jawab_ruangan", "koordinator_lapangan", "asisten_penilai", "asisten", "staff"]
    }
  ]
};
