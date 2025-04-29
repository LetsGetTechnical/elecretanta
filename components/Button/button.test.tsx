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

      it('renders with variant', () => {
        render(<Button variant="default">Test</Button>);
        const button = screen.getByRole('button', {name: /test/i});
        expect(button).toHaveClass('bg-primary text-primary-foreground shadow');
      });

      it('renders with variant', () => {
        render(<Button variant="destructive">Test</Button>);
        const button = screen.getByRole('button', {name: /test/i});
        expect(button).toHaveClass('bg-destructive');
      });

      it('renders with variant', () => {
        render(<Button variant="outline">Test</Button>);
        const button = screen.getByRole('button', {name: /test/i});
        expect(button).toHaveClass('bg-destructive');
      });

      it('renders with variant', () => {
        render(<Button variant="ghost">Test</Button>);
        const button = screen.getByRole('button', {name: /test/i});
        expect(button).toHaveClass('bg-destructive');

      });

      it('renders with variant', () => {
        render(<Button variant="secondary">Test</Button>);
        const button = screen.getByRole('button', {name: /test/i});
        expect(button).toHaveClass('bg-destructive');
      });

      it('renders with variant', () => {
        render(<Button variant="link">Test</Button>);
        const button = screen.getByRole('button', {name: /test/i});
        expect(button).toHaveClass('bg-destructive');
      });

      it('renders with size', () => {
        render(<Button size="sm">Test</Button>);
        const button = screen.getByRole('button', {name: /test/i});
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