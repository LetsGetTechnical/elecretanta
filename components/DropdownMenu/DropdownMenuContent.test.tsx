// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuContent } from './DropdownMenuContent';
import { DropdownMenuTrigger } from './DropdownMenuTrigger';
import { DropdownMenuItem } from './DropdownMenuItem';

describe('DropdownMenu Content', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('does not display dropdown menu content popout on page render', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="dropdown-menu-trigger">
          Trigger Button Text
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
          <DropdownMenuItem>Item 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(screen.queryByTestId('dropdown-menu-content')).toBeNull();
  });

  it('displays list of items passed as children after trigger is clicked', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="dropdown-menu-trigger">
          Trigger Button Text
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
          <DropdownMenuItem>Item 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByTestId('dropdown-menu-trigger'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('displays the content popout when trigger is clicked if no items passed', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="dropdown-menu-trigger">
          Trigger Button Text
        </DropdownMenuTrigger>
        <DropdownMenuContent></DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByTestId('dropdown-menu-trigger'));
    expect(screen.queryByTestId('dropdown-menu-content')).toBeInTheDocument();
  });
});
