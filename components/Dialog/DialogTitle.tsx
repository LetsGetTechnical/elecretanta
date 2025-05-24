// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';
import { Title as RadixTitle } from '@radix-ui/react-dialog';

export const DialogTitle = forwardRef<
  ElementRef<typeof RadixTitle>,
  ComponentPropsWithoutRef<typeof RadixTitle>
>(({ className, ...props }, ref) => (
  <RadixTitle
    ref={ref}
    data-testid="dialog-title"
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = RadixTitle.displayName;
