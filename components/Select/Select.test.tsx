// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

window.HTMLElement.prototype.scrollIntoView = jest.fn();

import { render, screen } from '@testing-library/react';
import { Select, SelectGroup, SelectValue } from '@/components/Select';
import * as SelectPrimitive from '@radix-ui/react-select';

jest.mock('@radix-ui/react-select', () => {
  const originalModule = jest.requireActual('@radix-ui/react-select');
  return {
    ...originalModule,
    Root: jest.fn((props) => <div data-testid="select-root" {...props} />),
    Group: jest.fn((props) => <div role="group" {...props} />),
    Value: jest.fn((props) => <div {...props} />),
  };
});

describe('Select Components', () => {
  describe('Select', () => {
    it('renders Select component using Radix UI Root', () => {
      const testProps = {
        defaultValue: 'test-value',
        'data-custom': 'custom-root-data',
      };

      render(<Select {...testProps} />); 
      const selectRoot = screen.getByTestId('select-root');
      expect(selectRoot).toBeInTheDocument();
      expect(SelectPrimitive.Root).toHaveBeenCalledWith(
        expect.objectContaining(testProps),
        {},
      );
    });
  });

  describe('SelectGroup', () => {
    it('renders SelectGroup component using Radix UI Group', () => {
      const testProps = {
        className: 'test-class',
        'data-custom': 'custom-group-data',
      };

      render(<SelectGroup {...testProps}>Group Content</SelectGroup>);

      const selectGroup = screen.getByRole('group');
      expect(selectGroup).toBeInTheDocument();
      expect(selectGroup).toHaveTextContent('Group Content');
      expect(SelectPrimitive.Group).toHaveBeenCalledWith(
        expect.objectContaining(testProps),
        expect.anything(),
      );
    });
  });

  describe('SelectValue', () => {
    it('renders SelectValue component using Radix UI Value', () => {
      const testProps = {
        placeholder: 'Select an option',
        'data-custom': 'custom-value-data',
      };

      render(<SelectValue {...testProps}>Value Content</SelectValue>);

      const selectValue = screen.getByPlaceholderText('Select an option');
      expect(selectValue).toBeInTheDocument();
      expect(selectValue).toHaveTextContent('Value Content');
      expect(SelectPrimitive.Value).toHaveBeenCalledWith(
        expect.objectContaining(testProps),
        expect.anything(),
      );
    });
  });
});
