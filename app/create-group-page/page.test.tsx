// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from "@testing-library/react"
import CreateGroupPage from "./page"
import userEvent from "@testing-library/user-event";

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

// Store original Date constructor
const OriginalDate = global.Date;

describe("Create Group Page", () => {
  beforeEach(() => {
    const mockDate = new Date('2025-01-01T12:00:00Z');
    global.Date = (class extends OriginalDate {
      constructor(...args: any[]) {
        if (args.length) {
          // Use Reflect.construct to forward arbitrary argument lists to the original Date constructor
          // and ensure the correct prototype/newTarget is used for the subclass instance.
          // Use new.target instead of accessing `this` before calling super.
          return Reflect.construct(OriginalDate, args, (new.target as any)) as unknown as Date;
        } else {
          super(mockDate.getTime());
        }
      }
      
      static now() {
        return mockDate.getTime();
      }
    }) as unknown as DateConstructor;

    Element.prototype.scrollIntoView = jest.fn();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'success', id: 'test-id' }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    global.Date = OriginalDate;
    jest.restoreAllMocks();
  });

  it('passes validation when the all of the form field values are valid', async () => {
    render(<CreateGroupPage/>)
    
    const user = userEvent.setup()

    // A valid Group Name
    const groupNameInput = screen.getByLabelText(/name/i)  // or test-id = input
    await user.type(groupNameInput, 'My Group');

    // A valid Group Description
    const groupDescriptionInput = screen.getByLabelText(/description/i)  // or test-id = textarea
    await user.type(groupDescriptionInput, 'My Group Description');
    
    // Open Price Range Selector
    const budgetButton = screen.getByTestId("budget-button")
    await user.click(budgetButton)
    
    // Select the 1st price range
    const budgetItems = screen.getAllByTestId("command-item")
    await user.click(budgetItems[0])

    // Open Drawing Date Calendar
    const drawingDateButton = screen.getByTestId("drawing-date-button")
    await user.click(drawingDateButton)
    
    // Select the 15th for the Drawing Date
    const fifteenthButtons = await screen.findAllByRole("gridcell", { name: "15" })
    await user.click(fifteenthButtons[0])
    
    // Open Exchange Date Calendar
    const exchangeDateButton = screen.getByTestId("exchange-date-button")
    await user.click(exchangeDateButton)

    // Select the 16th for the Exchange Date
    const sixteenthButtons = await screen.findAllByRole("gridcell", { name: "16" })
    await user.click(sixteenthButtons[0])
    
    // Select the first available group image
    const imagesTiles = screen.getAllByRole('radio')
    await user.click(imagesTiles[0]);

    // Click Submit button
    const submitButton = screen.getByRole('button', {name: "Create Group"})
    await user.click(submitButton)
    
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/api/gift-exchanges', expect.any(Object));    
  })
  
  it('does not pass validation check when the field value for group_image is not a valid src', async () => {
    render(<CreateGroupPage/>)
    
    const user = userEvent.setup()

    // A valid Group Name
    const groupNameInput = screen.getByLabelText(/name/i)  // or test-id = input
    await user.type(groupNameInput, 'My Group');

    // A valid Group Description
    const groupDescriptionInput = screen.getByLabelText(/description/i)  // or test-id = textarea
    await user.type(groupDescriptionInput, 'My Group Description');
    
    // Open Price Range Selector
    const budgetButton = screen.getByTestId("budget-button")
    await user.click(budgetButton)
    
    // Select the 1st price range
    const budgetItems = screen.getAllByTestId("command-item")
    await user.click(budgetItems[0])

    // Open Drawing Date Calendar
    const drawingDateButton = screen.getByTestId("drawing-date-button")
    await user.click(drawingDateButton)
    
    // Select the 15th for the Drawing Date
    const fifteenthButtons = await screen.findAllByRole("gridcell", { name: "15" })
    await user.click(fifteenthButtons[0])
    
    // Open Exchange Date Calendar
    const exchangeDateButton = screen.getByTestId("exchange-date-button")
    await user.click(exchangeDateButton)

    // Select the 16th for the Exchange Date
    const sixteenthButtons = await screen.findAllByRole("gridcell", { name: "16" })
    await user.click(sixteenthButtons[0])

    // Click Submit button
    const submitButton = screen.getByRole('button', {name: "Create Group"})
    await user.click(submitButton)
    
    expect(global.fetch).not.toHaveBeenCalled();
  })
})