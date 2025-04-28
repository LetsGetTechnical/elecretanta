// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { HTMLAttributes, forwardRef, JSX } from 'react';

import { cn } from '@/lib/utils';

/**
 * Header portion of Card component.
 * @param {object} props - Props for CardHeader component.
 * @param {string} [props.className] - Additional class names for styling.
 * @returns {JSX.Element} - Rendered card header element. 
 */
const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

export {
  CardHeader
};