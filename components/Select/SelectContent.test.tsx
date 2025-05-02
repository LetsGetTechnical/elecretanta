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

describe('Select Content', () => {
  beforeEach(() => {
    render(
      <Select defaultValue="cookie">
        <SelectTrigger>
          <SelectValue placeholder="Pick a dessert" />
        </SelectTrigger>
        <SelectContent className="my-content">
          <span>This is the dessert content</span>
          <SelectGroup>
            <SelectLabel>Desserts</SelectLabel>
            <SelectItem value="cookie">Cookie</SelectItem>
            <SelectItem value="cake">Cake</SelectItem>
            <SelectItem value="brownie" disabled>
              Brownie
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );
  });

  it('opens the select content dropdown when the trigger is clicked', () => {
    expect(screen.queryByTestId('select-content')).toBeNull();
    fireEvent.click(screen.getByTestId('select-trigger'));
    expect(screen.getByTestId('select-content')).toBeInTheDocument();
  });

  it('selects an option and closes the dropdown', () => {
    const selectTrigger = screen.getByTestId('select-trigger');
    fireEvent.click(selectTrigger);
    fireEvent.click(screen.getByRole('option', { name: 'Cake' }));
    expect(screen.queryByTestId('select-content')).toBeNull();
  });

  it("doesn't select or close the dropdown when a disabled item is clicked", () => {
    fireEvent.click(screen.getByTestId('select-trigger'));
    const disabledItem = screen.getByRole('option', { name: 'Brownie' });
    fireEvent.click(disabledItem);
    expect(screen.getByTestId('select-content')).toBeInTheDocument();
    expect(screen.getByTestId('select-trigger')).toHaveTextContent('Cookie');
  });

  it('renders children and forwards props', () => {
    fireEvent.click(screen.getByTestId('select-trigger'));
    const selectContent = screen.getByTestId('select-content');
    expect(selectContent).toHaveClass('my-content');
    const triggerSpan = within(selectContent).getByText('This is the dessert content');
    expect(triggerSpan).toBeInTheDocument();
  });
});
