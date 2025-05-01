// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { Textarea } from './textarea';

describe("Textarea", () => {
    it("renders the Textarea correctly", () => {
        render(<Textarea />)
        const textarea = screen.getByRole("textbox")
        expect(textarea).toBeInTheDocument()
    })
    it("renders the Textarea with custom className", ()=>{
        render(<Textarea className="custom-cn" />)
        const textarea = screen.getByRole("textbox")
        expect(textarea).toHaveClass("custom-cn")
    })
})