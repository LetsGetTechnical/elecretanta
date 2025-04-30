// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.


import { SnowOverlayToggle } from "./SnowOverlayToggle";
import { fireEvent, render, screen } from '@testing-library/react';
import { SnowOverlayProvider } from "@/providers/SnowOverlayProvider";


describe('SnowOverlayToggle', () => {
  it('Toggles the snowfall overlay', ()=> {
    render(
      <SnowOverlayProvider>
        <SnowOverlayToggle />
      </SnowOverlayProvider>,
    );
    const sunIcon = screen.getByTestId('sun-icon');
    expect(sunIcon).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('snow-overlay-toggle'));

    const snowIcon = screen.getByTestId('snow-icon');
    expect(snowIcon).toBeInTheDocument();
  })
})
