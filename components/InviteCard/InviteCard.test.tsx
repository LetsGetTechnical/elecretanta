// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InviteCard } from './InviteCard';

const TEST_URL = 'http://localhost/test-url';

describe('InviteCard Component', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    jest.useFakeTimers();

    user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    window.history.pushState({}, '', TEST_URL);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();

    window.history.pushState({}, '', '/');
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
    expect(
      screen.getByRole('heading', { name: 'Invite Others' }),
    ).toBeInTheDocument();
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
    act(() => jest.advanceTimersByTime(2000));

    await waitFor(() => {
      expect(getButton()).toHaveTextContent(/copy/i);
      expect(screen.queryByText(/copied/i)).not.toBeInTheDocument();
    });
  });

  it('copies current URL to clipboard after pressing the button', async () => {
    const spy = jest
      .spyOn(navigator.clipboard, 'writeText')
      .mockResolvedValue(undefined);
    const { getButton } = renderComponent();

    await user.click(getButton());

    expect(
      await screen.findByRole('button', { name: /copied!/i }),
    ).toBeVisible();
    expect(spy).toHaveBeenCalledWith(TEST_URL);
  });

  it('logs error and keeps button label unchanged if clipboard API throws and error', async () => {
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
      expect(getButton()).toHaveTextContent(/copy invite link/i);
    });

    consoleSpy.mockRestore();
  });
});
