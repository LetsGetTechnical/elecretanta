import { JourneyCard } from './JourneyCard';
import { render, screen } from '@testing-library/react';
import { formatDate } from '@/lib/utils';

describe('JourneyCard Component', () => {

  it('Renders the component given serialized ISO date string values', () => {
    render(<JourneyCard drawingDate='2025-10-31T05:00:00+00:00' exchangeDate='2025-11-27T06:00:00+00:00'/>);

    const journeyCardElement = screen.getByTestId('journey-card');
    expect(journeyCardElement).toBeInTheDocument();
    
    const drawingDateElement = screen.getByText(/we'll review who you're gifting to/)
    const drawingDateValue = formatDate('2025-10-31T05:00:00+00:00');
    expect(drawingDateElement).toHaveTextContent(drawingDateValue);

    const exchangeDateElement = screen.getByText(/Bring your wrapped gift to exchange on/)
    const exchangeDateValue = formatDate('2025-11-27T06:00:00+00:00');
    expect(exchangeDateElement).toHaveTextContent(exchangeDateValue);

  });

});
