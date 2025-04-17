// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import Avatar from './Avatar';
import { render, screen } from '@testing-library/react';

describe('AvatarFallback Component', () => {
  it('should render correctly with an image', () => {
    // Avatarfallback must be used within Avatar
    render(<Avatar userAvatar={''} />);

    const avatarFallbackElement = screen.getByTestId('avatar-fallback');
    const imgElement = screen.getByAltText("default avatar");
    
    expect(avatarFallbackElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });
});
