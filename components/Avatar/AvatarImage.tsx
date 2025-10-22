// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { forwardRef, ElementRef, JSX, ComponentPropsWithoutRef } from 'react';
import { Image } from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';

/**
 * AvatarImage component, part of the Avatar component.
 * @param {typeof Image} props - Avatar image props.
 * @param {string} props.alt - Alt text for the avatar image.
 * @param {string} [props.className] - Optional custom class name.
 * @returns {JSX.Element} Avatar image element.
 */
const AvatarImage = forwardRef<
  ElementRef<typeof Image>,
  ComponentPropsWithoutRef<typeof Image>
>(
  ({ alt, className, ...props }, ref): JSX.Element => (
    <Image
      ref={ref}
      alt={alt}
      className={cn('aspect-square h-full w-full', className)}
      data-testid="avatar-image"
      {...props}
    />
  ),
);
AvatarImage.displayName = Image.displayName;

export { AvatarImage };
