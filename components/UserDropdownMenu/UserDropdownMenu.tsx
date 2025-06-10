// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { useEffect, useState } from 'react';
import { useAuthContext } from '@/context/AuthContextProvider';
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
  const { logOut } = useAuthContext();

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
    <DropdownMenu>
      <DropdownMenuTrigger data-testid="dropdown-menu-trigger">
        <Avatar userAvatar={avatar} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem data-testid="my-profile-link">
          <Link
            href="/profile"
            className="underline-offset-4 hover:underline cursor-pointer inline-flex items-center gap-2 text-sm font-medium"
          >
            <CircleUser size="18" strokeWidth="2" />
            My profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem data-testid="logout-button">
          <Button variant="link" className="p-0 h-5" onClick={logOut}>
            <LogOut />
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
