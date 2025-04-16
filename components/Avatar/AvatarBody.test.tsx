// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { AvatarBody } from './AvatarBody';
import { render, screen } from '@testing-library/react';

describe('AvatarBody Component', () => {
  it('should render correctly', () => {
    render(<AvatarBody />);

    const avatarBodyElement = screen.getByTestId('avatar-body');

    expect(avatarBodyElement).toBeInTheDocument();
  });

  it('should render correctly with passed children', () => {
    render(
      <AvatarBody>
        <div>Test</div>
      </AvatarBody>,
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
