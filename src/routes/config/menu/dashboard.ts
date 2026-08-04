import { path } from '@/utils/consts';
import { MdDashboard } from 'react-icons/md';
import { HiSpeakerphone } from 'react-icons/hi';

export const dashboardMenu = {
  label: 'Dashboard',
  icon: MdDashboard,
  path: path.lepkom.dashboard.default,
  type: 'dashboard',
  role: ['super_admin', 'koordinator_lapangan', 'penanggung_jawab_ruangan', 'asisten_penilai', 'pj_soal_materi', 'asisten', 'calas'],
};

