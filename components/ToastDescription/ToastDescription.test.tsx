import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToastDescription } from './ToastDescription';

describe('ToastDescription', () => {
  it('renders the description text', () => {
    const { getByText } = render(<ToastDescription>Test Description</ToastDescription>);
    expect(getByText('Test Description')).toBeInTheDocument();
  });

  it('applies custom classNames', () => {
    render(<ToastDescription className="custom-class">Test Description</ToastDescription>)

    const toastDescription = screen.getByTestId('toastDescription');
    expect(toastDescription).toHaveClass('custom-class')
  })

  it('passes custom data attributes', () => {
    render(<ToastDescription data-custom-attribute="testValue"></ToastDescription>);
    const toastDescription = screen.getByTestId('toastDescription');
    expect(toastDescription).toHaveAttribute('data-custom-attribute', 'testValue')
  })
});