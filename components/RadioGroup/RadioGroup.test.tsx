// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { RadioGroup } from './RadioGroup';
import { RadioGroupItem } from './RadioGroupItem';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const radioGroupSetup = (customClasses?: string) => {
  render(
    <RadioGroup className={customClasses}>
      <RadioGroupItem value="option-1" data-testid="option-1" />
      <RadioGroupItem value="option-2" data-testid="option-2" />
    </RadioGroup>,
  );

  return {
    radioGroup: screen.getByTestId('radio-group'),
    option1: screen.getByTestId('option-1'),
    option2: screen.getByTestId('option-2'),
  };
};

describe('Radio Group Component', () => {
  it('renders radio group correctly with multiple radio group items', () => {
    const {
      radioGroup: radioGroupElement,
      option1: optionOneElement,
      option2: optionTwoElement,
    } = radioGroupSetup();

    expect(radioGroupElement).toBeInTheDocument();
    expect(optionOneElement).toBeInTheDocument();
    expect(optionTwoElement).toBeInTheDocument();
  });

  it('tests only one item is checked at a time', async () => {
    const {
      radioGroup: radioGroupElement,
      option1: optionOneElement,
      option2: optionTwoElement,
    } = radioGroupSetup();

    expect(radioGroupElement).toBeInTheDocument();
    expect(optionOneElement).toBeInTheDocument();
    expect(optionTwoElement).toBeInTheDocument();

    await userEvent.click(optionOneElement);
    expect(optionOneElement).toBeChecked();
    expect(optionTwoElement).not.toBeChecked();

    await userEvent.click(optionTwoElement);
    expect(optionOneElement).not.toBeChecked();
    expect(optionTwoElement).toBeChecked();
  });

  it('renders radio group with additional custom classes', () => {
    const { radioGroup: radioGroupElement } = radioGroupSetup(
      'custom-class-1 custom-class-2',
    );

    expect(radioGroupElement).toBeInTheDocument();
    expect(radioGroupElement).toHaveClass('custom-class-1 custom-class-2');
  });
});
