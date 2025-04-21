// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Badge, BadgeProps, badgeVariants } from './badge';
import { render, screen } from '@testing-library/react';

const variantTestCases = [
  'default',
  'destructive',
  'outline',
  'secondary',
] as NonNullable<BadgeProps['variant']>[];

describe('Badge', () => {
  it('renders the component in the document', () => {
    render(<Badge />);

    const badge = screen.getByTestId('badge');

    expect(badge).toBeInTheDocument();
  });

  it('renders with default variant when none is provided', () => {
    render(<Badge />);

    const badge = screen.getByTestId('badge');

    const classNames = badgeVariants({ variant: 'default' });
    expect(badge).toHaveClass(classNames);
  });

  for (let i = 0; i < variantTestCases.length; i++) {
    const variant = variantTestCases[i];
    it(`renders with the "${variant}" variant and applies correct styles`, () => {
      render(<Badge variant={variant} />);

      const badge = screen.getByTestId('badge');

      const classNames = badgeVariants({ variant });
      expect(badge).toHaveClass(classNames);
    });
  }

  it('renders the provided children inside the badge', () => {
    render(<Badge>children</Badge>);

    const badge = screen.getByTestId('badge');

    expect(badge).toHaveTextContent('children');
  });

  it('renders with custom className alongside variant styles', () => {
    render(<Badge className="custom-class" />);

    const badge = screen.getByTestId('badge');

    const classNames = badgeVariants({ variant: 'default' });
    expect(badge).toHaveClass(classNames);
    expect(badge).toHaveClass('custom-class');
  });
});
