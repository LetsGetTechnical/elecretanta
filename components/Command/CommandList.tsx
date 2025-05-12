// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { forwardRef, ElementRef, ComponentPropsWithoutRef, JSX } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@/lib/utils';

/**
 * CommandList component - scrollable container for command items. 
 * @param {ComponentPropsWithoutRef<typeof CommandPrimitive.List>} props - Props passed to CommandPrimitive.List. 
 * @param {string} [props.className] - Additional class names for styling.
 * @returns {JSX.Element} Rendered command list container. 
 */
const CommandList = forwardRef<
  ElementRef<typeof CommandPrimitive.List>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

export {
  CommandList
};