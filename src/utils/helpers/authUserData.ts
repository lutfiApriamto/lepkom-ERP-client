import { getLocalStorage, setLocalStorage, removeLocalStorage } from './localStorage';

const STORAGE_USER_KEY = 'LEPKOM_AUTH_USER';

export interface AuthUserData {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'pj_soal_materi' | 'penanggung_jawab_ruangan' | 'koordinator_lapangan' | 'asisten_penilai' | 'asisten' | 'staff' | 'calas' | string;
  [key: string]: any;
}

/**
 * Pemetaan role untuk tampilan UI
 */
const roleNameMap: Record<string, string> = {
  'super_admin': 'Super Admin',
  'pj_soal_materi': 'PJ Soal & Materi',
  'penanggung_jawab_ruangan': 'Penanggung Jawab Ruangan',
  'koordinator_lapangan': 'Koordinator Lapangan',
  'asisten_penilai': 'Asisten Penilai',
  'asisten': 'Asisten',
  'staff': 'Staff',
  'calas': 'Calon Asisten'
};

export const setAuthUserData = (data: AuthUserData): void => {
  if (typeof window !== 'undefined') {
    setLocalStorage(STORAGE_USER_KEY, data);
  }
};

export const getAuthUserData = (): AuthUserData | null => {
  if (typeof window !== 'undefined') {
    const data = getLocalStorage<AuthUserData>(STORAGE_USER_KEY);
    if (data && data.role) {
      // Menyisipkan nama role yang sudah diformat agar UI mudah merender
      data.roleName = roleNameMap[data.role.toLowerCase()] || data.role;
    }
    return data;
  }
  return null;
};

export const deleteAuthUserData = (): void => {
  if (typeof window !== 'undefined') {
    removeLocalStorage(STORAGE_USER_KEY);
  }
};
