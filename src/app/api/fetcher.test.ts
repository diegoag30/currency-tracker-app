/**
 * Tests for src/app/api/fetcher.ts
 *
 * Three layers are tested here:
 *   1. Transform functions (transformCurrencyData, transformConversionData, transformMetaData)
 *      — pure functions that reshape raw CoinMarketCap JSON into typed domain objects.
 *        No mocking needed; we pass fixture objects directly.
 *   2. fetcher() — SWR-compatible fetcher that unwraps the `data` property and
 *        throws on non-2xx responses.
 *   3. fetchAndTransformData() — generic wrapper that chains fetch + a transform function.
 *        Both fetcher() and fetchAndTransformData() mock the global `fetch` via vi.stubGlobal.
 *
 * Fixture shapes mirror the actual CoinMarketCap Pro API response structure so that
 * any future API contract changes will surface here first.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  fetcher,
  fetchAndTransformData,
  transformCurrencyData,
  transformConversionData,
  transformMetaData,
} from './fetcher'

const mockCurrencyApiResponse = {
  data: {
    '1': {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      circulating_supply: 19_000_000,
      total_supply: 21_000_000,
      quote: {
        USD: {
          price: 45000,
          volume_24h: 30_000_000_000,
          volume_change_24h: 5.5,
          percent_change_24h: 2.3,
          percent_change_7d: -1.2,
          percent_change_30d: 10.5,
          market_cap: 855_000_000_000,
          last_updated: '2024-01-15T10:00:00Z',
        },
      },
    },
    '1027': {
      id: 1027,
      name: 'Ethereum',
      symbol: 'ETH',
      circulating_supply: 120_000_000,
      total_supply: 120_000_000,
      quote: {
        USD: {
          price: 2500,
          volume_24h: 15_000_000_000,
          volume_change_24h: -2.1,
          percent_change_24h: -0.5,
          percent_change_7d: 3.2,
          percent_change_30d: 5.0,
          market_cap: 300_000_000_000,
          last_updated: '2024-01-15T10:00:00Z',
        },
      },
    },
  },
}

const mockConversionApiResponse = {
  data: {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: 1,
    quote: {
      USD: {
        price: 45000,
        last_updated: '2024-01-15T10:00:00Z',
      },
    },
  },
}

const mockMetaApiResponse = {
  data: {
    '1': {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      slug: 'bitcoin',
      logo: 'https://example.com/btc.png',
      description: 'The first cryptocurrency.',
    },
  },
}

describe('transformCurrencyData', () => {
  it('maps raw API response to CurrencyLatestInfo array', () => {
    const result = transformCurrencyData(mockCurrencyApiResponse)
    expect(result).toHaveLength(2)
  })

  it('maps fields correctly', () => {
    const result = transformCurrencyData(mockCurrencyApiResponse)
    const btc = result.find((c) => c.symbol === 'BTC')!
    expect(btc.id).toBe(1)
    expect(btc.name).toBe('Bitcoin')
    expect(btc.price).toBe(45000)
    expect(btc.volume_24h).toBe(30_000_000_000)
    expect(btc.percent_change_24h).toBe(2.3)
    expect(btc.market_cap).toBe(855_000_000_000)
    expect(btc.circulating_supply).toBe(19_000_000)
  })
})

describe('transformConversionData', () => {
  it('maps raw response to ConversionResult', () => {
    const result = transformConversionData(mockConversionApiResponse, 'USD')
    expect(result.id).toBe(1)
    expect(result.name).toBe('Bitcoin')
    expect(result.symbol).toBe('BTC')
    expect(result.convertedAmount).toBe(45000)
    expect(result.convertTo).toBe('USD')
  })

  it('uppercases the convertTo key', () => {
    const result = transformConversionData(mockConversionApiResponse, 'usd')
    expect(result.convertTo).toBe('USD')
  })
})

describe('transformMetaData', () => {
  it('maps raw response to Metadata array', () => {
    const result = transformMetaData(mockMetaApiResponse)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(1)
    expect(result[0].name).toBe('Bitcoin')
    expect(result[0].slug).toBe('bitcoin')
    expect(result[0].logo).toBe('https://example.com/btc.png')
  })
})

describe('fetcher', () => {
  beforeEach(() => { vi.restoreAllMocks() })

  it('returns the data property from the response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [{ id: 1 }] }),
    }))
    const result = await fetcher('/api/data?subpath=/test')
    expect(result).toEqual([{ id: 1 }])
  })

  it('throws when response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    }))
    await expect(fetcher('/api/data?subpath=/test')).rejects.toThrow('Failed to fetch')
  })
})

describe('fetchAndTransformData', () => {
  beforeEach(() => { vi.restoreAllMocks() })

  it('fetches and applies the transform function', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      json: async () => mockCurrencyApiResponse,
    }))
    const result = await fetchAndTransformData('/api/data', transformCurrencyData)
    expect(result).toHaveLength(2)
  })

  it('throws when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))
    await expect(fetchAndTransformData('/api/data', transformCurrencyData)).rejects.toThrow(
      'Data fetching failed'
    )
  })
})
