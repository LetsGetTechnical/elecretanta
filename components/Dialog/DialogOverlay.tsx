// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';
import { Overlay as RadixOverlay } from '@radix-ui/react-dialog';

export const DialogOverlay = forwardRef<
  ElementRef<typeof RadixOverlay>,
  ComponentPropsWithoutRef<typeof RadixOverlay>
>(({ className, ...props }, ref) => (
  <RadixOverlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    data-testid="dialog-overlay"
    {...props}
  />
));
DialogOverlay.displayName = RadixOverlay.displayName;
