import Avatar from './Avatar';
import { render, screen } from '@testing-library/react';

jest.mock('@radix-ui/react-avatar', () => {
  const actual = jest.requireActual('@radix-ui/react-avatar');
  return ({
    ...actual,
    Image: ({src, alt, ...props}: {src?: string, alt?: string}) => {
      return <img data-testid="avatar-image" src={src} alt={alt} {...props}/>;
    }
  })
});

describe('Avatar Component', () => {

  it('Renders the component with user image using valid src attribute', () => {
    render(<Avatar userAvatar='https://mdbcdn.b-cdn.net/img/new/avatars/2.webp' />);

    const avatarElementWithImage = screen.getByRole('img', { name: 'user avatar'});
    expect(avatarElementWithImage).toBeInTheDocument();
    expect(avatarElementWithImage).toHaveAttribute(
        'src',
        'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp',
      );    

  });

  it('Renders the fallback image when src is undefined', () => {
    render(<Avatar userAvatar={undefined} />);
 
    const avatarElementFallbackImage = screen.getByRole('img', { name: 'default avatar'});
    expect(avatarElementFallbackImage).toBeInTheDocument();
  });

});
