import React from 'react';
import { GlobalBreadcrumb } from '@/components/breadcrumb';
import FactoryErrorDisplay from './FactoryErrorDisplay';

interface ContentLayoutProps {
  breadcrumbItems?: { label: string; href?: string }[];
  navigation?: { label: string; href?: string }[];
  error?: Error | null;
  children: React.ReactNode;
  px?: string;
  py?: string;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({
  navigation = [],
  error = null,
  children,
  px = 'px-10',
  py = 'py-8',
}) => {
  const isError = !!error;

  // Breadcrumb setter from outlet is removed to prevent infinite loop.
  // Breadcrumbs should be handled by individual pages via useBreadcrumbStore.

  return (
    <div
      className={`relative flex flex-1 flex-col overflow-hidden rounded-md bg-white shadow-md ${
        isError ? '' : `${px} ${py}`
      } h-full gap-4`}
    >
      {isError ? (
        <FactoryErrorDisplay error={error} />
      ) : (
        <>
          {navigation.length > 0 && (
            <GlobalBreadcrumb />
          )}
          {children}
        </>
      )}
    </div>
  );
};

export default ContentLayout;
