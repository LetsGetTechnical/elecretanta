import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToastClose } from './ToastClose';

describe('ToastClose', () => {
  it('renders a button with a close icon', () => {
    render(<ToastClose />);

    const toastClose = screen.getByTestId('toastClose');
    expect(toastClose).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<ToastClose onClick={handleClick} />);
    fireEvent.click(screen.getByTestId('toastClose'));
    expect(handleClick).toHaveBeenCalled();
    });
});
