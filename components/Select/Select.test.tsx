// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

window.HTMLElement.prototype.scrollIntoView = jest.fn();

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
} from '@/components/Select';

describe('Select', () => {
  it('renders provided children', () => {
    render(
      <Select defaultValue="default-select-value">
        <SelectGroup>
          <SelectValue>hello</SelectValue>
        </SelectGroup>
      </Select>,
    );
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});

describe('Select - keyboard accessibility', () => {
  let user: ReturnType<typeof userEvent.setup>;
  let trigger: HTMLElement;

  beforeEach(() => {
    user = userEvent.setup();
    render(
      <Select defaultValue="apple">
        <SelectTrigger>
          <SelectValue placeholder="Pick a fruit..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );
    trigger = screen.getByTestId('select-trigger');
    trigger.focus();
  });

  it('opens the dropdown menu with the Enter key', async () => {
    await user.keyboard('{Enter}');
    expect(screen.getByTestId('select-content')).toBeVisible();
  });

  it('navigates with ArrowDown, selects Banana with Enter, and closes the dropdown', async () => {
    await user.keyboard('{Enter}{ArrowDown}{ArrowDown}{Enter}');
    expect(screen.queryByTestId('select-content')).toBeNull();
    expect(trigger).toHaveTextContent('Banana');
  });
});
