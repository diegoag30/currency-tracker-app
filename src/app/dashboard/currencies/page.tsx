"use client";
import { fetcher } from "@/app/api/fetcher";
import { Currency } from "@/app/types/currency";
import CurrencyTableSkeleton from "@/components/CurrencyTableSkeleton";
import ErrorAlert from "@/components/ErrorAlert";
import CurrencyTable from "@/components/tables/CurrencyTable";
import useSWR from "swr";

export default function Page() {
  const subpath = "/v1/fiat/map";
  const { data, error } = useSWR<Currency[]>(
    `/api/data?subpath=${encodeURIComponent(subpath)}`,
    fetcher
  );
  return (
    <main>
      <div className="pb-4 mb-4 border-b border-base-300">
        <h1 className="text-2xl font-bold">Currencies</h1>
      </div>
      {error ? (
        <ErrorAlert />
      ) : !data ? (
        <CurrencyTableSkeleton />
      ) : (
        <CurrencyTable currencies={data} />
      )}
    </main>
  );
}
