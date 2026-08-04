/**
 * Konstanta batas ukuran file dalam satuan Bytes
 */
export const MAX_FILE_SIZE = {
  '1MB': 1 * 1024 * 1024,
  '2MB': 2 * 1024 * 1024,
  '5MB': 5 * 1024 * 1024,
  '10MB': 10 * 1024 * 1024,
};

/**
 * Validasi ukuran file sebelum dikirim ke backend
 * @param file - File yang diunggah pengguna
 * @param maxSizeBytes - Batas maksimum dalam Bytes (Disarankan memakai konstanta MAX_FILE_SIZE)
 * @returns { isValid: boolean, message?: string }
 */
export const validateFileSize = (file: File, maxSizeBytes: number = MAX_FILE_SIZE['5MB']) => {
  if (file.size > maxSizeBytes) {
    const sizeInMB = maxSizeBytes / (1024 * 1024);
    return { isValid: false, message: `Ukuran file terlalu besar. Maksimal ${sizeInMB}MB.` };
  }
  return { isValid: true };
};

/**
 * Validasi tipe (ekstensi / MIME type) file
 * @param file - File yang diunggah pengguna
 * @param allowedTypes - Array string MIME types (contoh: ['application/pdf', 'image/jpeg'])
 * @returns { isValid: boolean, message?: string }
 */
export const validateFileType = (file: File, allowedTypes: string[]) => {
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, message: `Tipe file tidak didukung. Harap unggah format yang sesuai.` };
  }
  return { isValid: true };
};
