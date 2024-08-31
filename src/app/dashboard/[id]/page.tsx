"use client";
import { fetchAndTransformData, transformMetaData } from "@/app/api/fetcher";
import { Metadata } from "@/app/types/metadata";
import CurrencyCard from "@/components/CurrencyCard";
import useSWR from "swr";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const fetcher = (url: string) =>
    fetchAndTransformData(url, transformMetaData);
  const queryParams = {
    subpath: "/v2/cryptocurrency/info",
    id: id,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const { data, error } = useSWR<Metadata[]>(
    `/api/data?${queryString}`,
    fetcher
  );

  return (
    <>
      <CurrencyCard metadata={data} />
    </>
  );
}
