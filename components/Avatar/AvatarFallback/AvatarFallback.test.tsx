// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { AvatarFallback } from './AvatarFallback';
import { Root as AvatarPrimitiveRoot } from '@radix-ui/react-avatar';
import { render, screen } from '@testing-library/react';

describe('AvatarFallback Component', () => {
  it('renders the component with image as child', () => {
    render(
      <AvatarPrimitiveRoot>
        <AvatarFallback>
          <img src="fallback-image.jpg" alt="default avatar" />
        </AvatarFallback>
      </AvatarPrimitiveRoot>,
    );

    const avatarFallbackElement = screen.queryByTestId('avatar-fallback');
    const imgElement = screen.queryByRole('img');

    expect(avatarFallbackElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });

  it('renders the component with custom classes', () => {
    render(
      <AvatarPrimitiveRoot>
        <AvatarFallback className="custom-class">
          <img src="fallback-image.jpg" alt="default avatar" />
        </AvatarFallback>
      </AvatarPrimitiveRoot>,
    );

    const avatarFallbackElement = screen.queryByTestId('avatar-fallback');

    expect(avatarFallbackElement).toHaveClass('custom-class');
  });

  it('renders the component with no children', () => {
    render(
      <AvatarPrimitiveRoot>
        <AvatarFallback />
      </AvatarPrimitiveRoot>,
    );

    const avatarFallbackElement = screen.queryByTestId('avatar-fallback');

    expect(avatarFallbackElement).toBeEmptyDOMElement();
  });
});
