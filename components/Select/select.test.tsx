import { render, screen, fireEvent } from '@testing-library/react';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from './select';

describe('Select - basic interactions', () => {
  beforeEach(() => {
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
            <SelectItem value="orange" disabled>
              Orange
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );
  });

  it('opens the dropdown when the trigger is clicked', () => {
    expect(screen.queryByTestId('select-content')).toBeNull();
    fireEvent.click(screen.getByTestId('select-trigger'));
    expect(screen.getByTestId('select-content')).toBeInTheDocument();
  });
  it('selects an option, closes the dropdown, updates the trigger text, and marks the item as checked', () => {
    const selectTrigger = screen.getByTestId('select-trigger');
    fireEvent.click(selectTrigger);
    fireEvent.click(screen.getByRole('option', { name: 'Banana' }));
    expect(screen.queryByTestId('select-content')).toBeNull();
    expect(selectTrigger).toHaveTextContent('Banana');

    fireEvent.click(selectTrigger);
    expect(screen.getByRole('option', { name: 'Banana' })).toHaveAttribute(
      'data-state',
      'checked',
    );
  });
  it("doesn't select or close when a disabled item is clicked", () => {
    fireEvent.click(screen.getByTestId('select-trigger'));
    const disabledItem = screen.getByRole('option', { name: 'Orange' });
    fireEvent.click(disabledItem);
    expect(screen.getByTestId('select-content')).toBeInTheDocument();
    expect(screen.getByTestId('select-trigger')).toHaveTextContent('Apple');
  });
});

describe('Select - prop forwarding & child rendering', () => {
  it('forwards custom props to trigger and item', () => {
    render(
      <Select defaultValue="cookie">
        <SelectTrigger
          data-testid="custom-trigger"
          aria-label="Dessert picker"
          className="my-trigger"
        >
          <SelectValue placeholder="Pick your favorite dessert..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            data-testid="custom-item"
            value="cookie"
            aria-label="Cookie"
            className="my-item"
          >
            Cookie
          </SelectItem>
        </SelectContent>
      </Select>,
    );

    const trigger = screen.getByTestId('custom-trigger');
    expect(trigger).toHaveAttribute('aria-label', 'Dessert picker');
    expect(trigger).toHaveClass('my-trigger');

    fireEvent.click(trigger);
    const item = screen.getByTestId('custom-item');
    expect(item).toHaveAttribute('aria-label', 'Cookie');
    expect(item).toHaveClass('my-item');
  });
  it('renders arbitrary children inside trigger and items', () => {
    render(
      <Select defaultValue="cookie">
        <SelectTrigger data-testid="child-trigger">
          <span data-testid="trigger-span">Choose a dessert:</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cookie">
            <span data-testid="item-span">Yummy</span> Cookie
          </SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByTestId("trigger-span")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("child-trigger"))
    expect(screen.getByTestId("item-span")).toBeInTheDocument();
  });
});
