// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen, waitFor } from '@testing-library/react';
import GlobalHeader from './GlobalHeader';
import { act } from 'react';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('@/lib/getUserAvatar', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue('mock-avatar-url'),
}));

describe('GlobalHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    require('next/navigation').usePathname.mockReturnValue('/some-page');
  });

  it('renders correctly with default props', async () => {
    await act(async () => {
      render(<GlobalHeader />);
    });

    await waitFor(() => {
      const header = screen.getByTestId('global-header');
      expect(header).toBeInTheDocument();

      expect(screen.getByTestId('nav-logo-link')).toBeInTheDocument();

      expect(screen.getByTestId('avatar-body')).toBeInTheDocument();
      expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument();

      const snowOverlayToggleButton = screen.getByTestId('snow-overlay-toggle');
      expect(snowOverlayToggleButton).toBeInTheDocument();
    });
  });

  it('is hidden on the homepage', async () => {
    require('next/navigation').usePathname.mockReturnValue('/');

    await act(async () => {
      render(<GlobalHeader />);
    });

    await waitFor(() => {
      const header = screen.getByTestId('global-header');
      expect(header).toHaveClass('hidden');
    });
  });

  it('contains a link to the profile page', async () => {
    await act(async () => {
      render(<GlobalHeader />);
    });

    await waitFor(() => {
      const avatarLink = screen.getByTestId('avatar-link');
      expect(avatarLink).toBeInTheDocument();
      expect(avatarLink).toHaveAttribute('href', '/profile');
    });
  });

  it('contains a link to the dashboard page', async () => {
    await act(async () => {
      render(<GlobalHeader />);
    });

    await waitFor(() => {
      const dashboardLink = screen.getByTestId('nav-logo-link');
      expect(dashboardLink).toBeInTheDocument();
      expect(dashboardLink).toHaveAttribute('href', '/dashboard');
    });
  });

  it('renders with default classnames', async () => {
    await act(async () => {
      render(<GlobalHeader />);
    });

    await waitFor(() => {
      const header = screen.getByTestId('global-header');
      expect(header).toHaveClass(
        'flex items-center justify-between bg-elfHeaderGreen h-20',
      );
    });
  });
});
