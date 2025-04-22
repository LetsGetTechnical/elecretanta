// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { forwardRef, ElementRef, ComponentPropsWithoutRef, HTMLAttributes, JSX } from 'react';
import { type DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/Dialogue/dialog';

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
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

/**
 * Component that renders a styled command dialog. 
 * @param {DialogProps} props - Props for the Dialog component, including children (content to be displayed within the dialog).
 * @returns {JSX.Element} Rendered command dialog component.  
 */
const CommandDialog = ({ children, ...props }: DialogProps): JSX.Element => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

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
  <div className="flex items-center border-b px-3" {...{ "cmdk-input-wrapper":"" }}>
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
    className={cn(
      'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

/**
 * Component that adds border between command groups. 
 * @param {ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>} - Props passed to CommandPrimitive.Separator. 
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

/**
 * Component that renders individual command items. 
 * @param {ComponentPropsWithoutRef<typeof CommandPrimitive.Item>} - props - Props passed to CommandPrimitive.Item
 * @param {string} [props.className] - Additional class names for styling.
 * @returns {JSX.Element} Rendered command item. 
 */
const CommandItem = forwardRef<
  ElementRef<typeof CommandPrimitive.Item>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

/**
 * Component that renders styled span for keyboard shortcuts or inline commands. 
 * @param {object} props - Props for CommandShortcut component. 
 * @param {string} [props.className] - Additional class names for styling. 
 * @returns {JSX.Element} Span element with applied props and class names.
 */
const CommandShortcut = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>): JSX.Element => {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = 'CommandShortcut';

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
