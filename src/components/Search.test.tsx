/**
 * Tests for src/components/Search.tsx
 *
 * Search is a controlled input that drives URL-based filtering: on every keystroke it
 * calls router.replace() with a `query` param, which the dashboard page reads to filter
 * the currency list. Clearing the input removes the param entirely.
 *
 * next/navigation is mocked because Search depends on useRouter, usePathname, and
 * useSearchParams — none of which are available outside a real Next.js render context.
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Search from './Search'

const mockReplace = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
  usePathname: () => '/dashboard',
  useSearchParams: () => new URLSearchParams(),
}))

describe('Search', () => {
  it('renders the search input', () => {
    render(<Search />)
    expect(screen.getByPlaceholderText('Search currency')).toBeInTheDocument()
  })

  it('calls router.replace with query param when user types', async () => {
    render(<Search />)
    const input = screen.getByPlaceholderText('Search currency')
    await userEvent.type(input, 'bit')
    expect(mockReplace).toHaveBeenLastCalledWith('/dashboard?query=bit')
  })

  it('removes query param when input is cleared', async () => {
    render(<Search />)
    const input = screen.getByPlaceholderText('Search currency')
    await userEvent.type(input, 'b')
    await userEvent.clear(input)
    expect(mockReplace).toHaveBeenLastCalledWith('/dashboard?')
  })
})
