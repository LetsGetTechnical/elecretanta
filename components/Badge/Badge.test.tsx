// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Badge, BadgeProps, badgeVariants } from './Badge';
import { render, screen } from '@testing-library/react';
import { variants } from './Badge';

const variantNames = Object.keys(variants.variant) as NonNullable<
  BadgeProps['variant']
>[];

describe('Badge', () => {
  it('renders the component with default variant', () => {
    render(<Badge />);

    const badge = screen.getByTestId('badge');

    expect(badge).toBeInTheDocument();

    const classNames = badgeVariants({ variant: 'default' });
    expect(badge).toHaveClass(classNames);
  });

  for (let i = 0; i < variantNames.length; i++) {
    const variant = variantNames[i];
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

  it('renders with aria-label attribute', () => {
    render(<Badge aria-label="test" />);

    const badge = screen.getByTestId('badge');

    expect(badge).toHaveAttribute('aria-label', 'test');
  });
});
