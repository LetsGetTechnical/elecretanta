import { ComponentPropsWithoutRef } from 'react';
import Avatar from './Avatar';
import { render, screen } from '@testing-library/react';
import { Image } from '@radix-ui/react-avatar';

const FALLBACK_IMAGE_URL =
  'https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg';

jest.mock('@radix-ui/react-avatar', () => {
  return {
    ...jest.requireActual('@radix-ui/react-avatar'),
    Image: ({ src, ...props }: ComponentPropsWithoutRef<typeof Image>) => {
      if (!src || src.includes('invalid-url')) return null;

      return <img src={src} {...props} />;
    },
  };
});

describe('AvatarImage', () => {
  it('renders the component', () => {
    render(<Avatar userAvatar={undefined} />);

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('renders with fallback image when no userAvatar is provided', () => {
    render(<Avatar userAvatar={undefined} />);

    const avatar = screen.getByTestId('avatar');
    const avatarImage = avatar.querySelector('img');
    expect(avatarImage).toHaveAttribute('alt', 'default avatar');
    expect(avatarImage).toHaveAttribute('src', FALLBACK_IMAGE_URL);
  });

  it('renders with userAvatar when provided', () => {
    const userAvatar = 'https://placecats.com/200/200';

    render(<Avatar userAvatar={userAvatar} />);

    const avatar = screen.getByTestId('avatar');
    const avatarImage = avatar.querySelector('img');
    expect(avatarImage).toHaveAttribute('src', userAvatar);
  });

  it('renders with fallback image if userAvatar fails to load', () => {
    const userAvatar = 'https://invalid-url.com/image.jpg';

    render(<Avatar userAvatar={userAvatar} />);

    const avatar = screen.getByTestId('avatar');
    const avatarImage = avatar.querySelector('img');
    expect(avatarImage).toHaveAttribute('alt', 'default avatar');
    expect(avatarImage).toHaveAttribute('src', FALLBACK_IMAGE_URL);
  });
});
