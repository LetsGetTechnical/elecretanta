// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { RadioGroup } from './RadioGroup';
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
    expect(radioGroupElement).toHaveClass('custom-class-1 custom-class-2');
  });
});
