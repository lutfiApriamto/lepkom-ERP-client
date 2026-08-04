import React from 'react';
import { Link } from 'react-router-dom';
import { LuChevronRight } from 'react-icons/lu';
import { FiHome } from 'react-icons/fi';
import { useBreadcrumbStore } from '@/hooks/globalStore';

const GlobalBreadcrumb: React.FC = () => {
  const { breadcrumbItems: links, isClickAble: globalClickable } = useBreadcrumbStore();

  if (!links || links.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className="w-full mb-6">
      <ol className="flex items-center w-full overflow-x-auto whitespace-nowrap scrollbar-hide pb-2 -mb-2 gap-1.5 sm:gap-2 text-sm text-gray-500">
        {links.map((item, idx) => {
          const isLast = idx === links.length - 1;
          const clickable = item.isClickAble !== false && globalClickable && !isLast;
          const isFirst = idx === 0;

          // Render Icon for the first item if it's Dashboard/Home
          const showHomeIcon = isFirst && (item.label.toLowerCase() === 'dashboard' || item.label.toLowerCase() === 'home');

          return (
            <li key={idx} className="flex items-center">
              {clickable && item.path ? (
                <Link
                  to={item.path}
                  className="flex items-center gap-1.5 transition-colors hover:text-lepkom-green hover:underline focus:outline-none focus:text-lepkom-green"
                >
                  {showHomeIcon && <FiHome className="w-4 h-4" />}
                  <span className={showHomeIcon ? "hidden sm:inline" : ""}>{item.label}</span>
                </Link>
              ) : (
                <span
                  className={`flex items-center gap-1.5 ${
                    isLast ? 'font-semibold text-lepkom-green' : 'text-gray-400 cursor-default'
                  }`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {showHomeIcon && <FiHome className="w-4 h-4" />}
                  <span className={showHomeIcon ? "hidden sm:inline" : ""}>{item.label}</span>
                </span>
              )}
              {!isLast && (
                <LuChevronRight className="w-4 h-4 mx-1.5 sm:mx-2 text-gray-400 flex-shrink-0" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default GlobalBreadcrumb;
