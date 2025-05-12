// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { HTMLAttributes, JSX } from 'react';
import { cn } from '@/lib/utils';

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
  CommandShortcut
};