/**
 * Tests for src/components/WatchlistButton.tsx
 *
 * WatchlistButton has two async phases:
 *   1. On mount — checks whether the current currency is already in the user's watchlist.
 *   2. On click — toggles the watchlist entry (add or remove) and updates the icon.
 *
 * Both phases require an authenticated Supabase session, so we mock:
 *   - @/lib/supabase/client  →  returns a fake client with a controllable getSession()
 *   - @/lib/watchlist        →  stubs getWatchlist / addToWatchlist / removeFromWatchlist
 *
 * WHY vi.hoisted: WatchlistButton.tsx instantiates the Supabase client at module level
 * (`const supabase = createClient()`). Vitest hoists vi.mock() calls above imports, so
 * the mock factory runs before our const declarations — unless we also hoist the mock fns
 * with vi.hoisted(). Without it, the factory sees uninitialized variables and throws.
 */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import WatchlistButton from './WatchlistButton'

// Declared with vi.hoisted so they're available inside the vi.mock factory below
const { mockGetSession, mockGetWatchlist, mockAddToWatchlist, mockRemoveFromWatchlist } =
  vi.hoisted(() => ({
    mockGetSession: vi.fn(),
    mockGetWatchlist: vi.fn(),
    mockAddToWatchlist: vi.fn(),
    mockRemoveFromWatchlist: vi.fn(),
  }))

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: { getSession: mockGetSession },
  }),
}))

vi.mock('@/lib/watchlist', () => ({
  getWatchlist: (...args: unknown[]) => mockGetWatchlist(...args),
  addToWatchlist: (...args: unknown[]) => mockAddToWatchlist(...args),
  removeFromWatchlist: (...args: unknown[]) => mockRemoveFromWatchlist(...args),
}))

const mockSession = {
  data: { session: { user: { id: 'user-123' } } },
}

const currency = { currency_id: 1, currency_name: 'Bitcoin', currency_symbol: 'BTC' }

describe('WatchlistButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetSession.mockResolvedValue(mockSession)
    mockGetWatchlist.mockResolvedValue([])
    mockAddToWatchlist.mockResolvedValue(undefined)
    mockRemoveFromWatchlist.mockResolvedValue(undefined)
  })

  it('renders the button', async () => {
    render(<WatchlistButton currency={currency} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows outline star when currency is not in watchlist', async () => {
    mockGetWatchlist.mockResolvedValue([])
    render(<WatchlistButton currency={currency} />)
    await waitFor(() => {
      expect(screen.getByLabelText('Add to watchlist')).toBeInTheDocument()
    })
  })

  it('shows filled star when currency is in watchlist', async () => {
    mockGetWatchlist.mockResolvedValue([currency])
    render(<WatchlistButton currency={currency} />)
    await waitFor(() => {
      expect(screen.getByLabelText('Remove from watchlist')).toBeInTheDocument()
    })
  })

  it('calls addToWatchlist when clicking an unwatched currency', async () => {
    mockGetWatchlist.mockResolvedValue([])
    render(<WatchlistButton currency={currency} />)
    await waitFor(() => screen.getByLabelText('Add to watchlist'))
    await userEvent.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(mockAddToWatchlist).toHaveBeenCalledWith(
        expect.anything(),
        'user-123',
        currency
      )
    })
  })

  it('calls removeFromWatchlist when clicking a watched currency', async () => {
    mockGetWatchlist.mockResolvedValue([currency])
    render(<WatchlistButton currency={currency} />)
    await waitFor(() => screen.getByLabelText('Remove from watchlist'))
    await userEvent.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(mockRemoveFromWatchlist).toHaveBeenCalledWith(
        expect.anything(),
        'user-123',
        currency.currency_id
      )
    })
  })

  it('does nothing if there is no session', async () => {
    mockGetSession.mockResolvedValue({ data: { session: null } })
    render(<WatchlistButton currency={currency} />)
    await userEvent.click(screen.getByRole('button'))
    expect(mockAddToWatchlist).not.toHaveBeenCalled()
    expect(mockRemoveFromWatchlist).not.toHaveBeenCalled()
  })
})
