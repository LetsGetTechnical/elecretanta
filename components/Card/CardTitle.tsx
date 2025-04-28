// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { HTMLAttributes, forwardRef, JSX } from 'react';

import { cn } from '@/lib/utils';

/**
 * Card title component used within Card.
 * @param {object} props - Props for CardTitle component. 
 * @param {string} [props.className] - Additional class names for styling. 
 * @returns {JSX.Element} - Rendered card title element. 
 */
const CardTitle = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

export {
  CardTitle
};