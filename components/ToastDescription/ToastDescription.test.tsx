import React from 'react';
import { render } from '@testing-library/react';
import { ToastDescription } from './ToastDescription';

describe('ToastDescription', () => {
  it('renders the description text', () => {
    const { getByText } = render(<ToastDescription>Test Description</ToastDescription>);
    expect(getByText('Test Description')).toBeInTheDocument();
  });
});