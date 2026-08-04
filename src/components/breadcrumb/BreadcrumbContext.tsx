import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface BreadcrumbContextType {
  breadcrumbItems: { label: string; href?: string }[];
}

const BreadcrumbContext = createContext<BreadcrumbContextType>({ breadcrumbItems: [] });

export const useBreadcrumb = () => useContext(BreadcrumbContext);

export const BreadcrumbProvider: React.FC<{
  items: { label: string; href?: string }[];
  children: ReactNode;
}> = ({ items, children }) => {
  return (
    <BreadcrumbContext.Provider value={{ breadcrumbItems: items }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
