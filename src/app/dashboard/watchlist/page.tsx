'use client'

import { fetchAndTransformData, transformCurrencyData } from '@/app/api/fetcher'
import { CurrencyLatestInfo } from '@/app/types/currencyLatestInfo'
import CurrencyLatestTable from '@/components/tables/CurrencyLatestTable'
import SortButton from '@/components/buttons/SortButton'
import SortOptionButton from '@/components/buttons/SortOptionButton'
import { createClient } from '@/lib/supabase/client'
import { getWatchlist } from '@/lib/watchlist'
import CurrencyLatestTableSkeleton from '@/components/CurrencyLatestTableSkeleton'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function Page() {
  const [currencyIds, setCurrencyIds] = useState<number[] | null>(null)
  const [isAscending, setIsAscending] = useState(true)
  const [sortOption, setSortOption] = useState<keyof CurrencyLatestInfo>('market_cap')

  useEffect(() => {
    async function loadWatchlist() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setCurrencyIds([]); return }
      const items = await getWatchlist(supabase, user.id)
      setCurrencyIds(items.map((i) => i.currency_id))
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

  return (
    <main>
      <div className="prose">
        <h1>Watchlist</h1>
      </div>

      {isEmpty && (
        <div className="mt-6 text-base-content/60">
          No currencies in your watchlist yet. Star a currency from the dashboard to add it here.
        </div>
      )}

      {error && (
        <div role="alert" className="alert alert-error mt-4">
          <span>Failed to load watchlist data.</span>
        </div>
      )}

      {/* Phase 1: Supabase watchlist still loading */}
      {currencyIds === null && <CurrencyLatestTableSkeleton />}

      {!isEmpty && currencyIds !== null && (
        <>
          <div className="flex items-center justify-end gap-2 mt-4">
            <SortOptionButton setSortOption={setSortOption} />
            <SortButton isAscending={isAscending} setIsAscending={setIsAscending} />
          </div>
          {/* Phase 2: Live prices loading */}
          {!data && !error && <CurrencyLatestTableSkeleton />}
          {data && (
            <CurrencyLatestTable
              currencies={data}
              sortOption={sortOption}
              isAscending={isAscending}
            />
          )}
        </>
      )}
    </main>
  )
}
