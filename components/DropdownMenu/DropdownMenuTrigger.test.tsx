// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuContent } from './DropdownMenuContent';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownMenuTrigger } from './DropdownMenuTrigger';

describe('DropdownMenu Trigger', () => {
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
          <DropdownMenuItem>DropdownMenu Item Text</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    trigger = screen.getByTestId('dropdown-menu-trigger');
  });

  it('renders the trigger button', () => {
    expect(trigger).toBeInTheDocument();
  });

  it('opens the dropdown menu when trigger is clicked', async () => {
    expect(screen.queryByTestId('dropdown-menu-content')).toBeNull();
    await user.click(screen.getByTestId('dropdown-menu-trigger'));
    expect(screen.getByText('DropdownMenu Item Text')).toBeInTheDocument();
  });

  it('opens dropdown menu when spacebar is pressed', async () => {
    trigger.focus();
    await user.keyboard('[Space]');
    expect(screen.getByText('DropdownMenu Item Text')).toBeInTheDocument();
  });
});
