'use client'

import { fetchAndTransformData, transformCurrencyData } from '@/app/api/fetcher'
import { CurrencyLatestInfo } from '@/app/types/currencyLatestInfo'
import CurrencyLatestTable from '@/components/tables/CurrencyLatestTable'
import SortButton from '@/components/buttons/SortButton'
import SortOptionButton from '@/components/buttons/SortOptionButton'
import { createClient } from '@/lib/supabase/client'
import { getWatchlist } from '@/lib/watchlist'
import CurrencyListingsTableSkeleton from '@/components/CurrencyListingsTableSkeleton'
import ErrorAlert from '@/components/ErrorAlert'
import Search from '@/components/Search'
import { useSortAndFilter } from '@/hooks/useSortAndFilter'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function Page() {
  const [currencyIds, setCurrencyIds] = useState<number[] | null>(null)

  useEffect(() => {
    async function loadWatchlist() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { setCurrencyIds([]); return }
        const items = await getWatchlist(supabase, user.id)
        setCurrencyIds(items.map((i) => i.currency_id))
      } catch {
        setCurrencyIds([])
      }
    }
    loadWatchlist()
  }, [])

  const swrKey =
    currencyIds && currencyIds.length > 0
      ? `/api/data?${new URLSearchParams({ subpath: '/v1/cryptocurrency/quotes/latest', id: currencyIds.join(',') }).toString()}`
      : null

  const { data, error } = useSWR<CurrencyLatestInfo[]>(
    swrKey,
    (url) => fetchAndTransformData(url, transformCurrencyData)
  )

  const isEmpty = currencyIds !== null && currencyIds.length === 0

  const { isAscending, setIsAscending, sortOption, setSortOption, filteredData } =
    useSortAndFilter(data, 'market_cap')

  return (
    <main>
      <div className="pb-4 mb-4 border-b border-base-300">
        <h1 className="text-2xl font-bold">Watchlist</h1>
      </div>

      {isEmpty && (
        <div className="flex flex-col items-center justify-center mt-16 gap-4 text-base-content/50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg>
          <p className="text-lg font-medium">Your watchlist is empty</p>
          <p className="text-sm">Star a currency from the dashboard to add it here.</p>
        </div>
      )}

      {error && <ErrorAlert message="Failed to load watchlist data." />}

      {/* Phase 1: Supabase watchlist still loading */}
      {currencyIds === null && <CurrencyListingsTableSkeleton />}

      {!isEmpty && currencyIds !== null && (
        <>
          <div className="flex items-center gap-2 bg-base-200 rounded-xl p-3 mb-4">
            <div className="flex-1">
              <Search />
            </div>
            <SortOptionButton setSortOption={setSortOption} />
            <SortButton isAscending={isAscending} setIsAscending={setIsAscending} />
          </div>
          {/* Phase 2: Live prices loading */}
          {!data && !error && <CurrencyListingsTableSkeleton />}
          {data && (
            <CurrencyLatestTable
              currencies={filteredData}
              sortOption={sortOption}
              isAscending={isAscending}
            />
          )}
        </>
      )}
    </main>
  )
}
