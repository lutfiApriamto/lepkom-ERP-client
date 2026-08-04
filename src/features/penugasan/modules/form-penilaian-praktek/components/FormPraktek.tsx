import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSubmitPenilaianPraktek } from '../api/penilaianPraktek.api';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { useEffect } from 'react';
import { path } from '@/utils/consts';
import { FiSave, FiArrowLeft, FiUser } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const schema = z.object({
  konsep: z.number().min(0).max(100),
  eksekusi: z.number().min(0).max(100),
  analisa: z.number().min(0).max(100),
  klarifikasi: z.number().min(0).max(100),
  deskripsi: z.string().min(5, 'Deskripsi minimal 5 karakter'),
});

const FormPraktek = () => {
  const { examSessionId, calasId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { setBreadcrumbItems } = useBreadcrumbStore();
  const submitMutation = useSubmitPenilaianPraktek();

  const calas = location.state?.calas;

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Penugasan', path: path.lepkom.penugasan.default },
      { label: 'Penilaian Praktek', path: path.lepkom.penugasan.praktek.default },
      { label: 'Form Penilaian Praktek', path: '#' },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      konsep: 0,
      eksekusi: 0,
      analisa: 0,
      klarifikasi: 0,
      deskripsi: '',
    },
  });

  const watchValues = watch();
  const totalScore = (
    (Number(watchValues.konsep) || 0) +
    (Number(watchValues.eksekusi) || 0) +
    (Number(watchValues.analisa) || 0) +
    (Number(watchValues.klarifikasi) || 0)
  ) / 4;

  const handleScoreInput = (value: string, onChange: (val: number | string) => void) => {
    if (value === '') return onChange('');
    const num = parseInt(value, 10);
    if (isNaN(num)) return;
    if (num < 0) return onChange(0);
    if (num > 100) return onChange(100);
    onChange(num);
  };

  const onSubmit = (data: any) => {
    if (!examSessionId || !calasId) {
      toast.error('Data parameter tidak lengkap!');
      return;
    }

    submitMutation.mutate({
      calasId,
      examSessionId,
      deskripsi: data.deskripsi,
      kriteria: {
        konsep: Number(data.konsep),
        eksekusi: Number(data.eksekusi),
        analisa: Number(data.analisa),
        klarifikasi: Number(data.klarifikasi),
      }
    }, {
      onSuccess: () => {
        toast.success('Nilai berhasil disimpan!');
        navigate(path.lepkom.penugasan.praktek.default);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Gagal menyimpan nilai');
      }
    });
  };

  return (
    <ContentLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(path.lepkom.penugasan.praktek.default)} className="h-10 w-10 p-0 rounded-full hover:bg-lepkom-green hover:text-white transition-colors">
            <FiArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Form Penilaian Praktek</h1>
            <p className="text-sm text-gray-500">Berikan penilaian yang objektif kepada Calon Asisten.</p>
          </div>
        </div>

        {calas && (
          <Card className="p-4 bg-gradient-to-r from-green-50 to-white border-l-4 border-l-lepkom-green shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white shadow-sm p-3 rounded-full text-lepkom-green border border-green-100">
                <FiUser className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{calas.namaCalas}</h3>
                <p className="text-sm text-gray-600">NPM: {calas.npm} • Kelas: {calas.kelas} • Jurusan: {calas.jurusan}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`${path.lepkom.masterData.calas.detailCalas}/${calas._id}`, '_blank')}
              className="mt-2 text-lepkom-green border-lepkom-green hover:bg-lepkom-green hover:text-white transition-colors"
            >
              Lihat Detail
            </Button>
          </Card>
        )}

        <Card className="p-6 shadow-sm border-gray-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Konsep */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-lepkom-green transition-colors">
                  1. Konsep (0-100)
                </label>
                <div className="relative">
                  <Controller
                    name="konsep"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        {...field}
                        onChange={(e) => handleScoreInput(e.target.value, field.onChange)}
                        value={field.value === 0 && watchValues.konsep !== 0 ? '' : field.value}
                        className={`w-full border rounded-xl px-4 py-3 bg-gray-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-lepkom-green/20 ${errors.konsep ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-lepkom-green'}`}
                        placeholder="Nilai Konsep"
                      />
                    )}
                  />
                  {Number(watchValues.konsep) > 0 && !errors.konsep && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-lepkom-green"></div>
                  )}
                </div>
                {errors.konsep && <p className="text-red-500 text-xs mt-1.5">{errors.konsep.message as string}</p>}
              </div>

              {/* Eksekusi */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-lepkom-green transition-colors">
                  2. Eksekusi (0-100)
                </label>
                <div className="relative">
                  <Controller
                    name="eksekusi"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        {...field}
                        onChange={(e) => handleScoreInput(e.target.value, field.onChange)}
                        value={field.value === 0 && watchValues.eksekusi !== 0 ? '' : field.value}
                        className={`w-full border rounded-xl px-4 py-3 bg-gray-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-lepkom-green/20 ${errors.eksekusi ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-lepkom-green'}`}
                        placeholder="Nilai Eksekusi"
                      />
                    )}
                  />
                  {Number(watchValues.eksekusi) > 0 && !errors.eksekusi && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-lepkom-green"></div>
                  )}
                </div>
                {errors.eksekusi && <p className="text-red-500 text-xs mt-1.5">{errors.eksekusi.message as string}</p>}
              </div>

              {/* Analisa */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-lepkom-green transition-colors">
                  3. Analisa (0-100)
                </label>
                <div className="relative">
                  <Controller
                    name="analisa"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        {...field}
                        onChange={(e) => handleScoreInput(e.target.value, field.onChange)}
                        value={field.value === 0 && watchValues.analisa !== 0 ? '' : field.value}
                        className={`w-full border rounded-xl px-4 py-3 bg-gray-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-lepkom-green/20 ${errors.analisa ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-lepkom-green'}`}
                        placeholder="Nilai Analisa"
                      />
                    )}
                  />
                  {Number(watchValues.analisa) > 0 && !errors.analisa && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-lepkom-green"></div>
                  )}
                </div>
                {errors.analisa && <p className="text-red-500 text-xs mt-1.5">{errors.analisa.message as string}</p>}
              </div>

              {/* Klarifikasi */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-lepkom-green transition-colors">
                  4. Klarifikasi (0-100)
                </label>
                <div className="relative">
                  <Controller
                    name="klarifikasi"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        {...field}
                        onChange={(e) => handleScoreInput(e.target.value, field.onChange)}
                        value={field.value === 0 && watchValues.klarifikasi !== 0 ? '' : field.value}
                        className={`w-full border rounded-xl px-4 py-3 bg-gray-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-lepkom-green/20 ${errors.klarifikasi ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-lepkom-green'}`}
                        placeholder="Nilai Klarifikasi"
                      />
                    )}
                  />
                  {Number(watchValues.klarifikasi) > 0 && !errors.klarifikasi && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-lepkom-green"></div>
                  )}
                </div>
                {errors.klarifikasi && <p className="text-red-500 text-xs mt-1.5">{errors.klarifikasi.message as string}</p>}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-5 rounded-xl flex justify-between items-center border border-gray-200 shadow-inner">
                <span className="font-semibold text-gray-600">Total Skor Rata-Rata Sementara:</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-lepkom-green">{totalScore.toFixed(2)}</span>
                  <span className="text-sm font-medium text-gray-500">/ 100</span>
                </div>
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-lepkom-green transition-colors">
                Deskripsi Penilai
              </label>
              <Controller
                name="deskripsi"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={4}
                    className={`w-full border rounded-xl px-4 py-3 bg-gray-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-lepkom-green/20 resize-none ${errors.deskripsi ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-lepkom-green'}`}
                    placeholder="Berikan catatan, tanggapan, atau evaluasi kualitatif mengenai performa ujian praktek calas..."
                  />
                )}
              />
              {errors.deskripsi && <p className="text-red-500 text-xs mt-1.5">{errors.deskripsi.message as string}</p>}
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => navigate('/lepkom/penugasan/penilaian-praktek')} className="rounded-xl px-6">
                Batal
              </Button>
              <Button type="submit" disabled={submitMutation.isPending} className="bg-lepkom-green hover:bg-lepkom-green/90 text-white gap-2 rounded-xl px-8 shadow-md hover:shadow-lg transition-all">
                <FiSave /> {submitMutation.isPending ? 'Menyimpan...' : 'Simpan Penilaian'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </ContentLayout>
  );
};

export default FormPraktek;
