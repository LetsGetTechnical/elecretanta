import { InviteCard } from './InviteCard';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('InviteCard', () => {
  const mockInviteUrl = 'https://example.com/invite-123';
  const originalClipboard: Clipboard = global.navigator.clipboard;

  beforeEach(() => {
    // Replacing navigator clipboard with custom implementation
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn(),
      },
      configurable: true,
    });
  });

  afterEach(() => {
    // Restores the original navigator clipboard
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      configurable: true,
    });
  });

  it('renders the InviteCard with input and link', () => {
    render(<InviteCard inviteLink={mockInviteUrl} />);

    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', {
      name: /Copy invite link/i,
    });

    expect(buttonElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  it('renders the input with correct invite link', () => {
    render(<InviteCard inviteLink={mockInviteUrl} />);

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveAttribute('value', mockInviteUrl);
  });

  it('copies correct invite link to clipboard', async () => {
    render(<InviteCard inviteLink={mockInviteUrl} />);

    const buttonElement = screen.getByRole('button', {
      name: /Copy invite link/i,
    });

    await userEvent.click(buttonElement);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockInviteUrl);
  });
});
