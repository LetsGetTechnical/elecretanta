// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLAttributes, JSX } from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 *  Badge component.
 * @param {BadgeProps} props - Component props.
 * @param {string} [props.className] - Optional classnames for the badge.
 * @param {'default' | 'secondary' | 'destructive' | 'outline'} [props.variant] - Variant for the badge.
 * @returns {JSX.Element} The rendered Badge component.
 */
const Badge = ({ className, variant, ...props }: BadgeProps): JSX.Element => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
};

export { Badge, badgeVariants };
