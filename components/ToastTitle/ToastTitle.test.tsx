import React from 'react';
import { render } from '@testing-library/react';
import { ToastTitle } from './ToastTitle';

describe('ToastTitle', () => {
  it('renders the title text', () => {
    const { getByText } = render(<ToastTitle>Test Title</ToastTitle>);
    expect(getByText('Test Title')).toBeInTheDocument();
  });
});