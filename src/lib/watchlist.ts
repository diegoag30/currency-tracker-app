import { SupabaseClient } from '@supabase/supabase-js'

export type WatchlistItem = {
  currency_id: number
  currency_name: string
  currency_symbol: string
}

export async function getWatchlist(supabase: SupabaseClient, userId: string): Promise<WatchlistItem[]> {
  const { data, error } = await supabase
    .from('watchlist')
    .select('currency_id, currency_name, currency_symbol')
    .eq('user_id', userId)
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function addToWatchlist(supabase: SupabaseClient, userId: string, item: WatchlistItem) {
  const { error } = await supabase.from('watchlist').insert({ user_id: userId, ...item })
  if (error) throw new Error(error.message)
}

export async function removeFromWatchlist(supabase: SupabaseClient, userId: string, currencyId: number) {
  const { error } = await supabase.from('watchlist').delete().eq('user_id', userId).eq('currency_id', currencyId)
  if (error) throw new Error(error.message)
}
