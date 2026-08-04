import type { ErrorInfo } from 'react';

const loggingError = (error: Error, info?: ErrorInfo | Record<string, unknown>) => {
  // TODO: Integrasi dengan layanan eksternal seperti Sentry atau DataDog jika diperlukan di masa depan
  console.error(error, 'error', info, 'info');
};

export default loggingError;
