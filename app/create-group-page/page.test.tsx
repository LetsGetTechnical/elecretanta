// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import CreateGroupPage from './page';
import userEvent from '@testing-library/user-event';

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
  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'success', id: 'test-id' }),
      }),
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderPage = () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-01-01T12:00:00Z'));
    render(<CreateGroupPage />);
    jest.useRealTimers();
  };

  it('passes validation when the all of the form field values are valid', async () => {
    renderPage();

    const user = userEvent.setup();

    // A valid Group Name
    const groupNameInput = screen.getByLabelText(/name/i); // or test-id = input
    await user.type(groupNameInput, 'My Group');

    // A valid Group Description
    const groupDescriptionInput = screen.getByLabelText(/description/i); // or test-id = textarea
    await user.type(groupDescriptionInput, 'My Group Description');

    // Open Price Range Selector
    const budgetButton = screen.getByTestId('budget-button');
    await user.click(budgetButton);

    // Select the 1st price range
    const budgetItems = screen.getAllByTestId('command-item');
    await user.click(budgetItems[0]);

    // Open Drawing Date Calendar
    const drawingDateButton = screen.getByTestId('drawing-date-button');
    await user.click(drawingDateButton);

    // Select the 15th for the Drawing Date
    const fifteenthButtons = await screen.findAllByRole('gridcell', {
      name: '15',
    });
    await user.click(fifteenthButtons[0]);

    // Open Exchange Date Calendar
    const exchangeDateButton = screen.getByTestId('exchange-date-button');
    await user.click(exchangeDateButton);

    // Select the 16th for the Exchange Date
    const sixteenthButtons = await screen.findAllByRole('gridcell', {
      name: '16',
    });
    await user.click(sixteenthButtons[0]);

    // Select the first available group image
    const imagesTiles = screen.getAllByRole('radio');
    await user.click(imagesTiles[0]);

    // Click Submit button
    const submitButton = screen.getByRole('button', { name: 'Create Group' });
    await user.click(submitButton);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/gift-exchanges',
      expect.any(Object),
    );
  });

  it('does not pass validation check when the field value for group_image is not a valid src', async () => {
    renderPage();

    const user = userEvent.setup();

    // A valid Group Name
    const groupNameInput = screen.getByLabelText(/name/i); // or test-id = input
    await user.type(groupNameInput, 'My Group');

    // A valid Group Description
    const groupDescriptionInput = screen.getByLabelText(/description/i); // or test-id = textarea
    await user.type(groupDescriptionInput, 'My Group Description');

    // Open Price Range Selector
    const budgetButton = screen.getByTestId('budget-button');
    await user.click(budgetButton);

    // Select the 1st price range
    const budgetItems = screen.getAllByTestId('command-item');
    await user.click(budgetItems[0]);

    // Open Drawing Date Calendar
    const drawingDateButton = screen.getByTestId('drawing-date-button');
    await user.click(drawingDateButton);

    // Select the 15th for the Drawing Date
    const fifteenthButtons = await screen.findAllByRole('gridcell', {
      name: '15',
    });
    await user.click(fifteenthButtons[0]);

    // Open Exchange Date Calendar
    const exchangeDateButton = screen.getByTestId('exchange-date-button');
    await user.click(exchangeDateButton);

    // Select the 16th for the Exchange Date
    const sixteenthButtons = await screen.findAllByRole('gridcell', {
      name: '16',
    });
    await user.click(sixteenthButtons[0]);

    // Click Submit button
    const submitButton = screen.getByRole('button', { name: 'Create Group' });
    await user.click(submitButton);

    expect(global.fetch).not.toHaveBeenCalled();
  });
});
