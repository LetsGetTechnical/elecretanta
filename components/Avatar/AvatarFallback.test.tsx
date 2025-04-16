// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import Avatar from './Avatar';
import { render, screen } from '@testing-library/react';

describe('AvatarFallback Component', () => {
  it('should render correctly inside Avatar component', () => {
    // Avatarfallback must be used within Avatar
    render(<Avatar userAvatar={''} />);

    const avatarFallbackElement = screen.getByTestId('avatar-fallback');

    expect(avatarFallbackElement).toBeInTheDocument();
  });
});
