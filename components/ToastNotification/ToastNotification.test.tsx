import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToastVariants } from '@/components/ToastNotification/ToastNotification.enum';
import ToastNotification from './ToastNotification';

const allVariants = {
    [ToastVariants.Info]:{
      title: 'Info',
      message: 'Info message',
      tailwindClasses: 'bg-white',
    },
    [ToastVariants.Warning]:{
      title: 'Warning',
      message: 'Warning message',
      tailwindClasses:'bg-primaryButtonYellow',
    },
    [ToastVariants.Success]:{
      title: 'Success',
      message: 'Success message',
      tailwindClasses: 'bg-green-300',
    },
    [ToastVariants.Error]:{
      title: 'Error',
      message: 'Error message',
      tailwindClasses: 'bg-red-400',
    }
  };

describe('ToastNotification', () => {
  for(const [key, value] of Object.entries(allVariants)){
    
    it(`renders the correct variant ${key}`, () => {
      render(
        <ToastNotification 
          variant={key as ToastVariants}
          message={value.message}
        />
      );
    });
    
    it('should render the dismiss button for each notification type', () => {
      render(
        <ToastNotification 
          variant={key as ToastVariants}
          message={value.message}
        />
      );
      const dismissButton = screen.getByTestId('dismiss-button');
      expect(dismissButton).toBeInTheDocument();
    })

     it('should remove the toast when the dismiss button is clicked', () => {
      render(
        <ToastNotification 
          variant={key as ToastVariants}
          message={value.message}
        />
      );

      const dismissButton = screen.getByTestId('dismiss-button');
      fireEvent.click(dismissButton);
      expect(dismissButton).not.toBeInTheDocument();
  });
  }
});