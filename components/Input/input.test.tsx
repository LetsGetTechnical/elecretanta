// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render } from '@testing-library/react';
import { Input } from './input';

describe('Input', () => {
  it('renders input correctly', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Placeholder text" />,
    );
    expect(getByPlaceholderText('Placeholder text')).toBeInTheDocument();
  });
  it('renders correct input type', () => {
    const { getByRole } = render(<Input type="email" />);
    const input = getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });
  it('renders an input with correct class names', () => {
    const { getByRole } = render(<Input className="my-custom"/>);
    const input = getByRole("textbox")
    expect(input).toHaveClass("my-custom")
    expect(input).toHaveClass("rounded-md")
  });
});
