// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from "@testing-library/react"
import { LoadingSpinner } from "./LoadingSpinner"

describe('LoadingSpinner', () => { 
  it('renders without additional classes', () => {
    render(<LoadingSpinner/>)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('renders with additional classes when className is passed', () => {
    render(<LoadingSpinner className="extra-classname"/>)
    expect(screen.getByTestId('loading-spinner')).toHaveClass('extra-classname')
  })
})