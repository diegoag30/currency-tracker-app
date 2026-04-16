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
import { useSortAndFilter } from "@/hooks/useSortAndFilter";
import useSWR from "swr";
import { CurrencyLatestInfo } from "../types/currencyLatestInfo";

export default function Page() {
  const params = {
    subpath: "/v1/cryptocurrency/listings/latest",
    limit: MAX_ITEMS_PER_PAGE.toString(),
  };
  const queryString = new URLSearchParams(params).toString();
  const { data, error } = useSWR<CurrencyLatestInfo[]>(
    `/api/data?${queryString}`,
    (url) => fetchAndTransformData(url, transformCurrencyData)
  );

  const { isAscending, setIsAscending, sortOption, setSortOption, filteredData } =
    useSortAndFilter(data, "price");

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <main>
      <div className="pb-4 mb-4 border-b border-base-300">
        <h1 className="text-2xl font-bold">Currencies Updates</h1>
      </div>
      <div className="flex items-center gap-2 bg-base-200 rounded-xl p-3 mb-4">
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
