// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { HTMLAttributes, JSX, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/Button/button';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

/**
 * A custom overlay for use in the AlertDialog Component.
 * @param {object} props - Props for the component.
 * @param {string} props.className - Additional CSS classes for custom styling.
 * @returns {JSX.Element} - The rendered AlertDialogOverlay element.
 */
const AlertDialogOverlay = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

/**
 * Contains content to be rendered when the AlertDialog component is open.
 * @param {object} props - Props for the component.
 * @param {string} props.className - Additional CSS classes for custom styling.
 * @returns {JSX.Element} - The rendered AlertDialogContent element.
 */
const AlertDialogContent = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

/**
 * A custom header for use in the AlertDialog Component.
 * @param {HTMLAttributes<HTMLDivElement>} props - Props for function.
 * @param {string} props.className - Additional CSS classes for custom styling.
 * @returns {JSX.Element} - The rendered AlertDialogHeader element.
 */
const AlertDialogHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className,
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

/**
 * A custom footer for use in the AlertDialogFooter Component.
 * @param {HTMLAttributes<HTMLDivElement>} props - Props for function.
 * @param {string} props.className - Additional CSS classes for custom styling.
 * @returns {JSX.Element} - The rendered AlertDialogFooter element.
 */
const AlertDialogFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

/**
 * An accessible title announced when the AlertDialog component is opened.
 * @param {object} props - Props for the component.
 * @param {string} props.className - Additional CSS classes for custom styling.
 * @returns {JSX.Element} - The rendered AlertDialogTitle element.
 */
const AlertDialogTitle = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold', className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

/**
 * An accessible description announced when the AlertDialog component is opened.
 * @param {object} props - Props for the component.
 * @param {string} props.className - Additional CSS classes for custom styling.
 * @returns {JSX.Element} - The rendered AlertDialogDescription element.
 */
const AlertDialogDescription = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

/**
 * A button that closes the AlertDialog component. Should be distinguished visually from the Cancel button.
 * @param {object} props - Props for the component.
 * @param {string} props.className - Additional CSS classes for custom styling.
 * @returns {JSX.Element} - The rendered AlertDialogAction element.
 */  
const AlertDialogAction = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Action>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

/**
 * A button that closes the AlertDialog component. Should be distinguished visually from the Action button.
 * @param {object} props - Props for the component.
 * @param {string} props.className - Additional CSS classes for custom styling.
 * @returns {JSX.Element} - The rendered AlertDialogCancel element.
 */ 
const AlertDialogCancel = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Cancel>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: 'outline' }),
      'mt-2 sm:mt-0',
      className,
    )}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
