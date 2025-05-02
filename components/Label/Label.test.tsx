// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Label } from './Label';
import { render, screen } from '@testing-library/react';

describe('Label', () => {
  it('renders the component', () => {
    render(<Label />);

    const label = screen.getByTestId('label');

    expect(label).toBeInTheDocument();
  });

  it('renders the provided children inside the label', () => {
    render(<Label>children</Label>);

    const label = screen.getByTestId('label');

    expect(label).toHaveTextContent('children');
  });

  it('applies custom className along with default className', () => {
    render(<Label className="custom-class" />);

    const label = screen.getByTestId('label');

    expect(label).toHaveClass('custom-class');
  });

  it('renders with htmlFor and aria-label attributes', () => {
    render(<Label htmlFor="name" aria-label="name" />);

    const label = screen.getByTestId('label');

    expect(label).toHaveAttribute('for', 'name');
    expect(label).toHaveAttribute('aria-label', 'name');
  });
});
