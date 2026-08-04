import { Loader2 } from 'lucide-react';
import ContentLayout from './ContentLayout/ContentLayout';

const LoadingOverlay = () => (
  <ContentLayout>
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-lepkom-blue dark:text-lepkom-blue/80" />
    </div>
  </ContentLayout>
);

export default LoadingOverlay;
