import type { Role, TahapRekrutmen } from '@/types'

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: 'Super Admin',
  pj_soal_materi: 'PJ Soal/Materi',
  pj_ruangan: 'PJ Ruangan',
  koordinator_lapangan: 'Koordinator Lapangan',
  asisten_penilai: 'Asisten Penilai',
  asisten: 'Asisten',
  staff: 'Staff',
  calas: 'Calon Asisten',
}

export const TAHAP_LABELS: Record<TahapRekrutmen, string> = {
  registrasi: 'Registrasi',
  screening: 'Screening',
  biodata_dokumen: 'Biodata & Dokumen',
  ujian_praktek: 'Ujian Praktek',
  ujian_project: 'Ujian Project',
  keputusan_akhir: 'Keputusan Akhir',
  selesai: 'Selesai',
}
