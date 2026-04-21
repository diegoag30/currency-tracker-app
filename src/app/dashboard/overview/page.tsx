'use client'

import { fetchAndTransformData, transformGlobalMetrics } from '@/app/api/fetcher'
import ErrorAlert from '@/components/ErrorAlert'
import { AbbreviatedNumberFormat, formatVolumeChange } from '@/utils/formatters'
import useSWR from 'swr'

const StatSkeleton = () => (
  <div className="stat">
    <div className="skeleton h-3 w-32 mb-2" />
    <div className="skeleton h-8 w-40 mb-2" />
    <div className="skeleton h-3 w-20" />
  </div>
)

export default function Page() {
  const { data, error } = useSWR(
    `/api/data?${new URLSearchParams({ subpath: '/v1/global-metrics/quotes/latest' }).toString()}`,
    (url: string) => fetchAndTransformData(url, transformGlobalMetrics)
  )

  if (error) return <ErrorAlert message="Failed to load global market data." />

  return (
    <main>
      <div className="pb-4 mb-4 border-b border-base-300">
        <h1 className="text-2xl font-bold">Market Overview</h1>
      </div>

      {/* Market cap & volume */}
      <div className="bg-base-200 rounded-xl p-4 mb-4">
        <h2 className="text-sm font-semibold text-base-content/60 uppercase tracking-wide mb-2">
          Global Market
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="stat">
            <div className="stat-title">Total Market Cap</div>
            <div className="stat-value text-xl">
              {data ? <>$&nbsp;{AbbreviatedNumberFormat(data.total_market_cap)}</> : <div className="skeleton h-8 w-40" />}
            </div>
            <div className={`stat-desc ${data && data.total_market_cap_yesterday_percentage_change < 0 ? 'text-error' : 'text-success'}`}>
              {data ? formatVolumeChange(data.total_market_cap_yesterday_percentage_change) : <div className="skeleton h-3 w-20" />}
              {data && <span className="text-base-content/50 ml-1">vs yesterday</span>}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">24h Volume</div>
            <div className="stat-value text-xl">
              {data ? <>$&nbsp;{AbbreviatedNumberFormat(data.total_volume_24h)}</> : <div className="skeleton h-8 w-40" />}
            </div>
            <div className={`stat-desc ${data && data.total_volume_24h_yesterday_percentage_change < 0 ? 'text-error' : 'text-success'}`}>
              {data ? formatVolumeChange(data.total_volume_24h_yesterday_percentage_change) : <div className="skeleton h-3 w-20" />}
              {data && <span className="text-base-content/50 ml-1">vs yesterday</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Dominance */}
      <div className="bg-base-200 rounded-xl p-4 mb-4">
        <h2 className="text-sm font-semibold text-base-content/60 uppercase tracking-wide mb-2">
          Dominance
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {data ? (
            <>
              <div className="stat">
                <div className="stat-title">Bitcoin (BTC)</div>
                <div className="stat-value text-xl">{formatVolumeChange(data.btc_dominance)}</div>
                <div className="stat-desc">of total market cap</div>
              </div>
              <div className="stat">
                <div className="stat-title">Ethereum (ETH)</div>
                <div className="stat-value text-xl">{formatVolumeChange(data.eth_dominance)}</div>
                <div className="stat-desc">of total market cap</div>
              </div>
            </>
          ) : (
            <><StatSkeleton /><StatSkeleton /></>
          )}
        </div>
        {data && (
          <div className="mt-3 flex gap-2 items-center">
            <div className="flex-1 h-3 rounded-full bg-base-300 overflow-hidden">
              <div
                className="h-full bg-warning rounded-full"
                style={{ width: `${data.btc_dominance}%` }}
              />
            </div>
            <span className="text-xs text-base-content/50 w-8">BTC</span>
          </div>
        )}
      </div>

      {/* Volume breakdown */}
      <div className="bg-base-200 rounded-xl p-4 mb-4">
        <h2 className="text-sm font-semibold text-base-content/60 uppercase tracking-wide mb-2">
          24h Volume Breakdown
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {data ? (
            <>
              <div className="stat">
                <div className="stat-title">Altcoins</div>
                <div className="stat-value text-lg">${AbbreviatedNumberFormat(data.altcoin_volume_24h)}</div>
              </div>
              <div className="stat">
                <div className="stat-title">DeFi</div>
                <div className="stat-value text-lg">${AbbreviatedNumberFormat(data.defi_volume_24h)}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Stablecoins</div>
                <div className="stat-value text-lg">${AbbreviatedNumberFormat(data.stablecoin_volume_24h)}</div>
              </div>
            </>
          ) : (
            <><StatSkeleton /><StatSkeleton /><StatSkeleton /></>
          )}
        </div>
      </div>

      {/* Market activity */}
      <div className="bg-base-200 rounded-xl p-4">
        <h2 className="text-sm font-semibold text-base-content/60 uppercase tracking-wide mb-2">
          Market Activity
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {data ? (
            <>
              <div className="stat">
                <div className="stat-title">Active Cryptos</div>
                <div className="stat-value text-lg">{data.active_cryptocurrencies.toLocaleString()}</div>
                <div className="stat-desc">of {data.total_cryptocurrencies.toLocaleString()} total</div>
              </div>
              <div className="stat">
                <div className="stat-title">Active Exchanges</div>
                <div className="stat-value text-lg">{data.active_exchanges.toLocaleString()}</div>
                <div className="stat-desc">of {data.total_exchanges.toLocaleString()} total</div>
              </div>
              <div className="stat">
                <div className="stat-title">Market Pairs</div>
                <div className="stat-value text-lg">{data.active_market_pairs.toLocaleString()}</div>
                <div className="stat-desc">active trading pairs</div>
              </div>
            </>
          ) : (
            <><StatSkeleton /><StatSkeleton /><StatSkeleton /></>
          )}
        </div>
      </div>
    </main>
  )
}
