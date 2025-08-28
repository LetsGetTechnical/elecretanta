import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import ToastNotification from './ToastNotification';

describe('ToastNotification', () => {
    beforeEach(() => {
        render(
            <ToastNotification 
            title='test'
            description='description'
        />
        )
    })
    it('should render the dismiss button', () => {
        const dismissButton = screen.getByTestId('dismiss-button');
        expect(dismissButton).toBeInTheDocument();
    })
    
    it('should remove the toast when the dismiss button is clicked', () => {

        const dismissButton = screen.getByTestId('dismiss-button');
        fireEvent.click(dismissButton);
        expect(dismissButton).not.toBeInTheDocument();
    })
})