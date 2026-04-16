/**
 * Tests for src/components/tables/CurrencyLatestTable.tsx
 *
 * CurrencyLatestTable is a presentation component responsible for:
 *   - Rendering a row per currency with name, symbol, price, and market data
 *   - Sorting rows by the active sortOption prop (ascending or descending)
 *   - Applying color classes (text-success / text-error) based on 24h % change
 *   - Navigating to /dashboard/[id] when a row is clicked
 *
 * Mocks:
 *   - next/navigation → useRouter, so router.push() can be asserted without a real Next.js context
 *   - @/components/WatchlistButton → stubbed with a plain button to isolate this component
 *     from WatchlistButton's own Supabase dependency
 *
 * Fixture: two currencies (BTC positive change, ETH negative change) cover both color branches.
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CurrencyLatestTable from './CurrencyLatestTable'
import { CurrencyLatestInfo } from '@/app/types/currencyLatestInfo'

const mockPush = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

// WatchlistButton has its own Supabase dependency — stub it out to keep this test focused
vi.mock('@/components/WatchlistButton', () => ({
  default: () => <button aria-label="watchlist" />,
}))

const currencies: CurrencyLatestInfo[] = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 45000,
    volume_24h: 30_000_000_000,
    volume_change_24h: 5.5,
    percent_change_24h: 2.3,
    percent_change_7d: -1.2,
    percent_change_30d: 10.5,
    market_cap: 855_000_000_000,
    circulating_supply: 19_000_000,
    total_supply: 21_000_000,
    last_updated: '2024-01-15T10:00:00Z',
  },
  {
    id: 1027,
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2500,
    volume_24h: 15_000_000_000,
    volume_change_24h: -2.1,
    percent_change_24h: -0.5,
    percent_change_7d: 3.2,
    percent_change_30d: 5.0,
    market_cap: 300_000_000_000,
    circulating_supply: 120_000_000,
    total_supply: 120_000_000,
    last_updated: '2024-01-15T10:00:00Z',
  },
]

describe('CurrencyLatestTable', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('renders a row for each currency', () => {
    render(<CurrencyLatestTable currencies={currencies} sortOption="price" isAscending={true} />)
    expect(screen.getByText('Bitcoin')).toBeInTheDocument()
    expect(screen.getByText('Ethereum')).toBeInTheDocument()
  })

  it('applies text-error class on negative percent change', () => {
    render(<CurrencyLatestTable currencies={currencies} sortOption="price" isAscending={true} />)
    // ETH has percent_change_24h = -0.5, should have text-error
    const cells = document.querySelectorAll('.text-error')
    expect(cells.length).toBeGreaterThan(0)
  })

  it('applies text-success class on positive percent change', () => {
    render(<CurrencyLatestTable currencies={currencies} sortOption="price" isAscending={true} />)
    // BTC has percent_change_24h = 2.3, should have text-success
    const cells = document.querySelectorAll('.text-success')
    expect(cells.length).toBeGreaterThan(0)
  })

  it('navigates to detail page on row click', async () => {
    render(<CurrencyLatestTable currencies={currencies} sortOption="price" isAscending={true} />)
    const bitcoinRow = screen.getByText('Bitcoin').closest('tr')!
    await userEvent.click(bitcoinRow)
    expect(mockPush).toHaveBeenCalledWith('/dashboard/1')
  })

  it('sorts ascending by price: cheaper first', () => {
    render(<CurrencyLatestTable currencies={currencies} sortOption="price" isAscending={true} />)
    const rows = screen.getAllByRole('row').slice(1) // skip header
    expect(rows[0]).toHaveTextContent('Ethereum')
    expect(rows[1]).toHaveTextContent('Bitcoin')
  })

  it('sorts descending by price: expensive first', () => {
    render(<CurrencyLatestTable currencies={currencies} sortOption="price" isAscending={false} />)
    const rows = screen.getAllByRole('row').slice(1)
    expect(rows[0]).toHaveTextContent('Bitcoin')
    expect(rows[1]).toHaveTextContent('Ethereum')
  })
})
