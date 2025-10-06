import { Toast, toastVariantStyles } from './Toast';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToastProvider } from '../ToastProvider/ToastProvider';
import { ToastViewport } from '../ToastViewport/ToastViewport';
import { ToastVariants } from './Toast.enum';

const renderToast = (props = {}) =>
  render(
    <ToastProvider>
      <Toast {...props} />
      <ToastViewport />
    </ToastProvider>
  )

const testVariants = Object.entries(toastVariantStyles).map(([variantValue, classString]) => {
    
    const propVariant = variantValue === ToastVariants.Default ? undefined : variantValue;

    const classesToAssert = classString.split(' ').filter(c => c);

    return {
      name: variantValue,
      variant: propVariant,
      classes: classesToAssert,
    };
});

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

  it.each(testVariants)('applies $name variant styles', ({ variant, classes }) => {
    renderToast({ variant });
    const toast = screen.getByTestId('toast');
    classes.forEach((classStyle) => expect(toast).toHaveClass(classStyle))
  })

  it('renders the children content within Toast', () => {
    render(
      <ToastProvider>
        <Toast>children</Toast>
        <ToastViewport/>
      </ToastProvider>
    )

    const toast = screen.getByTestId('toast');
    expect(toast).toHaveTextContent('children');
  })
});