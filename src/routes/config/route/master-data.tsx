import { lazy } from 'react';
import { ErrorPage } from '@/features/shared/error';
import LazyRoute from '@/components/layout/LazyRoute';
import { path } from '@/utils/consts';

const MasterDataDashboard = lazy(() => import('@/features/master-data'));

const MasterDataAsisten = lazy(() => import('@/features/master-data/modules/asisten'));
const DetailAsisten = lazy(() => import('@/features/master-data/modules/detail-asisten'));
const MasterDataCalas = lazy(() => import('@/features/master-data/modules/calas'));
const DetailCalas = lazy(() => import('@/features/master-data/modules/detail-calas'));
const MasterDataRekrutmen = lazy(() => import('@/features/master-data/modules/rekrutmen'));
const MasterDataMateri = lazy(() => import('@/features/master-data/modules/materi'));
const ResetRequests = lazy(() => import('@/features/master-data/modules/reset-requests'));

const MasterDataQuestionCard = lazy(() => import('@/features/master-data/modules/question-card'));
const MasterDataSoal = lazy(() => import('@/features/master-data/modules/soal'));

export const masterDataRoute = [
  {
    path: path.lepkom.masterData.default,
    element: <LazyRoute component={MasterDataDashboard} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.masterData.asisten.default,
    element: <LazyRoute component={MasterDataAsisten} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.masterData.asisten.detailAsisten + '/:id',
    element: <LazyRoute component={DetailAsisten} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.masterData.calas.default,
    element: <LazyRoute component={MasterDataCalas} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.masterData.calas.detailCalas + '/:id',
    element: <LazyRoute component={DetailCalas} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.masterData.rekrutmen.default,
    element: <LazyRoute component={MasterDataRekrutmen} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.masterData.resetRequests.default,
    element: <LazyRoute component={ResetRequests} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.masterData.materi.default,
    element: <LazyRoute component={MasterDataMateri} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.masterData.soal.default,
    element: <LazyRoute component={MasterDataSoal} />,
    elementError: <ErrorPage />
  },
  {
    path: path.lepkom.masterData.questionCard.default,
    element: <LazyRoute component={MasterDataQuestionCard} />,
    elementError: <ErrorPage />
  }
];
