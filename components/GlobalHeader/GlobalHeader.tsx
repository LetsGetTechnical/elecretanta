// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import Avatar from '../Avatar/Avatar';
import NavLogo from '../NavLogo/NavLogo';
import SnowOverlayToggle from '../SnowOverlayToggle/SnowOverlayToggle';
import getUserAvatar from '@/lib/getUserAvatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { JSX, useEffect, useState } from 'react';

/**
 * GlobalHeader component that renders the main navigation header.
 * @returns {JSX.Element} - A nav containing the logo, snow toggle, and user avatar.
 */
const GlobalHeader = (): JSX.Element => {
  const [avatar, setAvatar] = useState<string>('');

  const pathname = usePathname();

  useEffect(() => {
    /**
     * Fetches the user avatar and updates the state.
     * @returns {Promise<void>} - A promise that resolves after fetching the user's avatar.
     */
    const fetchAvatar = async (): Promise<void> => {
      const response = await getUserAvatar();
      setAvatar(response);
    };
    fetchAvatar();
  }, []);

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
        <Link href={'/profile'}>
          <Avatar userAvatar={avatar} />
        </Link>
      </div>
    </nav>
  );
};

export default GlobalHeader;
