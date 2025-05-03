'use client';

import { useEffect, useState } from 'react';
import Avatar from '../Avatar/Avatar';
import NavLogo from '../NavLogo/NavLogo';
import {SnowOverlayToggle} from '../SnowOverlayToggle/SnowOverlayToggle';
import getUserAvatar from '@/lib/getUserAvatar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const GlobalHeader = () => {
  const [avatar, setAvatar] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    const fetchAvatar = async () => {
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
