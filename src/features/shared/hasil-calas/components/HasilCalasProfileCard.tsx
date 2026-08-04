import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FiDownload, FiFileText, FiMapPin, FiMail, FiPhone, FiUser, FiXCircle, FiBriefcase, FiCode, FiStar, FiUsers, FiAward } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import type { DetailCalas } from '@/features/master-data/modules/detail-calas/types/detailCalas.types';
import { downloadDokumenSelf } from '../api/hasilCalas.api';

const getRejectionReason = (alasan?: string) => {
  switch (alasan) {
    case 'tidak_lolos_screening': return 'Tidak Lolos Screening Dokumen';
    case 'tidak_hadir_ujian': return 'Tidak Hadir Ujian';
    case 'tidak_lolos_penilaian': return 'Tidak Lolos Penilaian Ujian';
    case 'ditolak_rapat_akhir': return 'Ditolak pada Rapat Keputusan Akhir';
    case 'lainnya': return 'Alasan Lainnya';
    default: return 'Tidak Lolos';
  }
};

interface Props {
  calas: DetailCalas;
}

const HasilCalasProfileCard: React.FC<Props> = ({ calas }) => {
  const getTahapBadge = (tahap: string) => {
    let variant: any = 'secondary';
    if (tahap === 'selesai') variant = 'success';
    else if (tahap === 'keputusan_akhir') variant = 'warning';
    else variant = 'info';
    return <Badge variant={variant} className="uppercase text-[10px] tracking-wider px-2 py-0.5">Tahap: {tahap.replace(/_/g, ' ')}</Badge>;
  };

  const getHasilBadge = (hasil: string) => {
    let variant: any = 'secondary';
    if (hasil === 'lolos') variant = 'success';
    else if (hasil === 'tidak_lolos') variant = 'destructive';
    else variant = 'warning';
    return <Badge variant={variant} className="uppercase text-[10px] tracking-wider px-2 py-0.5">Status: {hasil.replace(/_/g, ' ')}</Badge>;
  };

  const renderFileButton = (label: string, jenisDokumen: string, fileUrl?: string) => {
    const handleDownload = async () => {
      if (!fileUrl) return;
      try {
        await downloadDokumenSelf(jenisDokumen);
      } catch (error) {
        toast.error('Gagal mengunduh dokumen');
      }
    };

    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        disabled={!fileUrl}
        className="w-full sm:w-auto flex items-center justify-center gap-2"
        title={!fileUrl ? 'File belum diunggah' : 'Unduh File'}
      >
        <FiDownload className="w-4 h-4" />
        {label}
      </Button>
    );
  };

  return (
    <Card className="w-full bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden" bodyClassName="p-0">
      {/* Header Banner */}
      <div className="h-32 bg-linear-to-r from-emerald-600 to-teal-700 w-full" />
      
      <div className="px-6 pb-6 pt-6 relative">
        {/* Info Area */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {calas.namaCalas}
            </h1>
            <div className="text-sm font-medium text-gray-500 mt-3 space-y-1">
              <p>NPM: <span className="text-gray-900">{calas.npm}</span></p>
              <p>Kelas: <span className="text-gray-900">{calas.kelas}</span></p>
              <p>Jurusan: <span className="text-gray-900">{calas.jurusan}</span></p>
              <p>Wilayah: <span className="text-gray-900">{calas.wilayah}</span></p>
              <p>IPK: <span className="text-gray-900 font-semibold">{calas.ipk ?? '-'}</span></p>
              <p>Asal Sekolah: <span className="text-gray-900">{calas.asalSekolah || '-'}</span></p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end mt-2 sm:mt-0">
            {getTahapBadge(calas.statusRekrutmen?.tahapSaatIni || 'registrasi')}
            {getHasilBadge(calas.statusRekrutmen?.hasil || 'proses')}
            {typeof calas.skorAkhirNilai === 'number' && (
              <Badge variant="default" className="bg-indigo-600 hover:bg-indigo-700 uppercase text-[10px] tracking-wider px-2 py-0.5">
                Skor: {calas.skorAkhirNilai.toFixed(2)}
              </Badge>
            )}
          </div>
        </div>

        {/* Banner Penolakan */}
        {calas.statusRekrutmen?.hasil === 'tidak_lolos' && (
          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-4">
            <div className="p-2.5 bg-red-100 rounded-full text-red-600 shrink-0">
              <FiXCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-red-900 mb-1">
                Calas Ditolak: {getRejectionReason(calas.statusRekrutmen?.alasanTidakLolos)}
              </h3>
              <p className="text-sm text-red-700 leading-relaxed">
                {calas.statusRekrutmen?.deskripsiPenolakan 
                  ? calas.statusRekrutmen.deskripsiPenolakan 
                  : "Calas ini tidak lolos dalam tahapan rekrutmen Asisten LEPKOM."}
              </p>
            </div>
          </div>
        )}

        {/* Demographics & Contact */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Informasi Personal</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><FiMail className="w-4 h-4" /></div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Email</p>
                <p className="text-sm font-medium text-gray-900 break-all">{calas.emailCalas}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><FiPhone className="w-4 h-4" /></div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">No. HP</p>
                <p className="text-sm font-medium text-gray-900">{calas.noHp || '-'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><FiUser className="w-4 h-4" /></div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">TTL & Kelamin</p>
                <p className="text-sm font-medium text-gray-900">
                  {calas.tempatLahir}, {calas.tanggalLahir} <br/>
                  <span className="text-gray-500 text-xs">({calas.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}) - {calas.agama}</span>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><FiMapPin className="w-4 h-4" /></div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Alamat</p>
                <p className="text-sm font-medium text-gray-900 line-clamp-2" title={calas.alamatLengkap}>{calas.alamatLengkap || '-'}</p>
              </div>
            </div>
          </div>
          
          <h3 className="text-sm font-semibold text-gray-900 mt-6 mb-4 uppercase tracking-wider">Informasi Keluarga</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><FiUsers className="w-4 h-4" /></div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Nama Ayah</p>
                <p className="text-sm font-medium text-gray-900">{calas.namaAyah || '-'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><FiUsers className="w-4 h-4" /></div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Nama Ibu</p>
                <p className="text-sm font-medium text-gray-900">{calas.namaIbu || '-'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><FiPhone className="w-4 h-4" /></div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">No. HP Orang Tua / Wali</p>
                <p className="text-sm font-medium text-gray-900">{calas.noHpOrtu || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Riwayat Kursus LEPKOM */}
        <div className="mt-6 border-t border-gray-100 pt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
            <FiAward className="w-4 h-4 text-gray-500" />
            Riwayat Kursus LEPKOM
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => {
              const courseVal = calas.kursusSemester?.[`semester${num}` as keyof typeof calas.kursusSemester];
              return (
                <div key={`sem${num}`} className="bg-white p-3 rounded-lg border border-gray-100 shadow-xs">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Semester {num}</p>
                  <p className="text-sm font-medium text-gray-900">{courseVal || '-'}</p>
                </div>
              );
            })}
          </div>
          {calas.isKursusDelete && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-lg flex items-start gap-3">
              <div className="p-1.5 bg-orange-100 rounded-md text-orange-600 shrink-0">
                <FiXCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-orange-900 mb-0.5">Terdapat riwayat kursus yang dihapus</p>
                <p className="text-sm text-orange-700">{calas.SemesterKursusDel}</p>
              </div>
            </div>
          )}
        </div>

        {/* Kualifikasi & Pengalaman */}
        <div className="mt-6 border-t border-gray-100 pt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
            <FiBriefcase className="w-4 h-4 text-gray-500" />
            Kualifikasi & Pengalaman
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2 text-indigo-700 font-medium">
                <FiStar className="w-4 h-4" />
                <h4>Kemampuan Pribadi</h4>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {calas.kemampuanPribadi || <span className="text-gray-400 italic">Tidak ada data</span>}
              </p>
            </div>
            
            <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2 text-teal-700 font-medium">
                <FiCode className="w-4 h-4" />
                <h4>Kemampuan IT</h4>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {calas.kemampuanIt || <span className="text-gray-400 italic">Tidak ada data</span>}
              </p>
            </div>

            <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2 text-orange-700 font-medium">
                <FiUsers className="w-4 h-4" />
                <h4>Pengalaman Organisasi</h4>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {calas.pengalamanOrganisasi || <span className="text-gray-400 italic">Tidak ada data</span>}
              </p>
            </div>

            <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2 text-rose-700 font-medium">
                <FiBriefcase className="w-4 h-4" />
                <h4>Pengalaman Kerja</h4>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {calas.pengalamanKerja || <span className="text-gray-400 italic">Tidak ada data</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Berkas & Dokumen */}
        <div className="mt-6 border-t border-gray-100 pt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
            <FiFileText className="w-4 h-4 text-gray-500" />
            Berkas Dokumen
          </h3>
          <div className="flex flex-wrap gap-3">
            {renderFileButton('Unduh CV', 'cv', calas.cv)}
            {renderFileButton('Unduh KRS', 'krs', calas.krs)}
            {renderFileButton('Unduh Rangkuman Nilai', 'rangkumanNilai', calas.rangkumanNilai)}
            {renderFileButton('Unduh Jawaban Praktek', 'jawabanPraktek', calas.jawabanPraktek)}
            {renderFileButton('Unduh Jawaban Project', 'jawabanProject', calas.jawabanProject)}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HasilCalasProfileCard;
