import { render, screen } from '@testing-library/react';
import { Card, CardHeader } from './card'; 

describe ('Card', () => {
    it('renders Card with default styles', () => {
        render(<Card data-testid="card">Card Content</Card>);
                
        const card = screen.getByTestId('card');
                
        // is Card rendered? 
        expect(card).toBeInTheDocument();
        // is default styling present? 
        expect(card).toHaveClass('rounded-xl', 'border', 'bg-card', 'text-card-foreground', 'shadow');
        });

    it('renders a nested child component', () => {
        render(
            <Card data-testid="card">
                <CardHeader data-testid="header">Header Text</CardHeader>
            </Card>
        );

        // are Card and CardHeader components rendered? 
        const card = screen.getByTestId('card');
        const header = screen.getByTestId('header');
        expect(header).toBeInTheDocument();

        //is header inside card?
        expect(card).toContainElement(header);
    })
})
