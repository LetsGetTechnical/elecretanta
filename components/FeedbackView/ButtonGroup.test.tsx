import { render, screen } from '@testing-library/react';
import ButtonGroup from './ButtonGroup';

it('Renders each button with the correct title and corresponding subtitle', () => {
  const buttonVariants = [
    {
      title: 'Too Expensive',
      subtitle: 'Show lower price range',
      id: 'expensive',
    },
    {
      title: 'Not Their Style',
      subtitle: 'Try different interests',
      id: 'style',
    },
    {
      title: 'They Might Have This',
      subtitle: 'Show alternatives',
      id: 'alternative',
    },
  ];
  render(
    <ButtonGroup variants={buttonVariants} handleFeedbackSubmit={() => {}} />,
  );

  buttonVariants.forEach(({ title, subtitle }) => {
    const button = screen.getByText(title).closest('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(subtitle);
  });
});

it('Renders the correct number of buttons', () => {
  const twoButtonVariants = [
    {
      title: 'Too Expensive',
      subtitle: 'Show lower price range',
      id: 'expensive',
    },
    {
      title: 'Not Their Style',
      subtitle: 'Try different interests',
      id: 'style',
    },
  ];

  render(
    <ButtonGroup
      variants={twoButtonVariants}
      handleFeedbackSubmit={() => {}}
    />,
  );

  const buttons = screen.getAllByRole('button');
  expect(buttons.length).toEqual(2);
});
