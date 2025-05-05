import { AvatarImage } from './AvatarImage';
import { Root as AvatarPrimativeRoot, Image } from '@radix-ui/react-avatar';
import { render, screen } from '@testing-library/react';

jest.mock('@radix-ui/react-avatar', () => ({
  ...jest.requireActual('@radix-ui/react-avatar'),
  Image: (props: typeof Image) => <img data-testid="avatar-image" {...props} />,
}));

describe('AvatarImage', () => {
  it('renders the component', () => {
    render(
      <AvatarPrimativeRoot>
        <AvatarImage />
      </AvatarPrimativeRoot>,
    );
    const avatarImage = screen.getByTestId('avatar-image');
    expect(avatarImage).toBeInTheDocument();
  });

  it('renders with correct src and alt attributes', () => {
    render(
      <AvatarPrimativeRoot>
        <AvatarImage src="user-avatar.jpg" alt="User Avatar" />
      </AvatarPrimativeRoot>,
    );

    const avatarImage = screen.getByTestId('avatar-image');
    expect(avatarImage).toHaveAttribute('src', 'user-avatar.jpg');
    expect(avatarImage).toHaveAttribute('alt', 'User Avatar');
  });

  it('applies custom className along with default className', () => {
    render(
      <AvatarPrimativeRoot>
        <AvatarImage
          src="user-avatar.jpg"
          alt="User Avatar"
          className="custom-class"
        />
      </AvatarPrimativeRoot>,
    );

    const avatarImage = screen.getByTestId('avatar-image');
    expect(avatarImage).toHaveClass('custom-class');
  });
});
