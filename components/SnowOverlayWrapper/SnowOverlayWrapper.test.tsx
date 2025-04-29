// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import SnowOverlayWrapper from "./SnowOverlayWrapper";
import { render, screen } from '@testing-library/react'
describe('SnowOverlayWrapper', ()=>{
    it('Renders the snowOverlayWrapper', ()=>{
        render(<SnowOverlayWrapper />)
        const testSnowWrapper = screen.getByTestId("snowOverlayWrapper")
        expect(testSnowWrapper).toBeInTheDocument()
    })
})