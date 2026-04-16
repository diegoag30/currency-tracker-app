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
import WatchlistButton from "@/components/WatchlistButton";
import useSWR from "swr";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const MetaDatafetcher = (url: string) =>
    fetchAndTransformData(url, transformMetaData);

  const MetaDataqueryParams = {
    subpath: "/v2/cryptocurrency/info",
    id: id,
  };

  const MetaDataqueryString = new URLSearchParams(
    MetaDataqueryParams
  ).toString();

  const { data: metaData, isLoading: metaLoading } = useSWR<Metadata[]>(
    `/api/data?${MetaDataqueryString}`,
    MetaDatafetcher
  );

  const CurrencyDatafetcher = (url: string) =>
    fetchAndTransformData(url, transformCurrencyData);

  const CurrencyDataqueryParams = {
    subpath: "/v1/cryptocurrency/quotes/latest",
    id: id,
  };

  const CurrencyDataqueryString = new URLSearchParams(
    CurrencyDataqueryParams
  ).toString();

  const { data: currencyData, isLoading: statsLoading } = useSWR<CurrencyLatestInfo[]>(
    `/api/data?${CurrencyDataqueryString}`,
    CurrencyDatafetcher
  );

  const currency = currencyData?.[0]

  return (
    <>
      <div className="flex items-center gap-3 mb-2">
        {currency && (
          <WatchlistButton
            currency={{
              currency_id: currency.id,
              currency_name: currency.name,
              currency_symbol: currency.symbol,
            }}
          />
        )}
      </div>
      <CurrencyCard metadata={metaData} isLoading={metaLoading} />
      <CurrencyStats CurrencyLatestInfo={currencyData} isLoading={statsLoading} />
    </>
  );
}
