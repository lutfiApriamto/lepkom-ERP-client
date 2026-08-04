import { useEffect, useState } from 'react';

/**
 * Menunda pembaruan state selama durasi tertentu.
 * Sangat berguna untuk mencegah input pencarian terus-menerus memanggil API saat pengguna sedang mengetik.
 *
 * @param value Nilai yang ingin di-debounce
 * @param delay Waktu tunda dalam milidetik (default: 300)
 */
const useDebouncedValue = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebouncedValue;
