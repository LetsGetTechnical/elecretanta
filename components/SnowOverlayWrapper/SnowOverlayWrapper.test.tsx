// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX } from 'react';
import SnowOverlayWrapper from "./SnowOverlayWrapper";
import { render, screen } from '@testing-library/react'
import { SnowOverlayProps } from 'react-snow-overlay';

const mockSnowState = { isSnowing: false}

jest.mock('@/providers/SnowOverlayProvider', ()=>({
    useSnowOverlay: () => mockSnowState
}))

const mockSnowOverlay = jest.fn()

jest.mock("react-snow-overlay", ()=>({
    SnowOverlay: (props: SnowOverlayProps): JSX.Element => {
        mockSnowOverlay(props);
        return <div />
    }
}));

describe('SnowOverlayWrapper', ()=>{
    beforeEach(()=>{
        mockSnowOverlay.mockClear()
        mockSnowState.isSnowing = false
    })
    it('Renders the snowOverlayWrapper', ()=>{
        render(<SnowOverlayWrapper />)
        const testSnowWrapper = screen.getByTestId("snowOverlayWrapper")
        expect(testSnowWrapper).toBeInTheDocument()
    })
    it('When isSnowing=false, SnowOverlay disabled prop will be true', ()=>{
        mockSnowState.isSnowing = false
        render(<SnowOverlayWrapper />)
        expect(mockSnowOverlay).toHaveBeenCalledWith(
            expect.objectContaining({ 
                disabled: true, 
                "disabledOnSingleCpuDevices": true, 
            })
        );
    })
    it('When isSnowing=true, SnowOverlay disabled prop will be false', ()=>{
        mockSnowState.isSnowing = true
        render(<SnowOverlayWrapper />)
        expect(mockSnowOverlay).toHaveBeenCalledWith(
            expect.objectContaining({ 
                disabled: false, 
                "disabledOnSingleCpuDevices": true, 
            })
        );
    })
})