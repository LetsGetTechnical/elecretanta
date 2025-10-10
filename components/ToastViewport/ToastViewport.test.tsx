import { ToastProvider } from '@radix-ui/react-toast';
import { ToastViewport } from './ToastViewport';
import { render, screen } from '@testing-library/react';

const renderViewport = (props = {}) =>
  render(
    <ToastProvider>
      <ToastViewport {...props} />
    </ToastProvider>,
  );

describe('ToastViewport', () => {
  it('renders the toast viewport', () => {
    renderViewport();
    expect(screen.getByTestId('toastViewport')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    renderViewport();
    const toastViewport = screen.getByTestId('toastViewport');
    expect(toastViewport).toHaveClass(
      'fixed top-0 z-[100]',
      'max-h-screen',
      'sm:bottom-0',
    );
  });

  it('applies custom classNames', () => {
    renderViewport({ className: 'custom-class' });
    const toastViewport = screen.getByTestId('toastViewport');
    expect(toastViewport).toHaveClass('custom-class');
  });

  it('passes custom attributes', () => {
    renderViewport({ 'data-custom-attribute': 'testValue' });
    const toastViewport = screen.getByTestId('toastViewport');
    expect(toastViewport).toHaveAttribute('data-custom-attribute', 'testValue');
  });
});
