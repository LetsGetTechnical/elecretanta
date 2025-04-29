import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './button';

describe("Button", () => {
    it("renders button correctly", () => {
        render(<Button />);
        const testButton = screen.getByRole("button");
        expect(testButton).toBeInTheDocument();
    });

    it('renders with custom className', () => {
        render(<Button className="custom-class" data-testid="button">Test</Button>);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass('custom-class');
      });

      it('renders with variant', () => {
        render(<Button variant="default" data-testid="button">Test</Button>);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass('bg-primary text-primary-foreground shadow');
      });

      it('renders with variant', () => {
        render(<Button variant="destructive" data-testid="button">Test</Button>);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass('bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90');
      });

      it('renders with variant', () => {
        render(<Button variant="outline" data-testid="button">Test</Button>);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass('border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground');
      });

      it('renders with variant', () => {
        render(<Button variant="ghost" data-testid="button">Test</Button>);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass('hover:bg-accent hover:text-accent-foreground');

      });

      it('renders with variant', () => {
        render(<Button variant="secondary" data-testid="button">Test</Button>);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass('bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80');
      });

      it('renders with variant', () => {
        render(<Button variant="link" data-testid="button">Test</Button>);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass('text-primary underline-offset-4 hover:underline');
      });

      it('renders with size', () => {
        render(<Button size="default" data-testid="button">Test</Button>);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass('h-9 px-4 py-2');
      });

      it('renders with size', () => {
        render(<Button size="sm" data-testid="button">Test</Button>);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass('h-8 rounded-md px-3 text-xs');
      });

      it('renders with size', () => {
        render(<Button size="lg" data-testid="button">Test</Button>);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass('h-10 rounded-md px-8');
      });

      it('renders with size', () => {
        render(<Button size="icon" data-testid="button">Test</Button>);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass('h-9 w-9');
      });

    it("triggers onClick behavior with mouse click", () => {
        const handleClick = jest.fn(); 
        render(<Button data-testid="button" onClick={handleClick} />);
        const testButton = screen.getByTestId('button');
        fireEvent.click(testButton);
        expect(handleClick).toHaveBeenCalledTimes(1); 
    });

    it("triggers onClick behavior with keyboard enter press", () => {
      const handleClick = jest.fn(); 
      render(<Button data-testid="button" onClick={handleClick} />);
      const testButton = screen.getByTestId('button');
      fireEvent.keyDown(testButton, { key: "Enter", code: "Enter", charCode: 13 });
      expect(handleClick).toHaveBeenCalledTimes(1); 
    });
    
})