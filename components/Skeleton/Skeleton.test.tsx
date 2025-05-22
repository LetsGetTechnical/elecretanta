import { render, screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
    it('renders the component', () => {
        render(<Skeleton/>);

        const skeleton = screen.getByTestId('skeleton');
        expect(skeleton).toBeInTheDocument();
    });

    it('applies a custom className passed via props', () => {
        render(<Skeleton className="custom-class"/>);

        const skeleton = screen.getByTestId('skeleton');
        expect(skeleton).toHaveClass('custom-class');
    });
});