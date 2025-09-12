import { ToastProvider } from '@radix-ui/react-toast';
import { ToastViewport } from './ToastViewport';
import { getByTestId, render, screen } from '@testing-library/react';

const renderViewport = (props = {}) => (
    render(
         <ToastProvider>
                <ToastViewport {...props} />
            </ToastProvider>
    )
)

describe('ToastViewport', () => {
    it('renders the toast viewport', () => {
        renderViewport()
        expect(screen.getByTestId('toastViewport')).toBeInTheDocument();
    })

    it('applies default classes', () => {
        renderViewport()
        const viewport = screen.getByTestId('toastViewport');
        expect(viewport).toHaveClass('fixed top-0 z-[100]', 'max-h-screen', 'sm:bottom-0')
    })
})