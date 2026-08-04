export function formatDate(date: string | Date): string {
  if (!date) return '-'
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
  }).format(new Date(date))
}

export function formatDateShort(date: string | Date): string {
  if (!date) return '-'
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateFull(date: string | Date): string {
  if (!date) return '-'
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}
