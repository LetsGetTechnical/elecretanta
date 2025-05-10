import { render, screen } from '@testing-library/react';
import GlobalGiftSpinner from './GlobalGiftSpinner';

describe('GlobalGiftSpinner', () => {

  it('should render', () => {
    render(<GlobalGiftSpinner />);
    const spinner = screen.getByTestId('global-gift-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('Initially the stroke-dasharray is 0px 1px and opacity is 0', () => {
    render(<GlobalGiftSpinner />);
    const giftIconRightSide = screen.getByTestId('gift-icon-right-side');
    const giftIconLeftSide = screen.getByTestId('gift-icon-left-side');
    expect(giftIconRightSide).toHaveAttribute('stroke-dasharray', '0px 1px');
    expect(giftIconLeftSide).toHaveAttribute('stroke-dasharray', '0px 1px');
    expect(giftIconRightSide).toHaveAttribute('opacity', '0');
    expect(giftIconLeftSide).toHaveAttribute('opacity', '0');
  });

  it('After the animation is complete, the stroke-dasharray is 1px 1px and opacity is 1', () => {
    render(<GlobalGiftSpinner />);
      const giftIconRightSide = screen.getByTestId('gift-icon-right-side');
      const giftIconLeftSide = screen.getByTestId('gift-icon-left-side');
      setTimeout(() => {
        expect(giftIconRightSide).toHaveAttribute('stroke-dasharray', '1px 1px');
        expect(giftIconLeftSide).toHaveAttribute('stroke-dasharray', '1px 1px');
        expect(giftIconRightSide).toHaveAttribute('opacity', '1');
        expect(giftIconLeftSide).toHaveAttribute('opacity', '1');
      }, 1500);
  });

  it('Partway through the animation, the first value of the stroke-dasharray is greater than 0 and less than 1', () => {
    render(<GlobalGiftSpinner />);
      const giftIconRightSide = screen.getByTestId('gift-icon-right-side');
      const giftIconLeftSide = screen.getByTestId('gift-icon-left-side');
      setTimeout(() => {            
        const strokeDashArray = giftIconRightSide.getAttribute('stroke-dasharray');
        const strokeDashArrayArray = strokeDashArray?.split(' ');
        const strokeDashArrayValue = parseFloat(strokeDashArrayArray?.[0] || '0');
        expect(strokeDashArrayValue).toBeGreaterThan(0);
        expect(strokeDashArrayValue).toBeLessThan(1);
      }, 200);
  });

  it('The animation restarts after the first animation is complete', () => {
    render(<GlobalGiftSpinner />);
      const giftIconRightSide = screen.getByTestId('gift-icon-right-side');
      const giftIconLeftSide = screen.getByTestId('gift-icon-left-side');
      setTimeout(() => {            
        const strokeDashArray = giftIconRightSide.getAttribute('stroke-dasharray');
        const strokeDashArrayArray = strokeDashArray?.split(' ');
        const strokeDashArrayValue = parseFloat(strokeDashArrayArray?.[0] || '0');
        expect(strokeDashArrayValue).toBeGreaterThan(0);
        expect(strokeDashArrayValue).toBeLessThan(1);
      }, 1700);
  });
});


