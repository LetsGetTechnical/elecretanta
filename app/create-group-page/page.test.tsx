// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import CreateGroupPage from './page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver;

describe('Create Group Page', () => {
  describe('Close (X) button', () => {
    it('renders the X button with the correct href', () => {
      render(<CreateGroupPage />);

      expect(screen.getByTestId('x-button')).toHaveAttribute(
        'href',
        '/dashboard',
      );
    });

    describe('Cancel button', () => {
      it('renders the Cancel button with the correct href', () => {
        render(<CreateGroupPage />);

        expect(screen.getByRole('link', { name: /cancel/i })).toHaveAttribute(
          'href',
          '/dashboard',
        );
      });
    });
  });
});
