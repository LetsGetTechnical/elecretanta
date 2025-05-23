import { render, screen } from '@testing-library/react';
import GlobalGiftSpinner from './GlobalGiftSpinner';

/**
 * Although this component shows changing the pathLength from 0 to 1, framer motion is actually changing the stroke-dasharray svg property from 0px 1px to 1px 1px and leaving the pathLength constant.
 */
describe('GlobalGiftSpinner', () => {
  it('should render', () => {
    render(<GlobalGiftSpinner />);
    const spinner = screen.getByTestId('global-gift-spinner');
    expect(spinner).toBeInTheDocument();
  });
});
