// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { forwardRef, ElementRef, ComponentPropsWithoutRef, JSX } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { CommandDialog } from './CommandDialog';
import { CommandEmpty } from './CommandEmpty';
import { CommandGroup } from './CommandGroup';
import { CommandInput } from './CommandInput';
import { CommandItem } from './CommandItem';
import { CommandList } from './CommandList';
import { CommandSeparator } from './CommandSeparator';
import { CommandShortcut } from './CommandShortcut';
import { cn } from '@/lib/utils';

/**
 * Command component - styled container for commands. 
 * @param {ComponentPropsWithoutRef<typeof CommandPrimitive>} props - Props passed to the CommandPrimitive component. 
 * @param {string} [props.className] - Additional class names for styling. 
 * @returns {JSX.Element} Rendered command container.
 */
const Command = forwardRef<
  ElementRef<typeof CommandPrimitive>,
  ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      className,
    )}
    data-testid="command"
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
