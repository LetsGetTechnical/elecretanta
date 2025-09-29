import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToastTitle } from './ToastTitle';

describe('ToastTitle', () => {
  it('renders the title text', () => {
    const { getByText } = render(<ToastTitle>Test Title</ToastTitle>);
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('applies custom classNames', () => {
    render(<ToastTitle className="custom-class"></ToastTitle>);

    const toastTitle = screen.getByTestId('toastTitle');
    expect(toastTitle).toHaveClass('custom-class')
  })

  it('passes custom data attributes', () => {
    render(<ToastTitle data-custom-attribute="testValue"></ToastTitle>);
    const toastTitle = screen.getByTestId('toastTitle');
    expect(toastTitle).toHaveAttribute('data-custom-attribute', 'testValue')
  })
});