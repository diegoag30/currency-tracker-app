"use client";
import {
  fetchAndTransformData,
  transformCurrencyData,
  transformMetaData,
} from "@/app/api/fetcher";
import { CurrencyLatestInfo } from "@/app/types/currencyLatestInfo";
import { Metadata } from "@/app/types/metadata";
import CurrencyCard from "@/components/CurrencyCard";
import CurrencyStats from "@/components/CurrencyStats";
import ErrorAlert from "@/components/ErrorAlert";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const router = useRouter();

  const { data: metaData, isLoading: metaLoading, error: metaError } = useSWR<Metadata[]>(
    `/api/data?${new URLSearchParams({ subpath: '/v2/cryptocurrency/info', id }).toString()}`,
    (url: string) => fetchAndTransformData(url, transformMetaData)
  );

  const { data: currencyData, isLoading: statsLoading, error: statsError } = useSWR<CurrencyLatestInfo[]>(
    `/api/data?${new URLSearchParams({ subpath: '/v1/cryptocurrency/quotes/latest', id }).toString()}`,
    (url: string) => fetchAndTransformData(url, transformCurrencyData)
  );

  const currency = currencyData?.[0]

  if (metaError || statsError) return <ErrorAlert message="Failed to load currency data." />

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-base-content/60 hover:text-base-content w-fit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      <CurrencyCard
        metadata={metaData}
        isLoading={metaLoading}
        watchlistCurrency={currency ? {
          currency_id: currency.id,
          currency_name: currency.name,
          currency_symbol: currency.symbol,
        } : undefined}
      />
      <CurrencyStats currencies={currencyData} isLoading={statsLoading} />
    </div>
  );
}
