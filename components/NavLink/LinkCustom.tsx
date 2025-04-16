// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ReactNode, JSX } from 'react';
type NavLinkProps = {
  href: string;
  children?: ReactNode;
  className?: string;
};

/**
 * A navigation link component that uses Next.js Link component.
 * @param {string} href - The URL to link to.
 * @param {ReactNode} [children] - The content to display inside the link.
 * @param {string} [className] - The class name to apply to the link.
 * @returns A navigation link component.
 */
const LinkCustom = ({
  href,
  children,
  className,
}: NavLinkProps): JSX.Element => {
  return (
    <Link
      href={href}
      data-testid="link-custom"
      className={cn(
        'flex items-center gap-1 text-sm text-primary-foreground m-5',
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default LinkCustom;
