// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { JSX, ElementRef, ComponentPropsWithoutRef, forwardRef } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';

/**
 * The AvatarBody component.
 * @param {object} props - The props passed.
 * @param {string} props.className - Styles for component.
 * @returns {JSX.Element} - The AvatarBody component.
 */
const AvatarBody = forwardRef<
  ElementRef<typeof AvatarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className,
    )}
    {...props}
  />
));
AvatarBody.displayName = AvatarPrimitive.Root.displayName;

export { AvatarBody };
