"use client";
import {
  fetchAndTransformData,
  transformConversionData,
} from "@/app/api/fetcher";
import { ConversionResult } from "@/app/types/conversionResult";
import { formatDate } from "@/utils/formatters";
import { NumericFormat } from "react-number-format";
import { useState } from "react";
import useSWR from "swr";

function buildUrl(amount: string, symbol: string, convert: string): string {
  const params = new URLSearchParams({
    subpath: "/v1/tools/price-conversion",
    amount,
    symbol: symbol.toUpperCase(),
    convert: convert.toUpperCase(),
  });
  return `/api/data?${params.toString()}`;
}

export default function Page() {
  const [amount, setAmount] = useState("1");
  const [symbol, setSymbol] = useState("BTC");
  const [convert, setConvert] = useState("USD");
  const [swrKey, setSwrKey] = useState<string | null>(null);
  const [submittedConvert, setSubmittedConvert] = useState("USD");

  const conversionFetcher = (url: string) =>
    fetchAndTransformData(url, (json) =>
      transformConversionData(json, submittedConvert)
    );

  const { data, error, isLoading } = useSWR<ConversionResult>(
    swrKey,
    conversionFetcher
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (parseFloat(amount) <= 0 || !symbol.trim() || !convert.trim()) return;
    setSubmittedConvert(convert);
    setSwrKey(buildUrl(amount, symbol, convert));
  }

  return (
    <main>
      <div className="prose">
        <h1>Converter</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4 mt-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Amount</span>
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input input-bordered w-36"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">From</span>
          </label>
          <input
            type="text"
            placeholder="BTC"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="input input-bordered w-28 uppercase"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">To</span>
          </label>
          <input
            type="text"
            placeholder="USD"
            value={convert}
            onChange={(e) => setConvert(e.target.value)}
            className="input input-bordered w-28 uppercase"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Convert
        </button>
      </form>

      <div className="mt-6">
        {isLoading && (
          <div className="stats shadow w-full">
            <div className="stat">
              <div className="skeleton h-4 w-32 mb-3" />
              <div className="skeleton h-8 w-48" />
            </div>
          </div>
        )}

        {error && (
          <div role="alert" className="alert alert-error">
            <span>Conversion failed. Check your symbols and try again.</span>
          </div>
        )}

        {data && !isLoading && (
          <div className="stats shadow w-full">
            <div className="stat">
              <div className="stat-title">
                {data.amount} {data.symbol} ({data.name})
              </div>
              <div className="stat-value text-primary">
                <NumericFormat
                  value={data.convertedAmount}
                  displayType="text"
                  thousandSeparator
                  decimalScale={6}
                  suffix={` ${data.convertTo}`}
                />
              </div>
              <div className="stat-desc">
                Last updated: {formatDate(data.last_updated)}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
