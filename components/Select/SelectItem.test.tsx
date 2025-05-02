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

describe('Select Item', () => {
  beforeEach(() => {
    render(
      <Select defaultValue="basketball">
        <SelectTrigger>
          <SelectValue placeholder="Pick a sport" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Desserts</SelectLabel>
            <SelectItem value="basketball" className="my-item">
              Basketball <span>Is Fun</span>
            </SelectItem>
            <SelectItem value="football">Football</SelectItem>
            <SelectItem value="soccer" disabled>
              Soccer
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );
  });

  it('opens the select content dropdown and its items when the trigger is clicked', () => {
    fireEvent.click(screen.getByTestId('select-trigger'));
    expect(
      screen.getByRole('option', { name: 'Football' }),
    ).toBeInTheDocument();
  });

  it('selects an item and renders its data state as checked', () => {
    const selectTrigger = screen.getByTestId('select-trigger');
    fireEvent.click(selectTrigger);
    fireEvent.click(screen.getByRole('option', { name: 'Football' }));
    expect(selectTrigger).toHaveTextContent('Football');

    fireEvent.click(selectTrigger);
    expect(screen.getByRole('option', { name: 'Football' })).toHaveAttribute(
      'data-state',
      'checked',
    );
  });

  it("doesn't select a disabled item", () => {
    fireEvent.click(screen.getByTestId('select-trigger'));
    const disabledItem = screen.getByRole('option', { name: 'Soccer' });
    fireEvent.click(disabledItem);
    expect(screen.getByTestId('select-content')).toBeInTheDocument();
    expect(screen.getByTestId('select-trigger')).toHaveTextContent(
      'Basketball',
    );
  });

  it('renders children and forwards props', () => {
    fireEvent.click(screen.getByTestId('select-trigger'));
    const selectItem = screen.getByRole('option', {
      name: 'Basketball Is Fun',
    });
    expect(selectItem).toHaveClass('my-item');
    const itemSpan = within(selectItem).getByText('Is Fun');
    expect(itemSpan).toBeInTheDocument();
  });
});
