// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Label } from './label';
import { render, screen } from '@testing-library/react';

describe('Label', () => {
  it('renders the component', () => {
    render(<Label />);

    const label = screen.getByTestId('label');

    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-sm');
  });

  it('renders the provided children inside the label', () => {
    render(<Label>children</Label>);

    const label = screen.getByText('children');

    expect(label).toHaveTextContent('children');
  });

  it('applies custom className along with default className', () => {
    render(<Label className="custom-class" />);

    const label = screen.getByTestId('label');

    expect(label).toHaveClass('custom-class');
  });
});
