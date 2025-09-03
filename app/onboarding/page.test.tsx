import { render, screen } from '@testing-library/react';
import OnboardingPage from './page';
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
    render(<OnboardingPage />);

    const nextButton = screen.getByTestId('next-button');

    for (let i = 0; i < 4; i++) {
      await userEvent.click(nextButton);
    }

    const giftPersonalitySlider = await screen.findByTestId('gift-personality');
    const experienceStyleSlider = await screen.findByTestId('experience-style');
    const giftStyleSlider = await screen.findByTestId('gift-style');

    expect(giftPersonalitySlider).toBeInTheDocument();
    expect(experienceStyleSlider).toBeInTheDocument();
    expect(giftStyleSlider).toBeInTheDocument();

    const sliders = screen.getAllByRole('slider');
    expect(sliders.length).toBe(3);

    sliders.forEach((slider) => {
      expect(slider).toHaveAttribute('aria-valuemin', '0');
      expect(slider).toHaveAttribute('aria-valuemax', '100');
      expect(slider).toHaveAttribute('aria-valuenow', '50');
    });
  });
});
