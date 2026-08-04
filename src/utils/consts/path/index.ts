import { lepkomPaths } from './lepkom';
import { authPaths } from './features/auth';

export const path = {
  baseUrl: import.meta.env.VITE_API_URL,
  default: '/',
  auth: authPaths,
  lepkom: lepkomPaths
};
