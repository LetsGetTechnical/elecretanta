// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Root as RadioGroupPrimitiveRoot } from '@radix-ui/react-radio-group';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { render, screen } from '@testing-library/react';

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
