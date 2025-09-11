// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { forwardRef, ElementRef, ComponentPropsWithoutRef, JSX } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/lib/utils';

/**
 * The RadioGroup component.
 * @param {object} props - The props passed.
 * @param {string} props.className - Styles for the component.
 * @returns {JSX.Element} - The RadioGroup component.
 */
export const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
      data-testid="radio-group"
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
