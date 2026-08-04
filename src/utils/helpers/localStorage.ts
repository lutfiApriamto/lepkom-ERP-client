/**
 * Utility function untuk menyimpan data ke LocalStorage dengan otomatis melakukan stringify object/array.
 * @param key Kunci string unik untuk item di LocalStorage
 * @param value Nilai berupa string, number, boolean, array, atau object bebas
 */
export const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    window.localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Gagal menyimpan ${key} ke LocalStorage:`, error);
  }
};

/**
 * Utility function untuk mengambil dan mem-parse data JSON dari LocalStorage.
 * @param key Kunci string unik dari item
 * @param defaultValue Nilai kembalian default jika key tidak ditemukan atau JSON gagal di-parse
 * @returns Data dalam bentuk tipe aslinya (Object/Array/dll)
 */
export const getLocalStorage = <T>(key: string, defaultValue: T | null = null): T | null => {
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Gagal mengambil/parse ${key} dari LocalStorage:`, error);
    return defaultValue;
  }
};

/**
 * Menghapus spesifik item dari LocalStorage
 */
export const removeLocalStorage = (key: string): void => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Gagal menghapus ${key} dari LocalStorage:`, error);
  }
};

/**
 * Mengosongkan seluruh data dari LocalStorage domain aplikasi ini
 * HATI-HATI PENGGUNAANNYA!
 */
export const clearLocalStorage = (): void => {
  try {
    window.localStorage.clear();
  } catch (error) {
    console.error('Gagal mengosongkan LocalStorage:', error);
  }
};
