import { Suspense } from 'react'
import WatchlistContent from './WatchlistContent'
import CurrencyListingsTableSkeleton from '@/components/CurrencyListingsTableSkeleton'

export default function Page() {
  return (
    <Suspense fallback={<CurrencyListingsTableSkeleton />}>
      <WatchlistContent />
    </Suspense>
  )
}
