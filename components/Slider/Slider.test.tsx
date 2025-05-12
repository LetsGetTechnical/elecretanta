// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(global as any).ResizeObserver = ResizeObserver;

// Pointer-capture APIs Radix calls under the hood
(global as any).HTMLElement.prototype.hasPointerCapture = () => false;
(global as any).HTMLElement.prototype.setPointerCapture = () => {};
(global as any).HTMLElement.prototype.releasePointerCapture = () => {};

import { render, screen } from '@testing-library/react';
import { Slider } from './Slider';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Slider', () => {
  it('renders the slider component', () => {
    render(<Slider />);
    const slider = screen.getByTestId('slider');
    expect(slider).toBeInTheDocument();
  });

  it('renders the component with a custom class name', () => {
    render(<Slider className="my-custom" />);
    const slider = screen.getByTestId('slider');
    expect(slider).toHaveClass('my-custom');
  });

  it('forwards child props to the slider', () => {
    render(<Slider aria-label="test-aria-label" />);
    const slider = screen.getByTestId('slider');
    expect(slider).toHaveAttribute('aria-label', 'test-aria-label');
  });

  it('calls onValueChange when ArrowRight key is pressed', async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();
    render(
      <Slider defaultValue={[0]} step={10} onValueChange={onValueChange} />,
    );

    const thumb = screen.getByRole('slider');
    await user.click(thumb);
    expect(thumb).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(onValueChange).toHaveBeenCalledWith([10]);
  });

  it("does not increment above the 'max' boundary", async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();

    render(
      <Slider
        defaultValue={[100]}
        max={100}
        step={10}
        onValueChange={onValueChange}
      />,
    );

    const thumb = screen.getByRole('slider');
    await user.click(thumb);
    await user.keyboard('{ArrowRight}');
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("does not decrement below the 'min' boundary", async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();

    render(
      <Slider
        defaultValue={[0]}
        min={0}
        step={10}
        onValueChange={onValueChange}
      />,
    );

    const thumb = screen.getByRole('slider');
    await user.click(thumb);
    await user.keyboard('{ArrowLeft}');
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
