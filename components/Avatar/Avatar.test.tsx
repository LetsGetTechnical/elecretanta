import Avatar from './Avatar';
import { render, screen } from '@testing-library/react';
import { type ComponentProps } from 'react';

jest.mock('@radix-ui/react-avatar', () => {
  const actual = jest.requireActual('@radix-ui/react-avatar');
  return ({
    ...actual,
    Image: (props: ComponentProps<'img'>) => {
      return <img {...props}/>;
    }
  })
});

describe('Avatar Component', () => {

  it('Renders the component with user image using valid src attribute', () => {
    render(<Avatar userAvatar='https://mdbcdn.b-cdn.net/img/new/avatars/2.webp' />);

    const avatarElementWithImage = screen.getByTestId('avatar-image')
    expect(avatarElementWithImage).toBeInTheDocument();
    expect(avatarElementWithImage).toHaveAttribute(
        'src',
        'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp',
      );    

  });

  it('Renders the fallback image when src is undefined', () => {
    render(<Avatar userAvatar={undefined} />);
 
    const avatarElementFallbackImage = screen.getByTestId('avatar-fallback')
    expect(avatarElementFallbackImage).toBeInTheDocument();
  });

  it('Renders the fallback image when an invalid src is provided', () => {
    render(<Avatar userAvatar='https://mdbcdn.b-cdn.net/img/new/avatars/bad-img-url.webp' />);
 
    const avatarElementFallbackImage = screen.getByTestId('avatar-fallback')
    expect(avatarElementFallbackImage).toBeInTheDocument();
  });

});
