// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { forwardRef, ElementRef, ComponentPropsWithoutRef, JSX } from 'react';

import { Command as CommandPrimitive } from 'cmdk';

/**
 * Component that displays a message when the command list has no matching results. 
 * @param {ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>} props - Props passed to CommandPrimitive.Empty.
 * @param {string} [props.className] - Additional class names for styling.
 * @returns {JSX.Element} Renders empty state element. 
 */
const CommandEmpty = forwardRef<
  ElementRef<typeof CommandPrimitive.Empty>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

export {
  CommandEmpty
};