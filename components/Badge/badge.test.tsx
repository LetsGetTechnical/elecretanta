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
      render(
        <Badge variant={variant} data-testid={`badge-${variant}`}>
          {variant}
        </Badge>,
      );
      const badge = screen.getByTestId(`badge-${variant}`);
      expect(badge).toBeInTheDocument();

      const classNames = badgeVariants({ variant });
      expect(badge).toHaveClass(classNames);
    });
  }

  it('renders with default variant when none is provided', () => {
    render(<Badge data-testid="badge-default">default</Badge>);
    const badge = screen.getByTestId('badge-default');
    expect(badge).toBeInTheDocument();

    const classNames = badgeVariants({ variant: 'default' });
    expect(badge).toHaveClass(classNames);
  });

  it('applies custom className alongside variant styles', () => {
    render(
      <Badge className="custom-class" data-testid="badge-custom-class">
        custom
      </Badge>,
    );
    const badge = screen.getByTestId('badge-custom-class');
    const classNames = badgeVariants({ variant: 'default' });

    expect(badge).toHaveClass(classNames);
    expect(badge).toHaveClass('custom-class');
  });
});
