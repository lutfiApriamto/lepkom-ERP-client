import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuChevronDown, LuChevronRight } from 'react-icons/lu';
import type { BreadcrumbItem } from '@/hooks/globalStore';

interface BreadcrumbDropdownProps {
  items: BreadcrumbItem[];
  className?: string;
}

const BreadcrumbDropdown: React.FC<BreadcrumbDropdownProps> = ({ items, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if at least one item is clickable to determine if ellipsis should be interactive
  const isClickable = items.some(item => item.isClickAble !== false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isClickable) {
    return (
      <span className={`flex items-center gap-1 opacity-50 cursor-default ${className}`}>
        <span className="tracking-widest">...</span>
        <LuChevronDown className="w-3 h-3" />
      </span>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 rounded-sm transition-all ${className}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="tracking-widest font-bold">...</span>
        <LuChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-56 origin-top-left rounded-md bg-popover shadow-md border border-border ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-2 border-b border-border bg-muted/50 rounded-t-md">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Navigasi
            </span>
          </div>
          <div className="py-1 max-h-60 overflow-y-auto">
            {items.map((item, index) => {
              const itemClickable = item.isClickAble !== false;
              // Progressive indenting: base padding + (index * 8px)
              const paddingLeft = `${16 + (index * 8)}px`;

              if (itemClickable && item.path) {
                return (
                  <Link
                    key={index}
                    to={item.path}
                    className="group flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    style={{ paddingLeft }}
                    onClick={() => setIsOpen(false)}
                  >
                    <LuChevronRight className="w-3.5 h-3.5 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              }

              return (
                <span
                  key={index}
                  className="flex items-center w-full px-4 py-2 text-sm text-muted-foreground opacity-50 cursor-default"
                  style={{ paddingLeft }}
                >
                  <LuChevronRight className="w-3.5 h-3.5 mr-2" />
                  <span className="truncate">{item.label}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BreadcrumbDropdown;
