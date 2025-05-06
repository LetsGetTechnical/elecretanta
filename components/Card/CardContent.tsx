// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { HTMLAttributes, forwardRef, JSX } from 'react';

import { cn } from '@/lib/utils';

/**
 * Container wrapping content within Card. 
 * @param {object} props - Div props passed to content container.
 * @param {string} [props.className] - Additional class names for styling. 
 * @returns {JSX.Element} - Rendered card content element. 
 */
const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    data-testid="card-content"
    className={cn('p-6 pt-0', className)} 
    {...props} />
));
CardContent.displayName = 'CardContent';

export {
  CardContent
};