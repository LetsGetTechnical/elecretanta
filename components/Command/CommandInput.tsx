// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { forwardRef, ElementRef, ComponentPropsWithoutRef, JSX } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Component that renders styled input field within Command. 
 * @param {ComponentPropsWithoutRef<typeof CommandPrimitive.Input>} props - Props passed to the CommandPrimitive.Input component.
 * @param {string} [props.className] - Additional class names for styling. 
 * @returns {JSX.Element} Rendered input container. 
 */
const CommandInput = forwardRef<
  ElementRef<typeof CommandPrimitive.Input>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" data-testid="command-input" {...{ "cmdk-input-wrapper":"" }}>
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

export {
  CommandInput
};