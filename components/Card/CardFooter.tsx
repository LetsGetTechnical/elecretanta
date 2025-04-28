// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { HTMLAttributes, forwardRef, JSX } from 'react';

import { cn } from '@/lib/utils';

/**
 * Card footer component wrapping content within Card.
 * @param {object} props - Div props passed to the footer container.
 * @param {string} [props.className] - Additional class names for styling.
 * @returns {JSX.Element} - The rendered card footer element. 
 */
const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  CardFooter
};