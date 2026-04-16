/**
 * Tests for src/utils/handleUrl.tsx
 *
 * extractSubpathAndQuery splits a URL into two parts:
 *   - subpath: the CoinMarketCap API path (e.g. /v1/cryptocurrency/listings/latest)
 *   - queryString: the remaining params forwarded to the external API
 *
 * This utility is critical to the API proxy route — if it misparses the URL,
 * every downstream API call breaks. Tests cover the happy path and edge cases.
 */
import { describe, it, expect } from 'vitest'
import { extractSubpathAndQuery } from './handleUrl'

describe('extractSubpathAndQuery', () => {
  it('extracts the subpath param', () => {
    const url = new URL('http://localhost/api/data?subpath=/v1/cryptocurrency/listings/latest&limit=10')
    const { subpath } = extractSubpathAndQuery(url)
    expect(subpath).toBe('/v1/cryptocurrency/listings/latest')
  })

  it('returns remaining query string without subpath', () => {
    const url = new URL('http://localhost/api/data?subpath=/v1/cryptocurrency/listings/latest&limit=10&start=1')
    const { queryString } = extractSubpathAndQuery(url)
    expect(queryString).toContain('limit=10')
    expect(queryString).toContain('start=1')
    expect(queryString).not.toContain('subpath')
  })

  it('returns empty subpath when param is missing', () => {
    const url = new URL('http://localhost/api/data?limit=10')
    const { subpath } = extractSubpathAndQuery(url)
    expect(subpath).toBe('')
  })

  it('returns empty queryString when no other params exist', () => {
    const url = new URL('http://localhost/api/data?subpath=/v1/test')
    const { queryString } = extractSubpathAndQuery(url)
    expect(queryString).toBe('')
  })
})
