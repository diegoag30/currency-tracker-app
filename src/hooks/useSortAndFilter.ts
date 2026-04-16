'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

/**
 * Consolidates the sort + search-filter state shared across dashboard pages
 * (Currencies, Markets, Watchlist). Reads the `query` URL param set by the
 * Search component and filters the provided data array by name and symbol.
 *
 * @param data - Array of items to filter. May be undefined while SWR is loading.
 * @param defaultSortOption - The field to sort by on first render.
 * @returns Sort state setters + the already-filtered data ready for the table.
 */
export function useSortAndFilter<T extends { name: string; symbol: string }>(
  data: T[] | undefined,
  defaultSortOption: keyof T
) {
  const [isAscending, setIsAscending] = useState(true)
  const [sortOption, setSortOption] = useState<keyof T>(defaultSortOption)

  const searchParams = useSearchParams()
  const query = searchParams.get('query')?.toLowerCase() || ''

  const filteredData = (data ?? []).filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.symbol.toLowerCase().includes(query)
  )

  return { isAscending, setIsAscending, sortOption, setSortOption, filteredData }
}
