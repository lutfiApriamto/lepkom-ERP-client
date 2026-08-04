// ─── Enums & Constants ────────────────────────────────────────────────────────

export type Role =
  | 'super_admin'
  | 'pj_soal_materi'
  | 'pj_ruangan'
  | 'koordinator_lapangan'
  | 'asisten_penilai'
  | 'asisten'
  | 'staff'
  | 'calas'

export const ASISTEN_ROLES: readonly Role[] = [
  'super_admin',
  'pj_soal_materi',
  'pj_ruangan',
  'koordinator_lapangan',
  'asisten_penilai',
  'asisten',
  'staff',
] as const

export type TahapRekrutmen =
  | 'registrasi'
  | 'screening'
  | 'biodata_dokumen'
  | 'ujian_praktek'
  | 'ujian_project'
  | 'keputusan_akhir'
  | 'selesai'

export type HasilRekrutmen = 'proses' | 'lolos' | 'tidak_lolos'

export type AlasanTidakLolos =
  | 'tidak_lolos_screening'
  | 'tidak_hadir_ujian'
  | 'tidak_lolos_penilaian'
  | 'ditolak_rapat_akhir'
  | 'lainnya'

export type JenisUjian = 'praktek' | 'project'

export type Ruangan = 121 | 122 | 124 | 125

export const RUANGAN_LIST: readonly Ruangan[] = [121, 122, 124, 125] as const

export type DaftarVia = 'mandiri' | 'asisten'

export type HardResetStatus = 'menunggu' | 'disetujui' | 'ditolak'

export const CRITERIA_PRAKTEK = [
  'konsep',
  'eksekusi',
  'analisa',
  'klarifikasi',
] as const

export const CRITERIA_PROJECT = [
  'penguasaan',
  'kreativitas',
  'kontribusi',
  'presentasi',
  'motivasi',
  'interpersonal',
  'integritas',
  'potensi',
] as const

export type KriteriaPraktek = (typeof CRITERIA_PRAKTEK)[number]
export type KriteriaProject = (typeof CRITERIA_PROJECT)[number]

// ─── API Response ─────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  total: number
  page: number
  limit: number
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthLoginRequest {
  email: string
  password: string
}

export interface AuthLoginResponse {
  token: string
  user: User
}

export interface AuthRegisterRequest {
  nama: string
  npm: string
  email: string
  password: string
  kelas: string
}

// ─── Core Entities ────────────────────────────────────────────────────────────

export interface User {
  _id: string
  idAsisten: string
  npm: string
  nama: string
  email: string
  kelasSaatIni?: string | null
  role: Role
  wajibGantiPassword: boolean
  calasRef?: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Calas {
  _id: string
  idCalas: string
  gelombangDaftar?: string
  npm: string
  namaCalas: string
  kelas: string
  jenisKelamin: 'Laki-laki' | 'Perempuan'
  noKtp: string
  noHp: string
  emailCalas: string
  tempatLahir: string
  tanggalLahir: string
  alamatLengkap: string
  asalSekolah: string
  wilayah?: string
  jurusan: string
  ipk: number
  namaIbu?: string
  namaAyah?: string
  noHpOrtu: string
  kursusSemester: KursusSemester
  semesterKursusDel: boolean
  kemampuanPribadi?: string
  kemampuanIt?: string
  pengalamanOrganisasi?: string
  pengalamanKerja?: string
  daftarVia: DaftarVia
  didaftarkanOleh?: string | null
  wajibGantiPassword: boolean
  cv?: string | null
  krs?: string | null
  rangkumanNilai?: string | null
  statusRekrutmen: StatusRekrutmen
  isBanned: boolean
  createdAt: string
  updatedAt: string
}

export interface KursusSemester {
  semester1?: string | null
  semester2?: string | null
  semester3?: string | null
  semester4?: string | null
  semester5?: string | null
  semester6?: string | null
  semester7?: string | null
}

export interface StatusRekrutmen {
  tahapSaatIni: TahapRekrutmen
  hasil: HasilRekrutmen
  alasanTidakLolos?: AlasanTidakLolos | null
}

// ─── Master Data ──────────────────────────────────────────────────────────────

export interface Materi {
  _id: string
  namaMateri: string
  tingkat: 1 | 2 | 3
  deskripsi?: string | null
  dibuatOleh?: string | null
  createdAt: string
  updatedAt: string
}

export interface Soal {
  _id: string
  judulSoal: string
  tingkat: 1 | 2 | 3
  file: string
  dibuatOleh?: string | null
  createdAt: string
  updatedAt: string
}

export interface QuestionCard {
  _id: string
  judulPertanyaan: string
  deskripsi?: string | null
  dibuatOleh?: string | null
  createdAt: string
  updatedAt: string
}

// ─── Scheduling ───────────────────────────────────────────────────────────────

export interface ExamSession {
  _id: string
  tanggal: string
  jenisUjian: JenisUjian
  catatan?: string | null
  dibuatOleh?: string | null
  createdAt: string
  updatedAt: string
}

export interface RoomAssignment {
  _id: string
  examSessionRef: string
  ruangan: Ruangan
  pjRuanganRef: string
  dibuatOleh?: string | null
  createdAt: string
  updatedAt: string
}

export interface RoomPlacement {
  _id: string
  examSessionRef: string
  ruangan: Ruangan
  calasList: string[]
  penilaiList: string[]
  dibuatOleh?: string | null
  createdAt: string
  updatedAt: string
}

// ─── Penilaian ────────────────────────────────────────────────────────────────

export interface Penilaian {
  _id: string
  calasRef: string
  penilaiRef: string
  examSessionRef: string
  jenisUjian: JenisUjian
  kriteria: Record<string, number>
  deskripsi: string
  skorKeseluruhan: number
  createdAt: string
  updatedAt: string
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export interface RecruitmentSetting {
  key: string
  isActive: boolean
  gelombangAktif?: string | null
  diaktifkanOleh?: string | null
  diaktifkanPada?: string | null
  dinonaktifkanOleh?: string | null
  dinonaktifkanPada?: string | null
  createdAt: string
  updatedAt: string
}

export interface HardResetRequest {
  _id: string
  asistenRef: string
  inputAwal: string
  status: HardResetStatus
  disetujuiOleh?: string | null
  diprosesPada?: string | null
  createdAt: string
  updatedAt: string
}
