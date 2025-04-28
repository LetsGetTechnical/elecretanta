// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { HTMLAttributes, forwardRef, JSX } from 'react';
import { cn } from '@/lib/utils';

/**
 * Card component - container for card.
 * @param {object} props - Props for the Card copmonent.
 * @param {string} [props.className] - Additional class names.
 * @returns {JSX.Element} - Rendered card container.
 */
const Card = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl border bg-card text-card-foreground shadow',
      className,
    )}
    {...props}
  />
));
Card.displayName = 'Card';

export {
  Card
};