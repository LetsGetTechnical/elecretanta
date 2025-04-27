// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Gift } from 'lucide-react';
import Link from 'next/link';
import { JSX } from 'react';

/**
 * Renders the logo in the navigation bar, which redirects to the dashboard when clicked.
 * @returns { JSX.Element } The rendered navigation logo. 
 */
const NavLogo = (): JSX.Element => {
  return (
    <Link href={'/dashboard'} className="flex items-center">
      <Gift className="bg-logoWhite h-8 w-8 p-1 rounded-lg text-red-600" />
      <p className="font-bold ml-2 italic text-green-200">
        Elf<span className="text-white font-semibold">gorithm</span>
      </p>
    </Link>
  );
};

export default NavLogo;
