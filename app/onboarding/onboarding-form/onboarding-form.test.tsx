import { render, screen } from '@testing-library/react';
import { Onboarding } from './onboarding-form';
import userEvent from '@testing-library/user-event';

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          display_name: 'Test User',
          age_group: '25-34',
          categories: ['books & stories', 'tech & gadgets'],
          hobbies: 'Reading, coding',
          avoid: 'peanuts',
          practical_whimsical: 50,
          cozy_adventurous: 50,
          minimal_luxurious: 50,
        }),
    }),
  ) as jest.Mock;
});

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue(null),
  }),
}));

describe('Onboarding Page sliders', () => {
  it('renders all sliders with default 50, min 0, and max 100 values', async () => {
    render(<Onboarding initialStep={4} />);

    const giftPersonalitySlider = await screen.findByTestId('gift-personality');
    const experienceStyleSlider = await screen.findByTestId('experience-style');
    const giftStyleSlider = await screen.findByTestId('gift-style');

    expect(giftPersonalitySlider).toBeInTheDocument();
    const giftPersonalityThumb =
      giftPersonalitySlider.querySelector('[role="slider"]');

    expect(experienceStyleSlider).toBeInTheDocument();
    const experienceStyleThumb =
      experienceStyleSlider.querySelector('[role="slider"]');

    expect(giftStyleSlider).toBeInTheDocument();
    const giftStyleThumb = giftStyleSlider.querySelector('[role="slider"]');

    expect(giftPersonalityThumb).toHaveAttribute('aria-valuemin', '0');
    expect(experienceStyleThumb).toHaveAttribute('aria-valuemin', '0');
    expect(giftStyleThumb).toHaveAttribute('aria-valuemin', '0');

    expect(giftPersonalityThumb).toHaveAttribute('aria-valuemax', '100');
    expect(experienceStyleThumb).toHaveAttribute('aria-valuemax', '100');
    expect(giftStyleThumb).toHaveAttribute('aria-valuemax', '100');

    expect(giftPersonalityThumb).toHaveAttribute('aria-valuenow', '50');
    expect(experienceStyleThumb).toHaveAttribute('aria-valuenow', '50');
    expect(giftStyleThumb).toHaveAttribute('aria-valuenow', '50');
  });
});
