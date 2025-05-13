// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen, fireEvent } from '@testing-library/react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectSeparator,
  SelectItem,
} from '@/components/Select';

describe('SelectSeparator', () => {
  it('renders and forwards props', () => {
    render(
      <Select defaultValue="1">
        <SelectTrigger>
          <SelectValue placeholder="Choose…" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">One</SelectItem>
          <SelectSeparator aria-label="foo" className="my-separator" />
          <SelectItem value="2">Two</SelectItem>
        </SelectContent>
      </Select>,
    );

    fireEvent.click(screen.getByTestId('select-trigger'));

    const sep = screen.getByTestId('select-separator');
    expect(sep).toBeInTheDocument();
    expect(sep).toHaveAttribute('aria-label', 'foo');
    expect(sep).toHaveClass('my-separator');
  });
});
