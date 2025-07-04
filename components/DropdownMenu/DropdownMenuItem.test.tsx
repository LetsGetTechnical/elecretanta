// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuContent } from './DropdownMenuContent';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownMenuTrigger } from './DropdownMenuTrigger';

describe('DropdownMenu Item', () => {
  it('displays correct item content', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="dropdown-menu-trigger">
          Trigger Button Text
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>DropdownMenu Item Text</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByTestId('dropdown-menu-trigger'));
    expect(screen.getByText('DropdownMenu Item Text')).toBeInTheDocument();
  });
});
