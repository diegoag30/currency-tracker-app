"use client";
import {
  fetchAndTransformData,
  transformCurrencyData,
} from "@/app/api/fetcher";
import CurrencyLatestTable from "@/components/tables/CurrencyLatestTable";
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

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <main>
      <h1>Hello from Dashboard</h1>
      <div role="tablist" className="tabs tabs-boxed">
        <a role="tab" className="tab">
          Price
        </a>
        <a role="tab" className="tab tab-active">
          Market Cap
        </a>
        <a role="tab" className="tab">
          Volume 24h
        </a>
      </div>
      <CurrencyLatestTable currencies={data} />
    </main>
  );
}
