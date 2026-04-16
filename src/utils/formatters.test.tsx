/**
 * Tests for src/utils/formatters.tsx
 *
 * All formatters return JSX elements (not plain strings), so we render them
 * and assert against the resulting text content or CSS classes.
 *
 * No mocking needed — these are pure presentation functions with no side effects.
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  AbbreviatedNumberFormat,
  formatPrice,
  formatVolumeChange,
  formatDate,
  formatNumber,
} from './formatters'

describe('AbbreviatedNumberFormat', () => {
  it('abbreviates trillions', () => {
    const { container } = render(AbbreviatedNumberFormat(2_000_000_000_000))
    expect(container.textContent).toBe('2.0T')
  })

  it('abbreviates billions', () => {
    const { container } = render(AbbreviatedNumberFormat(3_500_000_000))
    expect(container.textContent).toBe('3.5B')
  })

  it('abbreviates millions', () => {
    const { container } = render(AbbreviatedNumberFormat(1_500_000))
    expect(container.textContent).toBe('1.5M')
  })

  it('abbreviates thousands', () => {
    const { container } = render(AbbreviatedNumberFormat(1_000))
    expect(container.textContent).toBe('1.0K')
  })

  it('returns plain number below 1000', () => {
    const { container } = render(AbbreviatedNumberFormat(999))
    expect(container.textContent).toBe('999')
  })

  it('handles zero', () => {
    const { container } = render(AbbreviatedNumberFormat(0))
    expect(container.textContent).toBe('0')
  })
})

describe('formatPrice', () => {
  it('includes dollar sign prefix', () => {
    const { container } = render(formatPrice(1234.56))
    expect(container.textContent).toContain('$')
  })

  it('uses thousand separators', () => {
    const { container } = render(formatPrice(1234567))
    expect(container.textContent).toContain(',')
  })

  it('handles zero value', () => {
    const { container } = render(formatPrice(0))
    expect(container.textContent).toContain('$')
  })
})

describe('formatNumber', () => {
  it('uses thousand separators', () => {
    const { container } = render(formatNumber(1000000))
    expect(container.textContent).toContain(',')
  })

  it('handles zero', () => {
    const { container } = render(formatNumber(0))
    expect(container.textContent).toBe('0')
  })
})

describe('formatVolumeChange', () => {
  it('includes percent suffix', () => {
    const { container } = render(formatVolumeChange(5.25))
    expect(container.textContent).toContain('%')
  })

  it('shows negative values', () => {
    const { container } = render(formatVolumeChange(-3.5))
    expect(container.textContent).toContain('-')
    expect(container.textContent).toContain('%')
  })

  it('handles zero', () => {
    const { container } = render(formatVolumeChange(0))
    expect(container.textContent).toContain('%')
  })
})

describe('formatDate', () => {
  it('formats a valid ISO date string', () => {
    const { container } = render(formatDate('2024-01-15T10:30:00Z'))
    expect(container.textContent).toContain('January')
    expect(container.textContent).toContain('15')
    expect(container.textContent).toContain('2024')
    expect(container.textContent).toContain('UTC')
  })

  it('returns Unknown for an invalid date', () => {
    const { container } = render(formatDate('not-a-date'))
    expect(container.textContent).toBe('Unknown')
  })
})
