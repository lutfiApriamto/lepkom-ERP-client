export interface AsistenHistoryItem {
  _id: string;
  createdAt: string;
  [key: string]: any;
}

export interface HistoryUploadMateri extends AsistenHistoryItem {
  namaMateri: string;
  tingkat: number;
  pertemuan: number;
}

export interface HistoryUploadSoal extends AsistenHistoryItem {
  judulSoal: string;
  jenisSoal: string;
}

export interface HistoryUploadQuestionCard extends AsistenHistoryItem {
  judul: string;
  tingkat: number;
  pertemuan: number;
}

export interface HistoryPengumuman extends AsistenHistoryItem {
  judul: string;
}

export interface ExamSessionRef {
  _id: string;
  sesi: number;
  tanggal: string;
}

export interface HistoryRuangan extends AsistenHistoryItem {
  ruangan: number;
  rolePenugasan: string;
  tanggal: string;
  jenisUjian: string;
}

export interface AsistenHistory {
  historyUploadMateri?: HistoryUploadMateri[];
  historyUploadSoal?: HistoryUploadSoal[];
  historyUploadQuestionCard?: HistoryUploadQuestionCard[];
  historyPengumuman?: HistoryPengumuman[];
  historyRuangan?: HistoryRuangan[];
}

export interface DetailAsisten {
  _id: string;
  idAsisten: string;
  npm: string;
  nama: string;
  email: string;
  kelasSaatIni: string;
  role: string;
  isActive: boolean;
  history: AsistenHistory;
}

export interface CalasRef {
  _id: string;
  namaCalas: string;
  npm: string;
}

export interface PenilaianItem {
  _id: string;
  calasRef: CalasRef;
  nilaiAkhir: number;
  status: string;
  jenisUjian: string;
  kriteria: Record<string, number>;
  deskripsi: string;
  createdAt: string;
}

export interface HistoryPenilaianResponse {
  errorStatus: boolean;
  message: string;
  data: PenilaianItem[];
  meta?: {
    page: number;
    limit: number;
    totalData: number;
    totalPage: number;
  };
}
