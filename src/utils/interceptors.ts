import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { STORAGE_TOKEN_KEY, STORAGE_ROLE_KEY } from './consts';
import { getCookie, deleteCookie, setCookie } from './helpers/cookie';
import { useDialogStore } from '../hooks/globalStore';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const authAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // IMPORTANT: to send HttpOnly cookies for refresh token
});

// ─── Silent Refresh Queue ────────────────────────────────────────────────────
// Prevents infinite loops and race conditions when multiple requests fail at once
let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: any) => void }[] = [];
// Flag to prevent multiple session-expired dialogs from appearing
let isSessionExpiredDialogShown = false;

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Menampilkan dialog "Sesi berakhir" menggunakan AlertDialog (bukan window.alert).
 * Dialog hanya ditampilkan SEKALI — request 401 berikutnya dari queue akan di-reject
 * secara diam-diam tanpa menampilkan dialog baru.
 */
const showSessionExpiredDialog = (heading: string, body: string, detail: string, redirectRole: string) => {
  if (isSessionExpiredDialogShown) return; // Cegah dialog duplikat
  isSessionExpiredDialogShown = true;

  useDialogStore.getState().setAlert({
    type: 'error',
    text: {
      heading,
      body,
      detail,
    },
    onCloseCallback: () => {
      isSessionExpiredDialogShown = false;
      useDialogStore.getState().setOpenDialog('openAlert', false);
      useDialogStore.getState().resetAlert();
      window.location.href = `/login?role=${redirectRole}`;
    },
    hideCloseButton: false,
  });
  useDialogStore.getState().setOpenDialog('openAlert', true);
};

// ─── Request Interceptor ─────────────────────────────────────────────────────
const requestHandler = (request: InternalAxiosRequestConfig) => {
  const token = getCookie(STORAGE_TOKEN_KEY);
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
};

// ─── Response Interceptor ────────────────────────────────────────────────────
const responseHandler = (response: AxiosResponse) => {
  return response;
};

// ─── Error Response Interceptor ──────────────────────────────────────────────
const errorResponseHandler = async (error: AxiosError) => {
  const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

  // Hanya proses 401 Unauthorized, dan hanya jika request ini belum pernah di-retry
  if (!error.response || error.response.status !== 401 || originalRequest._retry) {
    return Promise.reject(error);
  }

  // Jangan intercept 401 dari proses login itu sendiri (salah password, dll)
  if (originalRequest.url?.includes('/login')) {
    return Promise.reject(error);
  }

  // Jangan intercept 401 dari proses refresh itu sendiri (infinite loop prevention)
  if (originalRequest.url?.includes('/refresh')) {
    return Promise.reject(error);
  }

  // Ambil pesan error dari response backend
  // Backend mengirim { message: "...", errors: [{ message: "...", code: 401 }] }
  const responseData = error.response.data as any;
  const errorMessage = responseData?.message 
    || responseData?.errors?.[0]?.message 
    || '';

  // ─── CASE 1: Token expired → coba silent refresh ────────────────────────
  // Gunakan .includes() agar tidak rapuh terhadap perubahan kecil di pesan backend
  const isTokenExpired = errorMessage.toLowerCase().includes('expired');

  if (isTokenExpired) {
    // Jika sudah ada proses refresh yang berjalan, tunggu hasilnya
    if (isRefreshing) {
      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return authAxios(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    // Baca role SEBELUM menghapus cookie apapun!
    // PENTING: lepkom_role menyimpan role spesifik seperti 'super_admin', 'admin', 'pj_soal_materi'
    // bukan literal 'asisten'. Jadi cek: apapun yang BUKAN 'calas' = asisten.
    const role = getCookie(STORAGE_ROLE_KEY) || 'calas';
    const isAsisten = role !== 'calas';
    const redirectRole = isAsisten ? 'asisten' : 'calas';
    const refreshUrl = isAsisten ? '/api/auth/asisten/refresh' : '/api/auth/calas/refresh';

    try {
      const res = await axios.post(
        `${BASE_URL}${refreshUrl}`,
        {},
        { withCredentials: true } // Must send HTTP-Only cookie for refresh
      );

      const newAccessToken = res.data?.data?.accessToken;

      if (!newAccessToken) {
        throw new Error('Server tidak mengembalikan access token baru');
      }

      // Simpan token baru di cookie
      setCookie(STORAGE_TOKEN_KEY, newAccessToken);

      // Update default header dan retry semua request yang gagal
      authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
      originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;

      processQueue(null, newAccessToken);
      return authAxios(originalRequest);
    } catch (refreshError: any) {
      // Refresh token juga gagal → sesi benar-benar habis
      processQueue(refreshError, null);

      // Bersihkan cookies SETELAH menyimpan role
      deleteCookie(STORAGE_TOKEN_KEY);
      deleteCookie(STORAGE_ROLE_KEY);

      const refreshData = refreshError.response?.data;
      const errMsg = refreshData?.message || refreshData?.errors?.[0]?.message || refreshError.message || 'Tidak diketahui';
      console.error('[Auth] Refresh token gagal:', refreshData || refreshError);

      showSessionExpiredDialog(
        'Sesi Telah Berakhir',
        'Sesi Anda telah berakhir karena tidak aktif terlalu lama. Silakan login kembali untuk melanjutkan.',
        `Detail: ${errMsg}`,
        redirectRole
      );

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }

  // ─── CASE 2: 401 tapi BUKAN token expired ───────────────────────────────
  // (Token tidak valid, dirusak, user dihapus, dll)
  // Baca role SEBELUM menghapus cookie
  const currentRole = getCookie(STORAGE_ROLE_KEY) || 'calas';
  const redirectRole = currentRole !== 'calas' ? 'asisten' : 'calas';

  // Bersihkan cookies SETELAH menyimpan role
  deleteCookie(STORAGE_TOKEN_KEY);
  deleteCookie(STORAGE_ROLE_KEY);

  const apiErrMsg = responseData?.message || responseData?.errors?.[0]?.message || 'Tidak diketahui';
  console.error('[Auth] 401 bukan expired:', error.response.data);

  showSessionExpiredDialog(
    'Sesi Tidak Valid',
    'Sesi Anda tidak valid. Silakan login kembali.',
    `Detail: ${apiErrMsg}`,
    redirectRole
  );

  return Promise.reject(error);
};

authAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorResponseHandler(error)
);

export default authAxios;
