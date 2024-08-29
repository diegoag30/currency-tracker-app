"use client";
import {
  fetchAndTransformData,
  transformCurrencyData,
} from "@/app/api/fetcher";
import SortButton from "@/components/buttons/SortButton";
import SortOptionButton from "@/components/buttons/SortOptionButton";
import Search from "@/components/Search";
import CurrencyLatestTable from "@/components/tables/CurrencyLatestTable";
import { MAX_ITEMS_PER_PAGE } from "@/config/constants";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { CurrencyLatestInfo } from "../types/currencyLatestInfo";

export default function Page() {
  const [isAscending, setIsAscending] = useState(true);
  const [sortOption, setSortOption] =
    useState<keyof CurrencyLatestInfo>("price");
  const fetcher = (url: string) =>
    fetchAndTransformData(url, transformCurrencyData);

  const params = {
    subpath: "/v1/cryptocurrency/listings/latest",
    limit: MAX_ITEMS_PER_PAGE.toString(),
  };
  const queryString = new URLSearchParams(params).toString();
  const { data, error } = useSWR<CurrencyLatestInfo[]>(
    `/api/data?${queryString}`,
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
        <SortOptionButton setSortOption={setSortOption} />
        <SortButton isAscending={isAscending} setIsAscending={setIsAscending} />
      </div>
      <CurrencyLatestTable
        currencies={filteredData}
        sortOption={sortOption}
        isAscending={isAscending}
      />
    </main>
  );
}
