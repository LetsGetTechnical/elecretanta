// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { SnowOverlayToggle } from "./SnowOverlayToggle";
import { fireEvent, render, screen } from '@testing-library/react';


describe('SnowOverlayToggle', () => {
  it('Toggles the snowfall overlay', ()=> {
    render(<SnowOverlayToggle/>)
    expect(screen.queryByTestId('snow-icon')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('snow-overlay-toggle'));
    expect(screen.queryByTestId('sun-icon')).toBeInTheDocument();
  })
})
