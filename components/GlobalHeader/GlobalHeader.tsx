// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import NavLogo from '../NavLogo/NavLogo';
import SnowOverlayToggle from '../SnowOverlayToggle/SnowOverlayToggle';
import { cn } from '@/lib/utils';
import UserDropdownMenu from '../UserDropdownMenu/UserDropdownMenu';
import { usePathname } from 'next/navigation';
import { JSX } from 'react';

/**
 * GlobalHeader component that renders the main navigation header.
 * @returns {JSX.Element} - A nav containing the logo, snow toggle, and user avatar.
 */
const GlobalHeader = (): JSX.Element => {
  const pathname = usePathname();
        
  return (
    <nav
      data-testid="global-header"
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
