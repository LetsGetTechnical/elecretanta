// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { forwardRef, ElementRef, ComponentPropsWithoutRef, JSX } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@/lib/utils';

/**
 * Component that adds border between command groups. 
 * @param {ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>} props - Props passed to CommandPrimitive.Separator. 
 * @param {string} [props.className] - Additional class names for styling. 
 * @returns {JSX.Element} Rendered command separator. 
 */
const CommandSeparator = forwardRef<
  ElementRef<typeof CommandPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 h-px bg-border', className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

export {
  CommandSeparator
};