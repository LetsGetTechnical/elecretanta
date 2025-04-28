// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { HTMLAttributes, forwardRef, JSX } from 'react';

import { cn } from '@/lib/utils';

/**
 * Card description component used within Card.
 * @param {object} props - Props for CardDescription component. 
 * @param {string} [props.className] - Additional class names for styling.
 * @returns {JSX.Element} - Rendered card description element. 
 */
const CardDescription = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export {
  CardDescription
};