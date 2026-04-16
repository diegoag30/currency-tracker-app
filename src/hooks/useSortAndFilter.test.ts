/**
 * Tests for src/hooks/useSortAndFilter.ts
 *
 * The hook owns three responsibilities:
 *   1. Sort state — isAscending (default true) and sortOption (caller-specified default)
 *   2. Search filtering — reads the `query` URL param and filters by name/symbol
 *   3. Safe handling of undefined data — returns [] while SWR hasn't resolved yet
 *
 * next/navigation is mocked so we can control the URL search params without a
 * real Next.js router. renderHook from RTL lets us test the hook in isolation.
 */
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSortAndFilter } from './useSortAndFilter'

const mockGet = vi.fn()

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: mockGet }),
}))

const currencies = [
  { name: 'Bitcoin', symbol: 'BTC', price: 45000 },
  { name: 'Ethereum', symbol: 'ETH', price: 2500 },
  { name: 'Solana', symbol: 'SOL', price: 100 },
]

describe('useSortAndFilter', () => {
  beforeEach(() => {
    mockGet.mockReturnValue(null) // no active search query by default
  })

  it('returns all items when there is no search query', () => {
    const { result } = renderHook(() => useSortAndFilter(currencies, 'price'))
    expect(result.current.filteredData).toHaveLength(3)
  })

  it('returns empty array when data is undefined (SWR still loading)', () => {
    const { result } = renderHook(() => useSortAndFilter(undefined, 'price'))
    expect(result.current.filteredData).toEqual([])
  })

  it('filters by name (case-insensitive)', () => {
    mockGet.mockReturnValue('bit')
    const { result } = renderHook(() => useSortAndFilter(currencies, 'price'))
    expect(result.current.filteredData).toHaveLength(1)
    expect(result.current.filteredData[0].name).toBe('Bitcoin')
  })

  it('filters by symbol (case-insensitive)', () => {
    mockGet.mockReturnValue('eth')
    const { result } = renderHook(() => useSortAndFilter(currencies, 'price'))
    expect(result.current.filteredData).toHaveLength(1)
    expect(result.current.filteredData[0].symbol).toBe('ETH')
  })

  it('returns no items when query matches nothing', () => {
    mockGet.mockReturnValue('xyz')
    const { result } = renderHook(() => useSortAndFilter(currencies, 'price'))
    expect(result.current.filteredData).toHaveLength(0)
  })

  it('initialises isAscending to true', () => {
    const { result } = renderHook(() => useSortAndFilter(currencies, 'price'))
    expect(result.current.isAscending).toBe(true)
  })

  it('toggles isAscending via setIsAscending', () => {
    const { result } = renderHook(() => useSortAndFilter(currencies, 'price'))
    act(() => result.current.setIsAscending(false))
    expect(result.current.isAscending).toBe(false)
  })

  it('initialises sortOption to the provided default', () => {
    const { result } = renderHook(() => useSortAndFilter(currencies, 'price'))
    expect(result.current.sortOption).toBe('price')
  })

  it('updates sortOption via setSortOption', () => {
    const { result } = renderHook(() => useSortAndFilter(currencies, 'price'))
    act(() => result.current.setSortOption('name'))
    expect(result.current.sortOption).toBe('name')
  })
})
