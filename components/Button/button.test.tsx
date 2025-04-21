import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './button';

describe("Button", () => {
    it("renders button correctly", () => {
        render(<Button />);
        const testButton = screen.getByRole("button");
        expect(testButton).toBeInTheDocument();
    });

    it('renders with custom className', () => {
        render(<Button className="custom-class">Test</Button>);
        const button = screen.getByRole('button', {name: /test/i});
        expect(button).toHaveClass('custom-class');
      });

      it('renders with variant and size', () => {
        render(<Button variant="destructive" size="sm">Test</Button>);
        const button = screen.getByRole('button', {name: /test/i});
        expect(button).toHaveClass('bg-destructive');
        expect(button).toHaveClass('h-8');
      });

    it("triggers onClick behavior", () => {
        const handleClick = jest.fn(); 
        render(<Button onClick={handleClick} />);
        const testButton = screen.getByRole("button");
        fireEvent.click(testButton);
        expect(handleClick).toHaveBeenCalledTimes(1); 
    });
})