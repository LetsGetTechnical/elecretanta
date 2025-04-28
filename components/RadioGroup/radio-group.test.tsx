// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Root as RadioGroupPrimitiveRoot } from '@radix-ui/react-radio-group';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { render, screen, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('Radio Group Component', () => {
  it('renders radio group correctly with passed children and default classes', () => {
    render(
      <RadioGroup>
        <div>Test child</div>
      </RadioGroup>,
    );

    const radioGroupElement = screen.getByTestId('radio-group');
    const testChildElement = screen.getByText('Test child');

    expect(radioGroupElement).toBeInTheDocument();
    expect(radioGroupElement).toHaveClass('grid gap-2');
    expect(testChildElement).toBeInTheDocument();
  });

  it('renders radio group with additional custom classes', () => {
    render(<RadioGroup className="custom-class-1 custom-class-2" />);

    const radioGroupElement = screen.getByTestId('radio-group');

    expect(radioGroupElement).toBeInTheDocument();
    expect(radioGroupElement).toHaveClass('grid gap-2');
    expect(radioGroupElement).toHaveClass('custom-class-1 custom-class-2');
  });

  it('renders an empty radio group', () => {
    render(<RadioGroup />);

    const radioGroupElement = screen.getByTestId('radio-group');

    expect(radioGroupElement).toBeEmptyDOMElement();
  });
});

describe('Radio Group Item Component', () => {
  it('renders radio group item correctly with default classes and passed children and value', () => {
    render(
      <RadioGroupPrimitiveRoot>
        <RadioGroupItem value="test value" aria-label="test" />
      </RadioGroupPrimitiveRoot>,
    );

    const radioGroupItemElement = screen.getByRole('radio', {
      name: 'test',
    });

    expect(radioGroupItemElement).toBeInTheDocument();
    expect(radioGroupItemElement).toHaveAttribute('value', 'test value');
    expect(radioGroupItemElement).toHaveClass(
      'aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
    );
  });

  it('renders radio group item correctly with additional custom classes', () => {
    render(
      <RadioGroupPrimitiveRoot>
        <RadioGroupItem
          value="test value"
          aria-label="test"
          className="custom-class-1 custom-class-2"
        />
      </RadioGroupPrimitiveRoot>,
    );

    const radioGroupItemElement = screen.getByRole('radio', {
      name: 'test',
    });

    expect(radioGroupItemElement).toBeInTheDocument();
    expect(radioGroupItemElement).toHaveClass(
      'aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
    );
    expect(radioGroupItemElement).toHaveClass('custom-class-1 custom-class-2');
  });

  it('renders an empty radio group item', () => {
    render(
      <RadioGroupPrimitiveRoot>
        <RadioGroupItem value="test value" aria-label="test" />
      </RadioGroupPrimitiveRoot>,
    );

    const radioGroupItemElement = screen.getByRole('radio', {
      name: 'test',
    });

    expect(radioGroupItemElement).toBeEmptyDOMElement();
  });
});

describe('Radio Group Item functionality', () => {
  it('tests for first radio group items getting clicked', () => {
    render(
      <RadioGroupPrimitiveRoot>
        <RadioGroupItem value="1" aria-label="first" />
        <RadioGroupItem value="2" aria-label="second" />
        <RadioGroupItem value="3" aria-label="third" />
      </RadioGroupPrimitiveRoot>,
    );

    const first_radioGroupItemElement = screen.getByRole('radio', {
      name: 'first',
    });
    const second_radioGroupItemElement = screen.getByRole('radio', {
      name: 'second',
    });
    const third_radioGroupItemElement = screen.getByRole('radio', {
      name: 'third',
    });

    fireEvent.click(first_radioGroupItemElement);

    expect(first_radioGroupItemElement).toHaveAttribute(
      'data-state',
      'checked',
    );
    expect(second_radioGroupItemElement).toHaveAttribute(
      'data-state',
      'unchecked',
    );
    expect(third_radioGroupItemElement).toHaveAttribute(
      'data-state',
      'unchecked',
    );
  });

  it('tests for third radio group items getting clicked', () => {
    render(
      <RadioGroupPrimitiveRoot>
        <RadioGroupItem value="1" aria-label="first" />
        <RadioGroupItem value="2" aria-label="second" />
        <RadioGroupItem value="3" aria-label="third" />
      </RadioGroupPrimitiveRoot>,
    );

    const radioGroupItemElement = screen.getAllByRole('radio');

    fireEvent.click(radioGroupItemElement[2]);

    expect(radioGroupItemElement[0]).toHaveAttribute('data-state', 'unchecked');
    expect(radioGroupItemElement[1]).toHaveAttribute('data-state', 'unchecked');
    expect(radioGroupItemElement[2]).toHaveAttribute('data-state', 'checked');
  });

  it('tests for multiple radio groups item being clicked and only last clicked gets selected', () => {
    render(
      <RadioGroupPrimitiveRoot>
        <RadioGroupItem value="1" aria-label="first" />
        <RadioGroupItem value="2" aria-label="second" />
        <RadioGroupItem value="3" aria-label="third" />
      </RadioGroupPrimitiveRoot>,
    );

    const radioGroupItemElement = screen.getAllByRole('radio');

    fireEvent.click(radioGroupItemElement[2]);
    fireEvent.click(radioGroupItemElement[1]);
    fireEvent.click(radioGroupItemElement[0]);
    fireEvent.click(radioGroupItemElement[1]);

    expect(radioGroupItemElement[0]).toHaveAttribute('data-state', 'unchecked');
    expect(radioGroupItemElement[1]).toHaveAttribute('data-state', 'checked');
    expect(radioGroupItemElement[2]).toHaveAttribute('data-state', 'unchecked');
  });

  it('tests for selecting the first radio group item with keyboard interaction', async () => {
    render(
      <RadioGroupPrimitiveRoot defaultValue="1">
        <RadioGroupItem value="1" aria-label="first" />
        <RadioGroupItem value="2" aria-label="second" />
        <RadioGroupItem value="3" aria-label="third" />
      </RadioGroupPrimitiveRoot>,
    );

    const radioGroupItemElement = screen.getAllByRole('radio');

    await userEvent.tab();

    screen.debug();

    expect(radioGroupItemElement[0]).toHaveAttribute('data-state', 'checked');
    expect(radioGroupItemElement[1]).toHaveAttribute('data-state', 'unchecked');
    expect(radioGroupItemElement[2]).toHaveAttribute('data-state', 'unchecked');
  });

  it('tests for selecting the third radio group item with keyboard interaction', async () => {
    render(
      <RadioGroupPrimitiveRoot defaultValue="1">
        <RadioGroupItem value="1" aria-label="first" />
        <RadioGroupItem value="2" aria-label="second" />
        <RadioGroupItem value="3" aria-label="third" />
      </RadioGroupPrimitiveRoot>,
    );

    const radioGroupItemElement = screen.getAllByRole('radio');

    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ }'); // Selects item

    expect(radioGroupItemElement[0]).toHaveAttribute('data-state', 'unchecked');
    expect(radioGroupItemElement[1]).toHaveAttribute('data-state', 'unchecked');
    expect(radioGroupItemElement[2]).toHaveAttribute('data-state', 'checked');
  });

  it('tests for selecting the correct radio group item after multiple keyboard interaction', async () => {
    render(
      <RadioGroupPrimitiveRoot defaultValue="1">
        <RadioGroupItem value="1" aria-label="first" />
        <RadioGroupItem value="2" aria-label="second" />
        <RadioGroupItem value="3" aria-label="third" />
      </RadioGroupPrimitiveRoot>,
    );

    const radioGroupItemElement = screen.getAllByRole('radio');

    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown>5}');
    await userEvent.keyboard('{ArrowUp>4}');
    await userEvent.keyboard('{ }'); // Selects item

    expect(radioGroupItemElement[0]).toHaveAttribute('data-state', 'unchecked');
    expect(radioGroupItemElement[1]).toHaveAttribute('data-state', 'checked');
    expect(radioGroupItemElement[2]).toHaveAttribute('data-state', 'unchecked');
  });
});
