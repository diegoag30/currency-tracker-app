'use client'

import { StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { createClient } from '@/lib/supabase/client'
import { addToWatchlist, getWatchlist, removeFromWatchlist, WatchlistItem } from '@/lib/watchlist'
import { useEffect, useState } from 'react'

// Single shared client instance to avoid Web Lock contention across multiple simultaneous calls
const supabase = createClient()

interface WatchlistButtonProps {
  currency: WatchlistItem
}

export default function WatchlistButton({ currency }: WatchlistButtonProps) {
  const [inWatchlist, setInWatchlist] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function checkWatchlist() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return
      const watchlist = await getWatchlist(supabase, session.user.id)
      setInWatchlist(watchlist.some((item) => item.currency_id === currency.currency_id))
    }
    checkWatchlist()
  }, [currency.currency_id])

  async function handleClick(e: React.MouseEvent) {
    e.stopPropagation()
    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) return
    const user = session.user

    if (inWatchlist) {
      await removeFromWatchlist(supabase, user.id, currency.currency_id)
      setInWatchlist(false)
    } else {
      await addToWatchlist(supabase, user.id, currency)
      setInWatchlist(true)
    }
    setLoading(false)
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="btn btn-ghost btn-xs"
      aria-label={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      {inWatchlist
        ? <StarIconSolid className="w-5 h-5 text-warning" />
        : <StarIcon className="w-5 h-5" />
      }
    </button>
  )
}
