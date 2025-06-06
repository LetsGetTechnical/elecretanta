// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';
import { Description as RadixDescription } from '@radix-ui/react-dialog';

export const DialogDescription = forwardRef<
  ElementRef<typeof RadixDescription>,
  ComponentPropsWithoutRef<typeof RadixDescription>
>(({ className, ...props }, ref) => (
  <RadixDescription
    ref={ref}
    data-testid="dialog-description"
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = RadixDescription.displayName;
