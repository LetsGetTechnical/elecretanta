// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import LogoCombination from '@/app/assets/svgs/LogoCombination';
import Link from 'next/link';
import { JSX } from 'react';

/**
 * Renders the logo in the navigation bar, which redirects to the dashboard when clicked.
 * @returns { JSX.Element } The rendered logo within the navigation bar.
 */
const NavLogo = (): JSX.Element => {
  return (
    <Link
      href={'/dashboard'}
      className="flex items-center"
      data-testid="nav-logo-link"
    >
      <LogoCombination className="w-60 sm:w-72" data-testid="nav-logo-icon" />
    </Link>
  );
};

export default NavLogo;
