"use client";
import {
  fetchAndTransformData,
  transformCurrencyData,
} from "@/app/api/fetcher";
import SortButton from "@/components/buttons/SortButton";
import SortOptionButton from "@/components/buttons/SortOptionButton";
import Search from "@/components/Search";
import CurrencyLatestTable from "@/components/tables/CurrencyLatestTable";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { CurrencyLatestInfo } from "../types/currencyLatestInfo";

export default function Page() {
  const fetcher = (url: string) =>
    fetchAndTransformData(url, transformCurrencyData);

  const subpath = "/v1/cryptocurrency/listings/latest";
  const { data, error } = useSWR<CurrencyLatestInfo[]>(
    `/api/data?subpath=${encodeURIComponent(subpath)}`,
    fetcher
  );
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const filteredData = (data ?? []).filter(
    (currency) =>
      currency.name.toLowerCase().includes(query) ||
      currency.symbol.toLowerCase().includes(query)
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <main>
      <div className="prose">
        <h1>Currencies Updates</h1>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <Search />
        </div>
        <SortOptionButton />
        <SortButton />
      </div>
      <CurrencyLatestTable currencies={filteredData} />
    </main>
  );
}
