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

  const { data: metaData, error: error1 } = useSWR<Metadata[]>(
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

  const { data: currencyData, error: error2 } = useSWR<CurrencyLatestInfo[]>(
    `/api/data?${CurrencyDataqueryString}`,
    CurrencyDatafetcher
  );

  return (
    <>
      <CurrencyCard metadata={metaData} />
      <CurrencyStats CurrencyLatestInfo={currencyData} />
    </>
  );
}
