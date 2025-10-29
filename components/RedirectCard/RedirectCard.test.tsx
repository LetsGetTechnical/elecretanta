import { render, screen } from '@testing-library/react';
import RedirectCard from './RedirectCard';

const props = {
  className: 'classname example',
  title: 'title example',
  description: 'description example',
  buttonHref: 'button href example',
  buttonLabel: 'button label example',
};

describe('RedirectCard', () => {
  it('renders correctly no props are passed', () => {
    render(<RedirectCard />);

    const card = screen.getByTestId('redirect-card');
    expect(card).toBeInTheDocument();

    const cardTitle = screen.queryByTestId('card-title');
    expect(cardTitle).not.toBeInTheDocument();

    const cardDescription = screen.queryByTestId('card-description');
    expect(cardDescription).not.toBeInTheDocument();

    const button = screen.getByRole('link');
    expect(button).toHaveAttribute('href', '/');
    expect(button).toHaveTextContent(/home/i);
  });

  it('renders and correctly passes all props', () => {
    render(<RedirectCard {...props} />);

    const card = screen.getByTestId('redirect-card');
    expect(card).toHaveClass(props.className);

    const cardTitle = screen.getByTestId('card-title');
    expect(cardTitle).toHaveTextContent(props.title);

    const cardDescription = screen.getByTestId('card-description');
    expect(cardDescription).toHaveTextContent(props.description);

    const button = screen.getByRole('link');
    expect(button).toHaveAttribute('href', props.buttonHref);
    expect(button).toHaveTextContent(props.buttonLabel);
  });
});
