// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { Progress } from './progress';

describe('Progress Component', () => {
  it('renders the component and progress indicator when no props are passed', () => {
    render(<Progress />);

    const progressElement = screen.getByRole('progressbar');
    const indicatorElement = screen.getByTestId('progress-indicator');

    expect(progressElement).toBeInTheDocument();
    expect(indicatorElement).toBeInTheDocument();
  });

  it('applies custom className to the progress element', () => {
    render(<Progress className="custom-class" />);
    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveClass('custom-class');
  });

  it('applies indicatorClassName to the indicator', () => {
    render(<Progress indicatorClassName="indicator-custom-class" />);
    const indicatorElement = screen.getByTestId('progress-indicator');
    expect(indicatorElement).toHaveClass('indicator-custom-class');
  });

  it('sets the indicator style based on value (0)', () => {
    render(<Progress value={0} />);
    const indicatorElement = screen.getByTestId('progress-indicator');
    expect(indicatorElement).toHaveAttribute('data-value', '0');
  });

  it('sets the indicator style based on value (50)', () => {
    render(<Progress value={50} />);
    const indicatorElement = screen.getByTestId('progress-indicator');
    expect(indicatorElement).toHaveAttribute('data-value', '50');
  });

  it('set the indicator style based on value (100)', () => {
    render(<Progress value={100} />);
    const indicatorElement = screen.getByTestId('progress-indicator');
    expect(indicatorElement).toHaveAttribute('data-value', '100');
  });

  it('spreads additional props to the root element', () => {
    render(<Progress aria-label="progress-bar" />);
    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveAttribute('aria-label', 'progress-bar');
  });
});
