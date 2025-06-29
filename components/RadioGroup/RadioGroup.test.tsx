// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { RadioGroup } from './RadioGroup';
import { RadioGroupItem } from './RadioGroupItem';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Radio Group Component', () => {
  it('renders radio group correctly with multiple radio group items', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option-1" data-testid="option-1" />
        <RadioGroupItem value="option-2" data-testid="option-2" />
      </RadioGroup>,
    );

    const radioGroupElement = screen.getByTestId('radio-group');
    const optionOneElement = screen.getByTestId('option-1');
    const optionTwoElement = screen.getByTestId('option-2');

    expect(radioGroupElement).toBeInTheDocument();
    expect(radioGroupElement).toHaveClass('grid gap-2');
    expect(optionOneElement).toBeInTheDocument();
    expect(optionTwoElement).toBeInTheDocument();
  });

  it('renders radio group with radio group items and no more than one item can be checked at a time', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option-1" data-testid="option-1" />
        <RadioGroupItem value="option-2" data-testid="option-2" />
      </RadioGroup>,
    );

    const radioGroupElement = screen.getByTestId('radio-group');
    const optionOneElement = screen.getByTestId('option-1');
    const optionTwoElement = screen.getByTestId('option-2');

    expect(radioGroupElement).toBeInTheDocument();
    expect(optionOneElement).toBeInTheDocument();
    expect(optionTwoElement).toBeInTheDocument();

    fireEvent.click(optionOneElement);
    expect(optionOneElement).toBeChecked();
    expect(optionTwoElement).not.toBeChecked();

    fireEvent.click(optionTwoElement);
    expect(optionOneElement).not.toBeChecked();
    expect(optionTwoElement).toBeChecked();
  });

  it('renders radio group with additional custom classes', () => {
    render(<RadioGroup className="custom-class-1 custom-class-2" />);

    const radioGroupElement = screen.getByTestId('radio-group');

    expect(radioGroupElement).toBeInTheDocument();
    expect(radioGroupElement).toHaveClass('custom-class-1 custom-class-2');
  });
});
