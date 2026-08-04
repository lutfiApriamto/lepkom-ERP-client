export type GradeLetter = 'A' | 'B' | 'C' | 'D' | 'E';
export type PassStatus = 'Lulus' | 'Tidak Lulus';

/**
 * Mengonversi nilai angka murni (0-100) menjadi Huruf Mutu Standar Lepkom.
 * (Range nilai ini dapat disesuaikan kembali dengan aturan baku jika ada perubahan)
 * A : >= 85
 * B : 70 - 84
 * C : 55 - 69
 * D : 40 - 54
 * E : < 40
 */
export const calculateGradeLetter = (score: number): GradeLetter => {
  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  if (score >= 55) return 'C';
  if (score >= 40) return 'D';
  return 'E';
};

/**
 * Mengonversi nilai angka murni menjadi status kelulusan mutlak.
 * Secara default, ambang batas kelulusan (passing grade) untuk Asisten Lepkom diasumsikan >= 70 (Minimal B).
 */
export const calculatePassStatus = (score: number, passingGrade: number = 70): PassStatus => {
  return score >= passingGrade ? 'Lulus' : 'Tidak Lulus';
};
