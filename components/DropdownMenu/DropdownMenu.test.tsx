// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuContent } from './DropdownMenuContent';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownMenuTrigger } from './DropdownMenuTrigger';

describe('DropdownMenu', () => {
  let user: ReturnType<typeof userEvent.setup>;
  let trigger: HTMLElement;

  beforeEach(() => {
    user = userEvent.setup();

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
    trigger = screen.getByTestId('dropdown-menu-trigger');
  });

  it('closes the dropdown menu when an item is clicked', async () => {
    await user.click(trigger);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    await user.click(screen.getByText('Item 1'));
    expect(screen.queryByTestId('dropdown-menu-content')).toBeNull();
  });

  it('closes the dropdown menu (modal) when the Escape key is pressed', async () => {
    await user.click(trigger);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    await user.keyboard('[Escape]');
    expect(screen.queryByTestId('dropdown-menu-content')).toBeNull();
  });

  it('closes the dropdown menu (modal) when the spacebar is pressed if opened via keyboard', async () => {
    trigger.focus();
    await user.keyboard('[Space]');
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    await user.keyboard('[Space]');
    expect(screen.queryByTestId('dropdown-menu-content')).toBeNull();
  });
});
