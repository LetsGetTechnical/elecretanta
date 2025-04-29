// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen, fireEvent } from '@testing-library/react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectItem,
} from '@/components/Select';

describe('SelectScrollDownButton', () => {
  it('renders and forwards props', () => {
    render(
      <Select defaultValue="x">
        <SelectContent>
          <SelectScrollUpButton />
          <SelectScrollDownButton aria-label="foo" className="my-button" />
        </SelectContent>
      </Select>,
    );

    const btn = screen.getByTestId('select-scroll-down-button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('aria-label', 'foo');
    expect(btn).toHaveClass('my-button');
  });
});
