import React from 'react';
import { NavLink } from 'react-router-dom';
import type { IconType } from 'react-icons';

interface NavigationItemProps {
  item: { label: string; path: string; icon: IconType | any };
  isOpen: boolean;
  isMobile?: boolean;
  onClose: () => void;
  'data-cy'?: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ item, isOpen, isMobile, onClose, ...props }) => {
  return (
    <NavLink
      end={item.path === '/'}
      to={item.path}
      onClick={isMobile ? onClose : undefined}
      data-cy={props['data-cy']}
      title={!isOpen ? item.label : undefined} // Tooltip when collapsed
      className={({ isActive }) =>
        `group flex items-center rounded-lg px-3 py-2.5 transition-all duration-200 ease-in-out hover:translate-x-1 ${
          isOpen ? 'justify-start' : 'justify-center'
        } ${
          isActive
            ? 'bg-lepkom-green/10 text-lepkom-green font-semibold shadow-sm border-l-4 border-lepkom-green rounded-l-none'
            : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800'
        }`
      }
    >
      <div className={`flex items-center transition-colors ${isOpen ? 'mr-3' : 'mr-0'}`}>
        <item.icon className="h-[22px] w-[22px]" />
      </div>
      {isOpen && (
        <span className="text-[15px] whitespace-nowrap">
          {item.label}
        </span>
      )}
    </NavLink>
  );
};

export default NavigationItem;
