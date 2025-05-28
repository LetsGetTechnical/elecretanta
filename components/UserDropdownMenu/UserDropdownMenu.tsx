// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { useEffect, useState } from 'react';
import Avatar from '../Avatar/Avatar';
import { Button } from '../Button/button';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import { DropdownMenuContent } from '../DropdownMenu/DropdownMenuContent';
import { DropdownMenuTrigger } from '../DropdownMenu/DropdownMenuTrigger';
import { DropdownMenuItem } from '../DropdownMenu/DropdownMenuItem';
import { LogOut, CircleUser } from 'lucide-react';
import getUserAvatar from '@/lib/getUserAvatar';
import Link from 'next/link';

/**
 * A dropdown menu activated by clicking the user's avatar that allows the user to navigate to their profile
 * or log out of the application.
 * @returns {JSX.Element} - The user dropdown menu component.
 */
const UserDropdownMenu = (): JSX.Element => {
  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    const fetchAvatar = async () => {
      const response = await getUserAvatar();
      setAvatar(response);
    };
    fetchAvatar();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button asChild className="border-none hover:border-none">
          <Avatar userAvatar={avatar} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="font-medium underline-offset-4 hover:underline cursor-pointer"
          >
            <CircleUser />
            My profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant="link" className="p-0 h-5">
            <LogOut />
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
