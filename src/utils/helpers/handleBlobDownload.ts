/**
 * Trigger browser download for a Blob.
 */
export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const getFilenameFromContentDisposition = (contentDisposition?: string): string | undefined => {
  if (!contentDisposition) return undefined;
  const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
  return match?.[1]?.replace(/['"]/g, '')?.trim();
};
