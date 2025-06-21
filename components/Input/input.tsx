// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { forwardRef, ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/**
 * A customizable Input Component
 * @param {object} props - props for the Input
 * @param {string} props.className - additonal CSS classes
 * @param {string} props.type - type of button
 * @returns {Input} - returns Input Component
 */

const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        data-testid="input"
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };
