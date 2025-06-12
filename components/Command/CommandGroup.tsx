// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { forwardRef, ElementRef, ComponentPropsWithoutRef, JSX } from 'react';
import { Command as CommandPrimitive } from 'cmdk';

import { cn } from '@/lib/utils';

/**
 * Container wrapping related command items. 
 * @param {ComponentPropsWithoutRef<typeof CommandPrimitive.Group>} props - Props passed to CommandPrimitive.Group. 
 * @param {string} [props.className] - Additional class names for styling. 
 * @returns {JSX.Element} Renders styled command group. 
 */
const CommandGroup = forwardRef<
  ElementRef<typeof CommandPrimitive.Group>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    data-testid="command-group"
    className={cn(
      'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

export {
  CommandGroup
};