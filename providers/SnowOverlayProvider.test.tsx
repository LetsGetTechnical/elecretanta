import { renderHook, act } from '@testing-library/react';
import { useSnowOverlay, SnowOverlayProvider } from './SnowOverlayProvider';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

beforeEach(() => {
  localStorage.clear();
});

describe('SnowOverlayProvider Unit Tests', () => {
  it('checks the default snow setting to be true', () => {
    const { result } = renderHook(() => useSnowOverlay(), {
      wrapper: SnowOverlayProvider,
    });

    expect(result.current.isSnowing).toBe(true);
  });

  it('toggles the snow setting from on to off', () => {
    const { result } = renderHook(() => useSnowOverlay(), {
      wrapper: SnowOverlayProvider,
    });

    act(() => {
      result.current.toggleSnowSetting();
    });

    expect(result.current.isSnowing).toBe(false);
  });
});

const SnowToggleComponent = () => {
  const { isSnowing, toggleSnowSetting } = useSnowOverlay();

  return (
    <div>
      <button data-testid="snow-button" onClick={toggleSnowSetting}>
        {isSnowing ? 'Snowing' : 'Not Snowing'}
      </button>
    </div>
  );
};

describe('SnowOverlayProvider Integration Test', () => {
  it('read then update isSnowing value in localStorage', async () => {
    render(
      <SnowOverlayProvider>
        <SnowToggleComponent />
      </SnowOverlayProvider>,
    );

    const snowToggleButton = screen.getByTestId('snow-button');

    await waitFor(() => {
      expect(snowToggleButton).toHaveTextContent('Snowing');
    });

    fireEvent.click(snowToggleButton);

    expect(snowToggleButton).toHaveTextContent('Not Snowing');
  });

  it('reads already stored isSnowing value from localStorage', async () => {
    localStorage.setItem('isSnowing', 'false');

    render(
      <SnowOverlayProvider>
        <SnowToggleComponent />
      </SnowOverlayProvider>,
    );

    const snowToggleButton = screen.getByTestId('snow-button');

    await waitFor(() => {
      expect(snowToggleButton).toHaveTextContent('Not Snowing');
    });
  });
});
