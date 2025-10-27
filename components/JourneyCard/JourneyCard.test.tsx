import { JourneyCard } from './JourneyCard';
import { render, screen } from '@testing-library/react';

describe('JourneyCard Component', () => {

  it('Renders the component with proper supplied dates', () => {
    render(<JourneyCard drawingDate='2025-10-31T05:00:00+00:00' exchangeDate='2025-11-27T06:00:00+00:00'/>);

    screen.debug();
    const journeyCardElement = screen.getByTestId('journey-card');
    expect(journeyCardElement).toBeInTheDocument();

  });


});
