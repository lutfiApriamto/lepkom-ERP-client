import { lazy } from 'react';
import { ErrorPage } from '@/features/shared/error';
import LazyRoute from '@/components/layout/LazyRoute';
import { path } from '@/utils/consts';

const BiodataCalasDashboard = lazy(() => import('@/features/biodata'))
const PersonalPage = lazy(() => import('@/features/biodata/module/personal'));
const PendidikanPage = lazy(() => import('@/features/biodata/module/pendidikan'));
const KeluargaPage = lazy(() => import('@/features/biodata/module/keluarga'));
const BerkasPage = lazy(() => import('@/features/biodata/module/berkas'));
const HasilCalasPage = lazy(() => import('@/features/shared/hasil-calas'));

export const biodataRoute = [
  {
    path: path.lepkom.biodata.default,
    element: <LazyRoute component={BiodataCalasDashboard} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.biodata.personal.default,
    element: <LazyRoute component={PersonalPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.biodata.pendidikan.default,
    element: <LazyRoute component={PendidikanPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.biodata.keluarga.default,
    element: <LazyRoute component={KeluargaPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.biodata.berkas.default,
    element: <LazyRoute component={BerkasPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.biodata.hasil.default,
    element: <LazyRoute component={HasilCalasPage} />,
    elementError: <ErrorPage />
  }
];
