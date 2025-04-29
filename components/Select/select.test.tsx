// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

window.HTMLElement.prototype.scrollIntoView = jest.fn();

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
} from '@/components/Select';

describe('Select', () => {
  it("Select renders it's children", () => {
    render(
      <Select defaultValue="default-select-value">
        <SelectGroup>
          <SelectValue>hello</SelectValue>
        </SelectGroup>
      </Select>,
    );
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});

// describe('Select - basic interactions', () => {
//   beforeEach(() => {
//     render(
//       <Select defaultValue="apple">
//         <SelectTrigger>
//           <SelectValue placeholder="Pick a fruit..." />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectLabel>Fruits</SelectLabel>
//             <SelectItem value="apple">Apple</SelectItem>
//             <SelectItem value="banana">Banana</SelectItem>
//             <SelectItem value="orange" disabled>
//               Orange
//             </SelectItem>
//           </SelectGroup>
//         </SelectContent>
//       </Select>,
//     );
//   });

//   it('opens the dropdown when the trigger is clicked', () => {
//     expect(screen.queryByTestId('select-content')).toBeNull();
//     fireEvent.click(screen.getByTestId('select-trigger'));
//     expect(screen.getByTestId('select-content')).toBeInTheDocument();
//   });

//   it('selects an option, closes the dropdown, updates the trigger text, and marks the item as checked', () => {
//     const selectTrigger = screen.getByTestId('select-trigger');
//     fireEvent.click(selectTrigger);
//     fireEvent.click(screen.getByRole('option', { name: 'Banana' }));
//     expect(screen.queryByTestId('select-content')).toBeNull();
//     expect(selectTrigger).toHaveTextContent('Banana');

//     fireEvent.click(selectTrigger);
//     expect(screen.getByRole('option', { name: 'Banana' })).toHaveAttribute(
//       'data-state',
//       'checked',
//     );
//   });

//   it("doesn't select or close when a disabled item is clicked", () => {
//     fireEvent.click(screen.getByTestId('select-trigger'));
//     const disabledItem = screen.getByRole('option', { name: 'Orange' });
//     fireEvent.click(disabledItem);
//     expect(screen.getByTestId('select-content')).toBeInTheDocument();
//     expect(screen.getByTestId('select-trigger')).toHaveTextContent('Apple');
//   });
// });

// describe('Select - prop forwarding & child rendering', () => {
//   it('forwards custom props to trigger and item', () => {
//     render(
//       <Select defaultValue="cookie">
//         <SelectTrigger aria-label="Dessert picker" className="my-trigger">
//           <SelectValue placeholder="Pick your favorite dessert..." />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="cookie" aria-label="Cookie" className="my-item">
//             Cookie
//           </SelectItem>
//         </SelectContent>
//       </Select>,
//     );

//     const trigger = screen.getByTestId('select-trigger');
//     expect(trigger).toHaveAttribute('aria-label', 'Dessert picker');
//     expect(trigger).toHaveClass('my-trigger');

//     fireEvent.click(trigger);
//     const item = screen.getByRole('option', { name: 'Cookie' });
//     expect(item).toHaveAttribute('aria-label', 'Cookie');
//     expect(item).toHaveClass('my-item');
//   });
//   it('renders arbitrary children inside trigger and items', () => {
//     render(
//       <Select defaultValue="cookie">
//         <SelectTrigger>
//           <span>Choose a dessert:</span>
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="cookie">
//             <span>Yummy</span> Cookie
//           </SelectItem>
//         </SelectContent>
//       </Select>,
//     );
//     const selectTrigger = screen.getByTestId('select-trigger');
//     const triggerSpan = within(selectTrigger).getByText('Choose a dessert:');
//     expect(triggerSpan).toBeInTheDocument();

//     fireEvent.click(selectTrigger);
//     const selectItem = screen.getByRole('option', { name: 'Yummy Cookie' });
//     const itemSpan = within(selectItem).getByText('Yummy');
//     expect(itemSpan).toBeInTheDocument();
//   });
// });

describe('Select - keyboard accessibility', () => {
  let user: ReturnType<typeof userEvent.setup>;
  let trigger: HTMLElement;

  beforeEach(() => {
    user = userEvent.setup();
    render(
      <Select defaultValue="apple">
        <SelectTrigger>
          <SelectValue placeholder="Pick a fruit..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );
    trigger = screen.getByTestId('select-trigger');
    trigger.focus();
  });

  it('opens the dropdown menu with the Enter key', async () => {
    await user.keyboard('{Enter}');
    expect(screen.getByTestId('select-content')).toBeVisible();
  });

  it('navigates with ArrowDown, selects Banana with Enter, and closes the dropdown', async () => {
    await user.keyboard('{Enter}{ArrowDown}{ArrowDown}{Enter}');
    expect(screen.queryByTestId('select-content')).toBeNull();
    expect(trigger).toHaveTextContent('Banana');
  });
});
