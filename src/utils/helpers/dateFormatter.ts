import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/id';

dayjs.extend(utc);
dayjs.locale('id');

export const dateFormatFromUnix = (unix: number, format = 'DD-MM-YYYY') => {
  return dayjs.unix(unix).format(format);
};

export const dateFormatFromString = (dateString: string | Date | null | undefined, format = 'DD-MM-YYYY') => {
  if (!dateString) return '';
  return dayjs(dateString).format(format);
};

export const customFormatDateLong = (dateString: string | Date | null | undefined) => {
  if (!dateString) return '';
  // Menghasilkan format: Senin, 12 Agustus 2026
  return dayjs(dateString).format('dddd, D MMMM YYYY');
};

export const customFormatDateTime = (dateString: string | Date | null | undefined) => {
  if (!dateString) return '';
  return dayjs(dateString).format('DD MMM YYYY, HH:mm');
};
