import { LoadingSkeleton } from './LoadingSkeleton';
import { render, screen } from '@testing-library/react';

describe('Loading Skeleton component', () => {
  it('renders the component', () => {
    render(<LoadingSkeleton />);

    const loadingSkeletonElemente = screen.getByTestId('loading-skeleton');
    expect(loadingSkeletonElemente).toBeInTheDocument();
  });


});
