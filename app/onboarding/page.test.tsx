// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OnboardingPage from './page';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@/lib/getUserAvatar', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue('test-avatar-url'),
}));

global.fetch = jest.fn();

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver;

describe('OnboardingPage', () => {
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          display_name: 'Test User',
          age_group: '25-34',
          categories: ['books & stories'],
          hobbies: 'Reading',
          avoid: 'None',
          practical_whimsical: 50,
          cozy_adventurous: 50,
          minimal_luxurious: 50,
        }),
    });
  });

  it('loads and displays initial welcome screen', async () => {
    render(<OnboardingPage />);

    await waitFor(() => {
      expect(screen.getByText('Welcome to Elfgorithm✨')).toBeInTheDocument();
      expect(
        screen.getByText(/Let's find your perfect gift match/),
      ).toBeInTheDocument();
    });
  });

  it('completes full form submission flow', async () => {
    const user = userEvent.setup();
    render(<OnboardingPage />);

    await waitFor(() => {
      expect(screen.getByText('Welcome to Elfgorithm✨')).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('next-button'));
    await waitFor(() => {
      expect(screen.getByText('About You')).toBeInTheDocument();
    });
    await user.type(
      screen.getByRole('textbox', { name: /How should we call you\?/i }),
      'Test User',
    );

    await user.click(screen.getByTestId('next-button'));

    await user.type(
      screen.getByRole('textbox', {
        name: /tell us more about your interests/i,
      }),
      'Reading',
    );
    await user.click(screen.getByTestId('next-button'));

    await user.type(
      screen.getByRole('textbox', {
        name: /anything your Secret Santa should avoid\?/i,
      }),
      'None',
    );
    await user.click(screen.getByTestId('next-button'));

    await user.click(
      screen.getByRole('button', { name: /find my perfect gift/i }),
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/profile',
        expect.objectContaining({
          method: 'PATCH',
        }),
      );
    });
  });

  it('loads existing profile data', async () => {
    render(<OnboardingPage />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/profile',
        expect.any(Object),
      );
    });
  });

  it('redirects to profile page when in editing mode', async () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams('?editing=true'),
    );
    const user = userEvent.setup();
    render(<OnboardingPage />);

    await waitFor(() => {
      expect(screen.getByText('Welcome to Elfgorithm✨')).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('next-button'));
    await user.click(screen.getByTestId('next-button'));
    await user.click(screen.getByTestId('next-button'));
    await user.click(screen.getByTestId('next-button'));
    await user.click(screen.getByTestId('next-button'));
    await user.click(
      screen.getByRole('button', { name: /find my perfect gift/i }),
    );

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/profile');
    });
  }, 10000);
});
