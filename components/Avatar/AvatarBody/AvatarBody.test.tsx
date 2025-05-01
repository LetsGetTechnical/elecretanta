// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { AvatarBody } from './AvatarBody';
import { render, screen } from '@testing-library/react';

describe('AvatarBody Component', () => {
  it('renders correctly with passed children', () => {
    render(
      <AvatarBody>
        <div>Test child</div>
      </AvatarBody>,
    );

    const avatarBodyElement = screen.getByTestId('avatar-body');
    const testChild = screen.getByText('Test child');

    expect(avatarBodyElement).toBeInTheDocument();
    expect(testChild).toBeInTheDocument();
  });

  it('renders the component with custom classes', () => {
    render(
      <AvatarBody className="custom-class">
        <div>Test child</div>
      </AvatarBody>,
    );

    const avatarBodyElement = screen.getByTestId('avatar-body');

    expect(avatarBodyElement).toHaveClass('custom-class');
  });

  it('renders correctly with no children', () => {
    render(<AvatarBody />);

    const avatarBodyElement = screen.getByTestId('avatar-body');

    expect(avatarBodyElement).toBeEmptyDOMElement();
  });

  it('renders with custom attributes', () => {
    render(<AvatarBody custom-prop="customProp" />);

    const avatarBodyElement = screen.getByTestId('avatar-body');

    expect(avatarBodyElement).toHaveAttribute('custom-prop', 'customProp');
  });
});
