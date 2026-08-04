import React, { useState, useEffect, Suspense, isValidElement } from 'react';
import type { ComponentType } from 'react';
import LoadingOverlay from './LoadingOverlay';

interface LazyRouteProps {
  component: ComponentType<any>;
  delay?: number;
  fallback?: React.ReactNode | ComponentType<any>;
}

const LazyRoute: React.FC<LazyRouteProps> = ({ component: Component, delay = 0, fallback }) => {
  const [showFallback, setShowFallback] = useState(delay === 0);

  useEffect(() => {
    if (delay === 0) return;
    const id = setTimeout(() => setShowFallback(true), delay);
    return () => clearTimeout(id);
  }, [delay]);

  const resolveFallback = () => {
    if (!fallback) return <LoadingOverlay />;
    if (isValidElement(fallback)) return fallback;
    const FallbackComponent = fallback as ComponentType<any>;
    return <FallbackComponent />;
  };

  const suspenseFallback = showFallback ? resolveFallback() : null;

  return (
    <Suspense fallback={suspenseFallback}>
      <Component />
    </Suspense>
  );
};

export default LazyRoute;
