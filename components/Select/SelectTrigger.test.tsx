// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen, within, fireEvent } from '@testing-library/react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from '@/components/Select';

describe('Select Trigger', () => {
  beforeEach(() => {
    render(
      <Select defaultValue="apple">
        <SelectTrigger aria-label="foo" className="my-trigger">
          <span>Choose a fruit:</span>
          <SelectValue placeholder="Pick a fruit..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange" disabled>
              Orange
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );
  });

  it('opens the dropdown when the trigger is clicked', () => {
    expect(screen.queryByTestId('select-content')).toBeNull();
    fireEvent.click(screen.getByTestId('select-trigger'));
    expect(screen.getByTestId('select-content')).toBeInTheDocument();
  });

  it('selects an option, closes the dropdown, updates the trigger text, and marks the item as checked', () => {
    const selectTrigger = screen.getByTestId('select-trigger');
    fireEvent.click(selectTrigger);
    fireEvent.click(screen.getByRole('option', { name: 'Banana' }));
    expect(screen.queryByTestId('select-content')).toBeNull();
    expect(selectTrigger).toHaveTextContent('Banana');

    fireEvent.click(selectTrigger);
    expect(screen.getByRole('option', { name: 'Banana' })).toHaveAttribute(
      'data-state',
      'checked',
    );
  });

  it("doesn't select or close when a disabled item is clicked", () => {
    fireEvent.click(screen.getByTestId('select-trigger'));
    const disabledItem = screen.getByRole('option', { name: 'Orange' });
    fireEvent.click(disabledItem);
    expect(screen.getByTestId('select-content')).toBeInTheDocument();
    expect(screen.getByTestId('select-trigger')).toHaveTextContent('Apple');
  });

  it('renders children and forwards props', () => {
    const selectTrigger = screen.getByTestId('select-trigger');
    expect(selectTrigger).toHaveAttribute('aria-label', 'foo');
    expect(selectTrigger).toHaveClass('my-trigger');
    const triggerSpan = within(selectTrigger).getByText('Choose a fruit:');
    expect(triggerSpan).toBeInTheDocument();
  });
});
