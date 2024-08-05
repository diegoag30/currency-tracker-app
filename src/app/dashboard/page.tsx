"use client";
import CurrencyTable from "@/components/CurrencyTable";
import CurrencytableSkeleton from "@/components/CurrencyTableSkeleton";
import useSWR from "swr";
import { fetcher } from "../api/fetcher";
import { Currency } from "../types/currency";

export default function Page() {
  const { data, error } = useSWR<Currency[]>("/api/data", fetcher);
  return (
    <main>
      <h1>Hello from Dashboard</h1>
      {error ? (
        <div>Failed to load</div>
      ) : !data ? (
        <CurrencytableSkeleton />
      ) : (
        <CurrencyTable currencies={data} />
      )}
    </main>
  );
}
