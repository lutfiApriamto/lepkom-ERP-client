import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateCalasPlacement, useGetAvailableCalas } from '../api/penempatanCalas.api';
import { usePenempatanCalasStore } from '../store/usePenempatanCalasStore';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import Select from 'react-select';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';

const schema = z.object({
  calasIds: z.array(z.string()),
});

const FormAturCalas = () => {
  const { setOpenDialog } = useDialogStore();
  const { selectedRoomPlacement } = usePenempatanCalasStore();
  const updateMutation = useUpdateCalasPlacement();

  const {
    control,
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      calasIds: [] as string[],
    },
  });

  useEffect(() => {
    if (selectedRoomPlacement) {
      setValue('calasIds', selectedRoomPlacement.calasList?.map(c => c._id) || []);
    }
  }, [selectedRoomPlacement, setValue]);

  const tanggal = selectedRoomPlacement ? dayjs(selectedRoomPlacement.examSessionRef.tanggal).format('YYYY-MM-DD') : '';
  const jenisUjian = selectedRoomPlacement?.examSessionRef.jenisUjian || '';
  const ruangan = selectedRoomPlacement?.ruangan || 0;

  const { data: availableCalas, isFetching } = useGetAvailableCalas(tanggal, jenisUjian, ruangan);

  if (!selectedRoomPlacement) return null;

  const onSubmit = (data: any) => {
    updateMutation.mutate({
      id: selectedRoomPlacement._id,
      payload: {
        calasIds: data.calasIds,
      },
    }, {
      onSuccess: () => {
        toast.success('Penempatan calas berhasil diperbarui');
        setOpenDialog('defaultDialog', false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Terjadi kesalahan saat memperbarui');
      }
    });
  };

  const getCalasOptions = () => {
    let options = (availableCalas || []).map((calas) => ({
      value: calas._id,
      label: `${calas.namaCalas} (${calas.npm}) - ${calas.kelas}`,
    }));

    if (selectedRoomPlacement?.calasList) {
      const existing = selectedRoomPlacement.calasList.map((c) => ({
        value: c._id,
        label: `${c.namaCalas} (${c.npm}) - ${c.kelas}`,
      }));
      const existingIds = new Set(existing.map(e => e.value));
      options = [...existing, ...options.filter(o => !existingIds.has(o.value))];
    }
    return options;
  };

  return (
    <form id="form-atur-calas" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 flex flex-col gap-1 mb-4">
        <span className="text-sm font-semibold text-blue-900">
          Ujian {selectedRoomPlacement.examSessionRef.jenisUjian.toUpperCase()} - {dayjs(selectedRoomPlacement.examSessionRef.tanggal).format('DD MMMM YYYY')}
        </span>
        <span className="text-xs text-blue-700">Ruangan: {selectedRoomPlacement.ruangan}</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Daftar Calon Asisten
          {isFetching && <span className="text-xs text-indigo-500 ml-2">Loading...</span>}
        </label>
        <Controller
          name="calasIds"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              isMulti
              options={getCalasOptions()}
              value={getCalasOptions().filter((c) => value?.includes(c.value))}
              onChange={(val) => onChange(val ? val.map((v) => v.value) : [])}
              placeholder="Pilih Calon Asisten..."
              isDisabled={isFetching}
              noOptionsMessage={() => 'Tidak ada Calon Asisten yang tersedia'}
              className="react-select-container"
              classNamePrefix="react-select"
              menuPosition="fixed"
              menuPortalTarget={document.body}
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            />
          )}
        />
        <p className="text-xs text-gray-500 mt-2">
          Hanya menampilkan Calon Asisten yang berstatus aktif dan belum dijadwalkan di ruangan lain pada tanggal ini.
        </p>
      </div>
    </form>
  );
};

export default FormAturCalas;
