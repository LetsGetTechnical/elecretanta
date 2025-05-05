// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { HTMLAttributes, JSX } from 'react';
import { cn } from '@/lib/utils';

/**
 * Function that renders the header for the dialog component.
 * @param {HTMLAttributes<HTMLDivElement>} props - Props for function
 * @param {string} props.className - Additional CSS classes for custom styling.
 * @returns {JSX.Element} The rendered dialog header element.
 */
export const DialogHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';
