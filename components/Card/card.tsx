// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { HTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils';

/**
 * Card component - container for card.
 * @param {object} props - Props for the Card copmonent.
 * @param {string} [props.className] - Additional class names.
 * @returns {JSX.Element} - Rendered card container.
 */
const Card = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl border bg-card text-card-foreground shadow',
      className,
    )}
    {...props}
  />
));
Card.displayName = 'Card';

/**
 * Header portion of Card component.
 * @param {object} props - Props for CardHeader component.
 * @param {string} [props.className] - Additional class names for styling.
 * @param {HTMLAttributes<HTMLDivElement>} ref - ref forwarded for header container.
 * @returns {JSX.Element} - Rendered card header element. 
 */
const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

/**
 * Card title component used within Card.
 * @param {object} props - Props for CardTitle component. 
 * @param {string} [props.className] - Additional class names for styling. 
 * @param {HTMLAttributes<HTMLDivElement>} ref - Ref forwarded to title div.
 * @returns {JSX.Element} - Rendered card title element. 
 */
const CardTitle = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

/**
 * Card description component used within Card.
 * @param {object} props - Props for CardDescription component. 
 * @param {string} [props.className] - Additional class names for styling.
 * @param {HTMLAttributes<HTMLDivElement>} ref - Ref forwarded to description div.
 * @returns {JSX.Element} - Rendered card description element. 
 */
const CardDescription = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

/**
 * Container wrapping content within Card. 
 * @param {object} props - Div props passed to content container.
 * @param {string} [props.className] - Additional class names for styling. 
 * @param {HTMLAttributes<HTMLDivElement>} ref - Ref forwarded to content div. 
 * @returns {JSX.Element} - Rendered card content element. 
 */
const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

/**
 * Card footer component wrapping content within Card.
 * @param {object} props - Div props passed to the footer container.
 * @param {string} [props.className] - Additional class names for styling.
 * @param {HTMLAttributes<HTMLDivElement>} ref - Ref forwarded to div element.
 * @returns {JSX.Element} - The rendered card footer element. 
 */
const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
