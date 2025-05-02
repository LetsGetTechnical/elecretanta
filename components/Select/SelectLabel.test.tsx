// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen, within, fireEvent } from '@testing-library/react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectGroup,
} from '@/components/Select';

describe('Select Label', () => {
  beforeEach(() => {
    render(
      <Select>
        <SelectTrigger />
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="my-label">
              hello
              <span>world</span>
            </SelectLabel>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );
  });

  it('renders provided label text', () => {
    fireEvent.click(screen.getByTestId('select-trigger'));
    expect(screen.getByTestId('select-label')).toBeInTheDocument();
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('Forwards props and renders children', () => {
    fireEvent.click(screen.getByTestId('select-trigger'));
    const selectLabel = screen.getByTestId('select-label');
    expect(selectLabel).toHaveClass('my-label');
    const labelSpan = within(selectLabel).getByText('world');
    expect(labelSpan).toBeInTheDocument();
  });
});
