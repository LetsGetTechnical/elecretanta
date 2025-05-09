// Initially pathLength is 0
// Initially opacity is 0
// When the component mounts, the pathLength should be 1
// When the component mounts, the opacity should be 1

import { render, screen } from '@testing-library/react';
import GlobalGiftSpinner from './GlobalGiftSpinner';

describe('GlobalGiftSpinner', () => {
  it('should render', () => {
    render(<GlobalGiftSpinner />);
    const spinner = screen.getByTestId('global-gift-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('Initially the pathLength is 0 and opacity is 0', () => {
    render(<GlobalGiftSpinner />);
    const giftIconRightSide = screen.getByTestId('gift-icon-right-side');
    const giftIconLeftSide = screen.getByTestId('gift-icon-left-side');
    expect(giftIconRightSide).toHaveAttribute('stroke-dasharray', '0px 1px');
    expect(giftIconLeftSide).toHaveAttribute('stroke-dasharray', '0px 1px');
    expect(giftIconRightSide).toHaveAttribute('opacity', '0');
    expect(giftIconLeftSide).toHaveAttribute('opacity', '0');
  });

  it('After the animation is complete, the pathLength is 1 and opacity is 1', () => {
    render(<GlobalGiftSpinner />);
    setTimeout(() => {
      const giftIconRightSide = screen.getByTestId('gift-icon-right-side');
      const giftIconLeftSide = screen.getByTestId('gift-icon-left-side');
      screen.debug(giftIconRightSide);
      expect(giftIconRightSide).toHaveAttribute('stroke-dasharray', '1px 1px');
      expect(giftIconLeftSide).toHaveAttribute('stroke-dasharray', '1px 1px');
      expect(giftIconRightSide).toHaveAttribute('opacity', '1');
      expect(giftIconLeftSide).toHaveAttribute('opacity', '1');
    }, 2000);
  });
});

