// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { Progress } from './progress';

describe('Progress Component', () => {
  it('renders the component and progress indicator with default aria-valuemin and aria-valuemax values when no props are passed', () => {
    render(<Progress />);

    const progressElement = screen.getByRole('progressbar');
    const indicatorElement = screen.getByTestId('progress-indicator');

    expect(progressElement).toBeInTheDocument();
    expect(progressElement).toHaveAttribute('aria-valuemin', '0');
    expect(progressElement).toHaveAttribute('aria-valuemax', '100');
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

  it('sets the aria-valuenow attribute and indicator style based on value (0)', () => {
    render(<Progress value={0} />);

    const progressElement = screen.getByRole('progressbar');
    const indicatorElement = screen.getByTestId('progress-indicator');

    expect(progressElement).toHaveAttribute('aria-valuenow', '0');
    expect(indicatorElement).toHaveStyle('transform: translateX(-100%)');
  });

  it('sets the aria-valuenow attribute and indicator style based on value (50)', () => {
    render(<Progress value={50} />);

    const progressElement = screen.getByRole('progressbar');
    const indicatorElement = screen.getByTestId('progress-indicator');

    expect(progressElement).toHaveAttribute('aria-valuenow', '50');
    expect(indicatorElement).toHaveStyle('transform: translateX(-50%)');
  });

  it('sets the aria-valuenow attribute and indicator style based on value (100)', () => {
    render(<Progress value={100} />);

    const progressElement = screen.getByRole('progressbar');
    const indicatorElement = screen.getByTestId('progress-indicator');

    expect(progressElement).toHaveAttribute('aria-valuenow', '100');
    expect(indicatorElement).toHaveStyle('transform: translateX(-0%)');
  });

  it('spreads additional props to the root element', () => {
    render(<Progress aria-label="progress-bar" />);
    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveAttribute('aria-label', 'progress-bar');
  });
});
