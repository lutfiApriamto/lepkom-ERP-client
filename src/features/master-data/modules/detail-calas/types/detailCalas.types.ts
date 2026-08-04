export interface RoomPlacementItem {
  ruangan: number;
  examSession: {
    _id: string;
    tanggal: string;
    jamMulai: string;
    jamSelesai: string;
    jenisUjian: string;
  };
}

export interface DetailPenilaiItem {
  penilai: {
    _id: string;
    idAsisten: string;
    nama: string;
    role?: string;
  };
  kriteria: Record<string, number>;
  skorKeseluruhan: number;
  deskripsi: string;
}

export interface RingkasanTipeUjian {
  rataRataKeseluruhan: number;
  rataRataKriteria: Record<string, number>;
  detailPenilai: DetailPenilaiItem[];
}

export interface RingkasanPenilaian {
  praktek: RingkasanTipeUjian;
  project: RingkasanTipeUjian;
}

export interface DetailCalas {
  _id: string;
  idCalas: string;
  npm: string;
  namaCalas: string;
  kelas: string;
  jurusan: string;
  emailCalas: string;
  noHp: string;
  jenisKelamin: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamatLengkap: string;
  wilayah: string;
  agama: string;
  ipk: number;
  asalSekolah: string;
  namaIbu: string;
  namaAyah: string;
  noHpOrtu: string;
  kursusSemester?: {
    semester1?: string | null;
    semester2?: string | null;
    semester3?: string | null;
    semester4?: string | null;
    semester5?: string | null;
    semester6?: string | null;
    semester7?: string | null;
  };
  isKursusDelete?: boolean;
  SemesterKursusDel?: string;

  statusRekrutmen: {
    tahapSaatIni: string;
    hasil: string;
    alasanTidakLolos?: string;
    deskripsiPenolakan?: string;
  };
  skorAkhirNilai: number | null;
  // Files
  cv?: string;
  krs?: string;
  rangkumanNilai?: string;
  jawabanPraktek?: string;
  jawabanProject?: string;
  // Abilities & Experience
  kemampuanPribadi?: string;
  kemampuanIt?: string;
  pengalamanOrganisasi?: string;
  pengalamanKerja?: string;
  // Placements & Assessments
  penempatanRuangan: RoomPlacementItem[];
  ringkasanPenilaian: RingkasanPenilaian;
}

export interface DetailCalasResponse {
  errorStatus: boolean;
  message: string;
  data: DetailCalas;
}
