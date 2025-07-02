// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders input correctly', () => {
    render(<Input />);
    const testInput = screen.getByTestId('input');
    expect(testInput).toBeInTheDocument();
  });
  it('renders an input with a custom class name', () => {
    render(<Input className="my-custom" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('my-custom');
  });
  it('forwards child props to the input', () => {
    render(
      <Input
        type="email"
        name="test-name"
        aria-label="test-aria-label"
        defaultValue="test-value"
      />,
    );
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('name', 'test-name');
    expect(input).toHaveAttribute('aria-label', 'test-aria-label');
    expect(input).toHaveValue('test-value');
  });
 
});
