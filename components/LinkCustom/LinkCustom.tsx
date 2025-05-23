// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { JSX } from 'react';
import { ILinkCustomProps } from './ILinkCustomProps';
/**
 * A navigation link component that uses Next.js Link component.
 * @param {string} href - The URL to link to.
 * @param {ReactNode} [children] - The content to display inside the link.
 * @param {string} [className] - The class name to apply to the link.
 * @returns A custom navigation link component.
 */
const LinkCustom = ({
  href,
  children,
  className,
}: ILinkCustomProps): JSX.Element => {
  return (
    <Link
      href={href}
      data-testid="link-custom"
      className={cn(
        'LinkCustom flex items-center gap-1 text-sm text-primary-foreground m-5',
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default LinkCustom;
