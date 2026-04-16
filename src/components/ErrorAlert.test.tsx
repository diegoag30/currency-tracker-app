/**
 * Tests for src/components/ErrorAlert.tsx
 *
 * ErrorAlert is the single standardised error banner used across all dashboard
 * pages. Tests confirm the default message, custom message, and that the
 * element has the correct ARIA role so screen readers announce it as an alert.
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ErrorAlert from './ErrorAlert'

describe('ErrorAlert', () => {
  it('renders the default message', () => {
    render(<ErrorAlert />)
    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load data.')
  })

  it('renders a custom message', () => {
    render(<ErrorAlert message="Failed to load watchlist data." />)
    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load watchlist data.')
  })

  it('has the alert role for accessibility', () => {
    render(<ErrorAlert />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
