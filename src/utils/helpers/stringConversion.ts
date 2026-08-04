export const splitCommaSeparatedValues = (value?: string | null): string[] => {
  if (value == null || value === '') return [];
  
  return String(value)
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
};

export const toTitleCase = (str?: string | null): string => {
  if (str == null || str === '') return '';
  return String(str)
    .trim()
    .split(/\s+/)
    .map(word => {
      if (word.length <= 2 && word === word.toUpperCase()) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

export const underScoreToTitleCase = (str?: string | null): string => {
  if (str == null || str === '') return '';
  const spaced = String(str).trim().replace(/_+/g, ' ');
  return toTitleCase(spaced);
};
