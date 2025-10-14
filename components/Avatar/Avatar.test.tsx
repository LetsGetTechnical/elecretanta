import Avatar from './Avatar';
import { AvatarImage } from './AvatarImage';
import { render, screen } from '@testing-library/react';

describe('Avatar Component', () => {
  it('renders the component', () => {
    render(<Avatar userAvatar='test-image'/>);

    const avatarElement = screen.getByTestId(/avatar-body/);
    expect(avatarElement).toBeInTheDocument();
  });

});
