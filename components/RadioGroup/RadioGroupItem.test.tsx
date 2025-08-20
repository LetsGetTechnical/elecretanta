// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { RadioGroup } from './RadioGroup';
import { RadioGroupItem } from './RadioGroupItem';
import { render, screen } from '@testing-library/react';

describe('Radio Group Item Component', () => {
  it('renders radio group item correctly with passed value', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="test value" />
      </RadioGroup>,
    );

    const radioGroupItemElement = screen.getByRole('radio');

    expect(radioGroupItemElement).toBeInTheDocument();
    expect(radioGroupItemElement).toHaveAttribute('value', 'test value');
  });

  it('renders radio group item correctly with additional custom classes', () => {
    render(
      <RadioGroup>
        <RadioGroupItem
          value="test value"
          className="custom-class-1 custom-class-2"
        />
      </RadioGroup>,
    );

    const radioGroupItemElement = screen.getByRole('radio');

    expect(radioGroupItemElement).toBeInTheDocument();
    expect(radioGroupItemElement).toHaveClass('custom-class-1 custom-class-2');
  });

  it('renders an empty radio group item', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="test value" />
      </RadioGroup>,
    );

    const radioGroupItemElement = screen.getByRole('radio');

    expect(radioGroupItemElement).toBeEmptyDOMElement();
  });
});
