import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateRoomPlacement, useGetAvailablePJ, useGetAvailablePenilai } from '../api/penempatanAsisten.api';
import { usePenempatanAsistenStore } from '../store/usePenempatanAsistenStore';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import Select from 'react-select';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';

const schema = z.object({
  tanggal: z.string(),
  jenisUjian: z.string(),
  ruangan: z.number(),
  pjRuanganIds: z.array(z.string()).min(1, 'Minimal 1 PJ Ruangan'),
  penilaiIds: z.array(z.string()).optional(),
});

const RUANGAN_OPTIONS = [
  { value: 121, label: 'Ruangan 121' },
  { value: 122, label: 'Ruangan 122' },
  { value: 124, label: 'Ruangan 124' },
  { value: 125, label: 'Ruangan 125' },
];

const JENIS_UJIAN_OPTIONS = [
  { value: 'praktek', label: 'Praktek' },
  { value: 'project', label: 'Project' },
];

const FormEditPenempatan = () => {
  const { setOpenDialog } = useDialogStore();
  const { selectedRoomPlacement } = usePenempatanAsistenStore();
  const updateMutation = useUpdateRoomPlacement();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      tanggal: '',
      jenisUjian: '',
      ruangan: 0,
      pjRuanganIds: [] as string[],
      penilaiIds: [] as string[],
    },
  });

  useEffect(() => {
    if (selectedRoomPlacement) {
      const session = selectedRoomPlacement.examSessionRef;
      setValue('tanggal', dayjs(session.tanggal).format('YYYY-MM-DD'));
      setValue('jenisUjian', session.jenisUjian);
      setValue('ruangan', selectedRoomPlacement.ruangan);
      setValue('pjRuanganIds', selectedRoomPlacement.pjRuanganList?.map(p => p._id) || []);
      setValue('penilaiIds', selectedRoomPlacement.penilaiList?.map(p => p._id) || []);
    }
  }, [selectedRoomPlacement, setValue]);

  const watchTanggal = watch('tanggal');
  const watchJenisUjian = watch('jenisUjian');
  const watchRuangan = watch('ruangan');

  const { data: availablePJ, isFetching: fetchingPJ } = useGetAvailablePJ(watchTanggal, watchJenisUjian, watchRuangan);
  const { data: availablePenilai, isFetching: fetchingPenilai } = useGetAvailablePenilai(watchTanggal, watchJenisUjian, watchRuangan);

  if (!selectedRoomPlacement) return null;

  const onSubmit = (data: any) => {
    updateMutation.mutate({
      id: selectedRoomPlacement._id,
      payload: {
        pjRuanganIds: data.pjRuanganIds,
        penilaiIds: data.penilaiIds,
      },
    }, {
      onSuccess: () => {
        toast.success('Penempatan berhasil diperbarui');
        setOpenDialog('defaultDialog', false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Terjadi kesalahan saat memperbarui');
      }
    });
  };

  const getPjOptions = () => {
    let options = (availablePJ || []).map((pj) => ({
      value: pj._id,
      label: `${pj.nama} (${pj.npm})`,
    }));

    if (selectedRoomPlacement?.pjRuanganList) {
      const existing = selectedRoomPlacement.pjRuanganList.map((pj) => ({
        value: pj._id,
        label: `${pj.nama} (${pj.npm})`,
      }));
      const existingIds = new Set(existing.map(e => e.value));
      options = [...existing, ...options.filter(o => !existingIds.has(o.value))];
    }
    return options;
  };

  const getPenilaiOptions = () => {
    let options = (availablePenilai || []).map((penilai) => ({
      value: penilai._id,
      label: `${penilai.nama} (${penilai.npm})`,
    }));

    if (selectedRoomPlacement?.penilaiList) {
      const existing = selectedRoomPlacement.penilaiList.map((p) => ({
        value: p._id,
        label: `${p.nama} (${p.npm})`,
      }));
      const existingIds = new Set(existing.map(e => e.value));
      options = [...existing, ...options.filter(o => !existingIds.has(o.value))];
    }
    return options;
  };

  return (
    <form id="form-edit-penempatan" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Ujian</label>
          <Controller
            name="tanggal"
            control={control}
            render={({ field }) => (
              <input
                type="date"
                {...field}
                disabled
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Ujian</label>
          <Controller
            name="jenisUjian"
            control={control}
            render={({ field: { value } }) => (
              <Select
                options={JENIS_UJIAN_OPTIONS}
                value={JENIS_UJIAN_OPTIONS.find((c) => c.value === value)}
                isDisabled
                placeholder="Pilih Jenis"
              />
            )}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ruangan</label>
        <Controller
          name="ruangan"
          control={control}
          render={({ field: { value } }) => (
            <Select
              options={RUANGAN_OPTIONS}
              value={RUANGAN_OPTIONS.find((c) => c.value === value)}
              isDisabled
              placeholder="Pilih Ruangan"
            />
          )}
        />
      </div>

      <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-4 mt-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Penanggung Jawab Ruangan (PJ)
            {fetchingPJ && <span className="text-xs text-indigo-500 ml-2">Loading...</span>}
          </label>
          <Controller
            name="pjRuanganIds"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                isMulti
                options={getPjOptions()}
                value={getPjOptions().filter((c) => value?.includes(c.value))}
                onChange={(val) => onChange(val ? val.map((v) => v.value) : [])}
                placeholder="Pilih PJ Ruangan"
                isDisabled={fetchingPJ}
                noOptionsMessage={() => 'Tidak ada PJ yang tersedia di waktu ini'}
                menuPosition="fixed"
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              />
            )}
          />
          {errors.pjRuanganIds && (
            <p className="text-red-500 text-xs mt-1">{errors.pjRuanganIds.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Asisten Penilai
            {fetchingPenilai && <span className="text-xs text-indigo-500 ml-2">Loading...</span>}
          </label>
          <Controller
            name="penilaiIds"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                isMulti
                options={getPenilaiOptions()}
                value={getPenilaiOptions().filter((c) => value?.includes(c.value))}
                onChange={(val) => onChange(val ? val.map((v) => v.value) : [])}
                placeholder="Pilih Asisten Penilai"
                isDisabled={fetchingPenilai}
                noOptionsMessage={() => 'Tidak ada Penilai yang tersedia di waktu ini'}
                menuPosition="fixed"
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              />
            )}
          />
          {errors.penilaiIds && (
            <p className="text-red-500 text-xs mt-1">{errors.penilaiIds.message}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default FormEditPenempatan;
