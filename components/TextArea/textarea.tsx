// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { forwardRef, ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/***
 * Textarea component
 * @param {ComponentProps<'textarea'>} props
 * @param {string} [props.className]
 * @returns {JSX.Element}
 **/

const Textarea = forwardRef<HTMLTextAreaElement, ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        data-testid="textarea"
        className={cn(
          'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
