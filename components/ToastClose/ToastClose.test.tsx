import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToastClose } from './ToastClose';

describe('ToastClose', () => {
  it('renders a button with a close icon', () => {
    render(<ToastClose />);

    const toastClose = screen.getByLabelText('Close');
    expect(toastClose).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<ToastClose onClick={handleClick} />);
    fireEvent.click(screen.getByTestId('toastClose'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders a light styling for a success group', () => {
    render(
      <div className="group success">
        <ToastClose />
      </div>,
    );

    const toastClose = screen.queryByLabelText('Close');
    expect(toastClose).toHaveClass('group-[.success]:text-white/70');
  });

  it('renders a dark styling for a warning group', () => {
    render(
      <div className="group warning">
        <ToastClose />
      </div>,
    );

    const toastClose = screen.queryByLabelText('Close');
    expect(toastClose).toHaveClass('group-[.warning]:text-gray-800/70');
  });

  it('renders destructive styling for a destructive group', () => {
    render(
      <div className="group destructive">
        <ToastClose />
      </div>,
    );

    const toastClose = screen.queryByLabelText('Close');
    expect(toastClose).toHaveClass('group-[.destructive]:text-red-300');
  });
});
