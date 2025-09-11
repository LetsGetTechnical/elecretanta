// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen, waitFor } from '@testing-library/react';
import GlobalHeader from './GlobalHeader';
import { act } from 'react';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('GlobalHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    require('next/navigation').usePathname.mockReturnValue('/some-page');

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve('mock-avatar-url'),
      }),
    ) as jest.Mock;
  });

  it('renders correctly with default props', async () => {
    await act(async () => {
      render(<GlobalHeader />);
    });

    await waitFor(() => {
      const header = screen.getByTestId('global-header');
      expect(header).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-menu-trigger')).toBeInTheDocument();
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
