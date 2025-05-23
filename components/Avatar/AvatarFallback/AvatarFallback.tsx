// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { JSX, ElementRef, ComponentPropsWithoutRef, forwardRef } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';

/**
 * The AvatarFallback component with a fallback image.
 * @param {object} props - The props passed.
 * @param {string} props.className - Styles for component.
 * @returns {JSX.Element} - The AvatarFallback component.
 */
const AvatarFallback = forwardRef<
  ElementRef<typeof AvatarPrimitive.Fallback>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className,
    )}
    data-testid="avatar-fallback"
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { AvatarFallback };
