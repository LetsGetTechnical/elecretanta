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

    return {
      user: userEvent.setup(),
      getGroupNameInput: () => screen.getByLabelText(/name/i),
      getGroupDescriptionInput: () => screen.getByLabelText(/description/i),
      getBudgetButton: () => screen.getByTestId('budget-button'),
      getBudgetItems: () => screen.getAllByTestId('command-item'),
      getDrawingDateButton: () => screen.getByTestId('drawing-date-button'),
      getFifteenthButtons: async () =>
        await screen.findAllByRole('gridcell', { name: '15' }),
      getExchangeDateButton: () => screen.getByTestId('exchange-date-button'),
      getSixteenthButtons: async () =>
        await screen.findAllByRole('gridcell', { name: '16' }),
      getImagesTiles: () => screen.getAllByRole('radio'),
      getSubmitButton: () =>
        screen.getByRole('button', { name: 'Create Group' }),
    };
  };

  it('passes validation when the all of the form field values are valid', async () => {
    const {
      user,
      getGroupNameInput,
      getGroupDescriptionInput,
      getBudgetButton,
      getBudgetItems,
      getDrawingDateButton,
      getFifteenthButtons,
      getExchangeDateButton,
      getSixteenthButtons,
      getImagesTiles,
      getSubmitButton,
    } = renderPage();

    await user.type(getGroupNameInput(), 'My Group');
    await user.type(getGroupDescriptionInput(), 'My Group Description');
    await user.click(getBudgetButton());
    await user.click(getBudgetItems()[0]);
    await user.click(getDrawingDateButton());
    await user.click((await getFifteenthButtons())[0]);
    await user.click(getExchangeDateButton());
    await user.click((await getSixteenthButtons())[0]);
    await user.click(getImagesTiles()[0]);
    await user.click(getSubmitButton());

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/gift-exchanges',
      expect.any(Object),
    );
  });

  it('does not pass validation check when the field value for group_image is not a valid src', async () => {
    const {
      user,
      getGroupNameInput,
      getGroupDescriptionInput,
      getBudgetButton,
      getBudgetItems,
      getDrawingDateButton,
      getFifteenthButtons,
      getExchangeDateButton,
      getSixteenthButtons,
      getSubmitButton,
    } = renderPage();

    await user.type(getGroupNameInput(), 'My Group');
    await user.type(getGroupDescriptionInput(), 'My Group Description');
    await user.click(getBudgetButton());
    await user.click(getBudgetItems()[0]);
    await user.click(getDrawingDateButton());
    await user.click((await getFifteenthButtons())[0]);
    await user.click(getExchangeDateButton());
    await user.click((await getSixteenthButtons())[0]);
    await user.click(getSubmitButton());

    expect(global.fetch).not.toHaveBeenCalled();
  });
});
