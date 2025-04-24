// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import { render, screen } from '@testing-library/react';
import LinkCustom from './LinkCustom';
import { describe } from 'node:test';

describe('LinkCustom Component', () => {
  it('renders with default props', () => {
    render(<LinkCustom href="https://example.com" />);
    const link = screen.getByTestId('link-custom');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('renders children', () => {
    render(<LinkCustom href="https://example.com">{'Link Text'}</LinkCustom>);
    const link = screen.getByTestId('link-custom');
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('Link Text');
  });

  it('renders with custom classes', () => {
    render(
      <LinkCustom href="https://example.com" className="test-class">
        {'Link Text'}
      </LinkCustom>,
    );
    const link = screen.getByTestId('link-custom');
    expect(link).toHaveClass('test-class');
  });
});
