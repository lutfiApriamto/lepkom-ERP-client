import { lazy } from 'react';
import { ErrorPage } from '@/features/shared/error';
import LazyRoute from '@/components/layout/LazyRoute';
import { path } from '@/utils/consts';


const PenugasanDasboard = lazy(() => import('@/features/penugasan'))
const CheckUploadCalasPage = lazy(()=> import('@/features/penugasan/modules/check-upload-calas'))
const PenempatanRuanganAsistenPage = lazy(()=> import('@/features/penugasan/modules/penempatan-ruangan-asisten'))
const PenempatanRuanganCalasPage = lazy(()=> import('@/features/penugasan/modules/penempatan-ruangan-calas'))
const RiwayatPenilaianPage = lazy(()=> import('@/features/penugasan/modules/riwayat-penilaian'))

const DashboardPraktek = lazy(() => import('@/features/penugasan/modules/penilaian-praktek'));
const FormPraktek = lazy(() => import('@/features/penugasan/modules/form-penilaian-praktek'));
const DashboardProject = lazy(() => import('@/features/penugasan/modules/penilaian-project'));
const FormProject = lazy(() => import('@/features/penugasan/modules/form-penilaian-project'));
export const penugasanRoute = [
  {
    path: path.lepkom.penugasan.default, // untuk ke halaman menu penugasan
    element: <LazyRoute component={PenugasanDasboard} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penugasan.praktek.default,
    element: <LazyRoute component={DashboardPraktek} />,
    elementError: <ErrorPage />
  },

  {
    path: `${path.lepkom.penugasan.praktek.form}/:examSessionId/:calasId`,
    element: <LazyRoute component={FormPraktek} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penugasan.project.default,
    element: <LazyRoute component={DashboardProject} />,
    elementError: <ErrorPage />
  },
  {
    path: `${path.lepkom.penugasan.project.form}/:examSessionId/:calasId`,
    element: <LazyRoute component={FormProject} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penugasan.checkUploadJawaban.default, // untuk ke dashboard pengecekan upload jawaban
    element: <LazyRoute component={CheckUploadCalasPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penugasan.penempatanRuanganAsisten.default, // untuk ke dashboard penempatan ruangan asisten
    element: <LazyRoute component={PenempatanRuanganAsistenPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penugasan.penempatanRuanganCalas.default, // untuk ke dashboard penempatan ruangan asisten
    element: <LazyRoute component={PenempatanRuanganCalasPage} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.penugasan.historyPenilaian.default, // untuk ke dashboard penempatan ruangan asisten
    element: <LazyRoute component={RiwayatPenilaianPage} />,
    elementError: <ErrorPage />
  },
];
