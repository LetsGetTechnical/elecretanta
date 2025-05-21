'use client';

import NavLogo from '../NavLogo/NavLogo';
import SnowOverlayToggle from '../SnowOverlayToggle/SnowOverlayToggle';
import UserDropdownMenu from '../UserDropdownMenu/UserDropdownMenu';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const GlobalHeader = () => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'flex items-center justify-between px-4 md:px-16 lg:px-32 xl:px-52 bg-elfHeaderGreen h-20',
        pathname === '/' ? 'hidden' : '',
      )}
    >
      <NavLogo />
      <div className="flex gap-2 items-center">
        <SnowOverlayToggle />
        <UserDropdownMenu />
      </div>
    </nav>
  );
};

export default GlobalHeader;
