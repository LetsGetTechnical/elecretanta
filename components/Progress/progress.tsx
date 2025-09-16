// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

/**
 * A Progress Component with an indicator to represent the progress-to-overall ration.
 * @param {object} [props] - Props for the Progress component.
 * @param {string} [props.className] - Additional CSS classes for the Root element
 * @param {number} [props.value] - Progress value, expected range: 0 - 100
 * @param {string} [props.indicatorClassName] - Additional CSS classes for the Indicator element
 * @returns {Progress} - returns Progress component.
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorClassName?: string;
  }
>(({ className, value, indicatorClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      data-testid="progress-indicator"
      data-value={value}
      className={cn(
        'h-full w-full flex-1 bg-[#E26969] transition-all rounded-full',
        indicatorClassName,
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
