import { JourneyCard } from './JourneyCard';
import { render, screen } from '@testing-library/react';
import { formatDate } from '@/lib/utils';

describe('JourneyCard Component', () => {

  it('Renders the JourneyCard component with props when an exchange group is entered', () => {
    render(<JourneyCard drawingDate='2025-10-31T05:00:00+00:00' exchangeDate='2025-11-27T06:00:00+00:00'/>);

    // Verify component renders to the document
    const journeyCardElement = screen.getByTestId('journey-card');
    expect(journeyCardElement).toBeInTheDocument();

  });

  it('Verify each journey step is rendered to the document', () => {
    render(<JourneyCard drawingDate='2025-10-31T05:00:00+00:00' exchangeDate='2025-11-27T06:00:00+00:00'/>);

    const journeyStepOneElement = screen.getByTestId('journey-step-1');
    const journeyStepTwoElement = screen.getByTestId('journey-step-2');
    const journeyStepThreeElement = screen.getByTestId('journey-step-3');
    const journeyStepFourElement = screen.getByTestId('journey-step-4');

    expect(journeyStepOneElement).toBeInTheDocument();
    expect(journeyStepTwoElement).toBeInTheDocument();
    expect(journeyStepThreeElement).toBeInTheDocument();
    expect(journeyStepFourElement).toBeInTheDocument();
    
  });

  it('Verify journey steps 1 and 4 render given serialized ISO date string values', () => {
    render(<JourneyCard drawingDate='2025-10-31T05:00:00+00:00' exchangeDate='2025-11-27T06:00:00+00:00'/>);
  
    // Verifying step 1 contains the drawing date
    const drawingDateElement = screen.getByTestId('journey-step-1');
    const drawingDateValue = formatDate('2025-10-31T05:00:00+00:00');
    expect(drawingDateElement).toHaveTextContent(drawingDateValue);

    // Verifying step 4 contains the exchange date
    const exchangeDateElement = screen.getByTestId('journey-step-4');
    const exchangeDateValue = formatDate('2025-11-27T06:00:00+00:00');
    expect(exchangeDateElement).toHaveTextContent(exchangeDateValue);
  });

});
