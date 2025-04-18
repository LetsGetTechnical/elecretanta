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
  for (let i = 0; i < variantTestCases.length; i++) {
    const variant = variantTestCases[i];

    it(`renders with variant: ${variant}`, () => {
      render(<Badge variant={variant}>{variant}</Badge>);
      const badge = screen.getByTestId('badge');
      expect(badge).toBeInTheDocument();

      const classNames = badgeVariants({ variant });
      expect(badge).toHaveClass(classNames);
    });
  }

  it('renders with default variant when none is provided', () => {
    render(<Badge>default</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toBeInTheDocument();

    const classNames = badgeVariants({ variant: 'default' });
    expect(badge).toHaveClass(classNames);
  });

  it('applies custom className alongside variant styles', () => {
    render(<Badge className="custom-class">custom</Badge>);
    const badge = screen.getByTestId('badge');
    const classNames = badgeVariants({ variant: 'default' });

    expect(badge).toHaveClass(classNames);
    expect(badge).toHaveClass('custom-class');
  });
});
