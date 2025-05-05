// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { HTMLAttributes, JSX } from 'react';
import { cn } from '@/lib/utils';

/**
 * Function that renders the footer for the dialog component.
 * @param {HTMLAttributes<HTMLDivElement>} props - Props for function
 * @param {string} props.className - Additional CSS classes for custom styling.
 * @returns {JSX.Element} The rendered dialog footer element.
 */
export const DialogFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';
