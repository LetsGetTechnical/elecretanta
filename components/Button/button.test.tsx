import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe("Button", () => {
    it("renders the Button Component", () => {
        render(<Button data-testid="button"/>);
        const testButton = screen.getByTestId('button');
        expect(testButton).toBeInTheDocument();
    });

    it('renders the Button Component with custom className', () => {
        render(<Button className="custom-class" data-testid="button">Test</Button>);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass('custom-class');
      });

      test.each([
        ["default", "bg-primary text-primary-foreground shadow"],
        ["secondary", "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80"],
        ["destructive", "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"],
        ["outline", "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"],
        ["ghost", "hover:bg-accent hover:text-accent-foreground"],
        ["link", "text-primary underline-offset-4 hover:underline"],
      ])("Renders the Button Component with variant='%s'", (btnVariant, expectedClass) => {
        render(<Button variant={btnVariant} data-testid="button">Test</Button>);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass(expectedClass);
      })

      test.each([
        ["default","h-9 px-4 py-2"],
        ["sm","h-8 rounded-md px-3 text-xs"],
        ["lg","h-10 rounded-md px-8"],
        ["icon","h-9 w-9"]
      ])
        ('renders the Button Component with size="%s"', (btnSize, expectedClass) => {
        render(<Button size={btnSize} data-testid="button">Test</Button>);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass(expectedClass);
      });

    it("triggers Button component onClick behavior with mouse click", async () => {
        const handleClick = jest.fn(); 
        render(<Button data-testid="button" onClick={handleClick} />);
        const testButton = screen.getByTestId('button');
        await userEvent.click(testButton);
        expect(handleClick).toHaveBeenCalledTimes(1); 
    });

    it("triggers Button component onClick behavior with keyboard enter press",async () => {
      const handleClick = jest.fn(); 
      render(<Button data-testid="button" onClick={handleClick} />);
      const testButton = screen.getByTestId('button');
      testButton.focus()
      await userEvent.keyboard('{enter}');
      expect(handleClick).toHaveBeenCalledTimes(1); 
    });
    
})