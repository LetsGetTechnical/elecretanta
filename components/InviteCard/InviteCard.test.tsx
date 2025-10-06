// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InviteCard } from './InviteCard';

describe('InviteCard Component', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    jest.useFakeTimers();

    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    delete (window as any).location;
    window.location = { href: 'http://localhost:4000/test-url' } as any;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const renderComponent = () => {
    render(<InviteCard />);
    return {
      getButton: () => screen.getByRole('button'),
    };
  };

  it('renders the component with correct elements', () => {
    const { getButton } = renderComponent();

    expect(getButton()).toBeInTheDocument();
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByText('Invite Others')).toBeInTheDocument();
  });

  it('displays the text "Copy invite link" upon initial render', () => {
    const { getButton } = renderComponent();
    expect(getButton()).toHaveTextContent(/copy/i);
  });

  it('displays the text "Copied!" after pressing the button', async () => {
    const { getButton } = renderComponent();

    await user.click(getButton());

    await waitFor(() => {
      expect(getButton()).toHaveTextContent(/copied/i);
    });
  });

  it('reverts to button original state after 2000ms', async () => {
    const { getButton } = renderComponent();

    await user.click(getButton());
    await waitFor(() => {
      expect(getButton()).toHaveTextContent(/copied/i);
    });
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(getButton()).toHaveTextContent(/copy/i);
      expect(screen.queryByText(/copied/i)).not.toBeInTheDocument();
    });
  });

  it('copies current URL to clipboard after pressing the button', async () => {
    const mockWriteText = jest.fn().mockResolvedValue(undefined);
    navigator.clipboard.writeText = mockWriteText;
    const { getButton } = renderComponent();

    await user.click(getButton());

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith(
        'http://localhost:4000/test-url',
      );
    });
  });

  it('logs clipboard API errors to the console correctly', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    navigator.clipboard.writeText = jest
      .fn()
      .mockRejectedValue(new Error('Clipboard error!'));
    const { getButton } = renderComponent();

    await user.click(getButton());

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to copy:',
        expect.any(Error),
      );
    });

    consoleSpy.mockRestore();
  });
});
