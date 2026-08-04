import React from 'react';
import { Link } from 'react-router-dom';

// Note: Replace with your actual logo paths when available
const Logo = '/logo-long.png'; 
const LogoWhite = '/logo-long-white.png';

const PublicNavbar: React.FC = () => {
  return (
    <nav className="flex h-16 items-center border-b border-gray-200 p-2 dark:border-white/30">
      <div className="flex h-full w-full items-center justify-between gap-4">
        <Link to="/">
          {/* Note: the image logic uses a simple img tag for Tailwind, you might need a dark mode toggle wrapper logic if preferred */}
          <img
            src={Logo}
            alt="flowreport_logo"
            className="h-auto w-32 object-contain dark:hidden"
          />
          <img
            src={LogoWhite}
            alt="flowreport_logo"
            className="hidden h-auto w-32 object-contain dark:block"
          />
        </Link>
        {/* Placeholder for ColorModeButton logic in Tailwind */}
        <button
          className="rounded bg-gray-200 px-3 py-1 text-sm dark:bg-gray-700"
          title="Toggle Theme"
        >
          Theme
        </button>
      </div>
    </nav>
  );
};

export default PublicNavbar;
