// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX } from 'react';
import { type DialogProps } from '@radix-ui/react-dialog';
import { Dialog, DialogContent } from '@/components/Dialogue/dialog';
import { Command } from './Command';

/**
 * Component that renders a styled command dialog. 
 * @param {DialogProps} props - Props for the Dialog component, including children (content to be displayed within the dialog).
 * @returns {JSX.Element} Rendered command dialog component.  
 */
const CommandDialog = ({ children, ...props }: DialogProps): JSX.Element => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command data-testid="command-dialog" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export {
  CommandDialog
};