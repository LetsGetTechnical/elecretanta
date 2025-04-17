// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import Avatar from '../Avatar';
import { render, screen } from '@testing-library/react';

describe('AvatarFallback Component', () => {
  it('should render correctly with an image', () => {
    // Avatarfallback must be used within Avatar
    render(<Avatar userAvatar={''} />);

    const avatarFallbackElement = screen.getByTestId('avatar-fallback');
    const imgElement = screen.getByAltText("default avatar");
    
    expect(avatarFallbackElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg');
  });
});
