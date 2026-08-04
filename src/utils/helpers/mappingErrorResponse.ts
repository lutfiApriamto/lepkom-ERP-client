import { AxiosError } from 'axios';

/**
 * Mengekstrak pesan error dari response Axios berdasarkan standar backend Lepkom.
 * Backend merespons format: { status: "error", errorType: "BadRequest", message: "..." }
 */
export const extractErrorMessage = (err: unknown, defaultMsg = 'Terjadi kesalahan pada server'): string => {
  if (err && typeof err === 'object' && 'isAxiosError' in err) {
    const axiosError = err as AxiosError<{ message?: string; errors?: { message: string }[] }>;
    const data = axiosError.response?.data;
    
    // Jika AJV Backend mengirim array of errors
    if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
       return data.errors[0]?.message || defaultMsg;
    }

    // Jika Backend mengirim spesifik properti message
    if (data?.message) {
      return data.message;
    }

    return axiosError.message || defaultMsg;
  }
  
  if (err instanceof Error) {
    return err.message;
  }
  
  return defaultMsg;
};
