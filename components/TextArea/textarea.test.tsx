// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import { Textarea } from './textarea';

describe("Textarea", () => {
    it("Renders the Textarea correctly", () => {
        render(<Textarea />)
        const textarea = screen.getByRole("textbox")
        expect(textarea).toBeInTheDocument()
    })
    it("Renders the Textarea with custom className", ()=>{
        render(<Textarea className="custom-cn" />)
        const textarea = screen.getByRole("textbox")
        expect(textarea).toHaveClass("custom-cn")
    })
    it("Renders the Textarea with props", ()=>{
        render(
            <Textarea 
                placeholder="test-placeholder"
                name="test-name"
                defaultValue="test-value"
            />)
        const textarea = screen.getByRole("textbox")
        expect(textarea).toHaveAttribute("placeholder", "test-placeholder")
        expect(textarea).toHaveAttribute("name", "test-name")
        expect(textarea).toHaveValue("test-value")
    })
})