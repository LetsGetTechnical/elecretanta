import { Toast } from './Toast';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToastProvider } from '../ToastProvider/ToastProvider';
import { ToastViewport } from '../ToastViewport/ToastViewport';
import { ToastVariants } from './Toast.enum';

const renderToast = (props = {}) =>
  render(
    <ToastProvider>
      <Toast open={true} {...props} />
      <ToastViewport />
    </ToastProvider>
  )

const variants = [
  { name: 'default', variant: undefined, classes: ['bg-background', 'text-foreground'] },
  { name: 'error', variant: ToastVariants.Error, classes: ['bg-destructive', 'text-destructive-foreground'] },
  { name: 'warning', variant: ToastVariants.Warning, classes: ['bg-warning', 'text-warning-foreground'] },
  { name: 'success', variant: ToastVariants.Success, classes: ['bg-success', 'text-success-foreground'] },
];

describe('Toast', () => {

  it('does not render when open is false', () =>{
    renderToast({open: false})

    const toast = screen.queryByTestId('toast');
    expect(toast).not.toBeInTheDocument()
  })  
  it('applies default variant styling', () => {
    renderToast()

    const toast = screen.getByTestId('toast');
    expect(toast).toHaveClass('bg-background', 'text-foreground')
  });

  it.each(variants)('applies $name variant styles', ({ variant, classes }) => {
    renderToast({ variant });
    const toast = screen.getByTestId('toast');
    classes.forEach((classStyle) => expect(toast).toHaveClass(classStyle))
  })
});