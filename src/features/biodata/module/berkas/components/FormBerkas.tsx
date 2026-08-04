import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { useGetMyBiodata, useUpdateBiodata, useDeleteTempDokumen } from '../../../shared/api/biodata.api';
import FileUploader from './FileUploader';
import { useBerkasStore } from '../store/useBerkasStore';

const FormBerkas = () => {
  const { data: biodataResponse, isLoading: isLoadingBiodata } = useGetMyBiodata();
  const biodata = biodataResponse?.data;
  
  const updateMutation = useUpdateBiodata();
  const deleteTempMutation = useDeleteTempDokumen();
  
  const { 
    isEditing, setIsEditing,
    tempCv, setTempCv,
    tempKrs, setTempKrs,
    tempRangkumanNilai, setTempRangkumanNilai,
    resetState
  } = useBerkasStore();

  const { setAlert, resetAlert } = useDialogStore();

  const hasUnsavedChanges = tempCv || tempKrs || tempRangkumanNilai;

  const handleEdit = () => setIsEditing(true);

  const handleCancelClick = () => {
    if (hasUnsavedChanges) {
      setAlert({
        type: 'warning',
        text: {
          heading: 'Batalkan Perubahan?',
          body: 'Anda memiliki file yang sudah diunggah tetapi belum disimpan. Jika Anda membatalkannya, file tersebut akan dihapus.',
        },
        btnTrue: { text: 'Ya, Batalkan' },
        btnFalse: { text: 'Kembali' },
        onTrueCallback: async () => {
          try {
            if (tempCv) await deleteTempMutation.mutateAsync(tempCv);
            if (tempKrs) await deleteTempMutation.mutateAsync(tempKrs);
            if (tempRangkumanNilai) await deleteTempMutation.mutateAsync(tempRangkumanNilai);
            
            resetState();
            resetAlert();
          } catch (error) {
            toast.error('Terjadi kesalahan saat membatalkan perubahan');
            resetAlert();
          }
        }
      });
    } else {
      setIsEditing(false);
    }
  };

  const handleSave = async () => {
    const payload: Record<string, string> = {};
    if (tempCv) payload.cv = tempCv;
    if (tempKrs) payload.krs = tempKrs;
    if (tempRangkumanNilai) payload.rangkumanNilai = tempRangkumanNilai;

    if (Object.keys(payload).length === 0) {
      setIsEditing(false);
      return;
    }

    try {
      await updateMutation.mutateAsync(payload);
      toast.success('Berkas berhasil diperbarui');
      resetState();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Terjadi kesalahan saat menyimpan berkas');
    }
  };

  if (isLoadingBiodata) {
    return <div className="p-8 text-center text-gray-500">Memuat data...</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-100 px-6 py-5 flex items-center justify-between bg-gray-50/50">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Ubah Berkas Dokumen</h2>
          <p className="text-sm text-gray-500 mt-1">Pastikan dokumen yang diunggah sesuai dengan persyaratan rekrutmen LEPKOM.</p>
        </div>

        <div>
          {!isEditing ? (
            <Button onClick={handleEdit} className="bg-teal-600 hover:bg-teal-700">
              <FiEdit2 className="w-4 h-4 mr-2" />
              Edit Berkas
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleCancelClick}
                className="text-gray-600 border-gray-300 hover:bg-gray-50"
                disabled={updateMutation.isPending || deleteTempMutation.isPending}
              >
                <FiX className="w-4 h-4 mr-2" />
                Batal
              </Button>
              <Button
                onClick={handleSave}
                className="bg-teal-600 hover:bg-teal-700"
                disabled={updateMutation.isPending || (!tempCv && !tempKrs && !tempRangkumanNilai)}
              >
                <FiSave className="w-4 h-4 mr-2" />
                {updateMutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <FileUploader
            jenisDokumen="cv"
            label="Curriculum Vitae (CV)"
            description="Unggah CV terbaru Anda."
            existingUrl={biodata?.cv}
            isEditing={isEditing}
            tempUrl={tempCv}
            onTempUrlChange={setTempCv}
          />
          <FileUploader
            jenisDokumen="krs"
            label="Kartu Rencana Studi (KRS)"
            description="Unggah KRS semester berjalan (saat ini)."
            existingUrl={biodata?.krs}
            isEditing={isEditing}
            tempUrl={tempKrs}
            onTempUrlChange={setTempKrs}
          />
          <FileUploader
            jenisDokumen="rangkumanNilai"
            label="Daftar Nilai (DNS)"
            description="Unggah Daftar Nilai Semester (DNS) dari semester awal hingga saat ini."
            existingUrl={biodata?.rangkumanNilai}
            isEditing={isEditing}
            tempUrl={tempRangkumanNilai}
            onTempUrlChange={setTempRangkumanNilai}
          />
        </div>
      </div>
    </div>
  );
};

export default FormBerkas;
