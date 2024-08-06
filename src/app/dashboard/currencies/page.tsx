"use client";
import { fetcher } from "@/app/api/fetcher";
import { Currency } from "@/app/types/currency";
import CurrencyTable from "@/components/CurrencyTable";
import CurrencyTableSkeleton from "@/components/CurrencyTableSkeleton";
import useSWR from "swr";

export default function Page() {
  const subpath = "/v1/fiat/map";
  const { data, error } = useSWR<Currency[]>(
    `/api/data?subpath=${encodeURIComponent(subpath)}`,
    fetcher
  );
  return (
    <main>
      <h1>Hello from Currencies</h1>
      {error ? (
        <div>Failed to load</div>
      ) : !data ? (
        <CurrencyTableSkeleton />
      ) : (
        <CurrencyTable currencies={data} />
      )}
    </main>
  );
}
