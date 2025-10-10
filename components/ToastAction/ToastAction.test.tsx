import { ToastAction } from './ToastAction';
import { render, screen, fireEvent } from '@testing-library/react';

describe('ToastAction', () => {
  it('renders the children content within ToastAction', () => {
    render(<ToastAction altText="undo">Undo</ToastAction>);

    const toastAction = screen.getByTestId('toastAction');
    expect(toastAction).toHaveTextContent('Undo');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(
      <ToastAction altText="undo" onClick={handleClick}>
        Undo
      </ToastAction>,
    );

    fireEvent.click(screen.getByText('Undo'));
    expect(handleClick).toHaveBeenCalled();
  });
});
