"use client";
import {
  fetchAndTransformData,
  transformConversionData,
  transformCurrencyData,
  fetcher,
} from "@/app/api/fetcher";
import { ConversionResult } from "@/app/types/conversionResult";
import { CurrencyLatestInfo } from "@/app/types/currencyLatestInfo";
import { Currency } from "@/app/types/currency";
import { formatDate } from "@/utils/formatters";
import { NumericFormat } from "react-number-format";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { MAX_ITEMS_PER_PAGE } from "@/config/constants";

function buildUrl(amount: string, symbol: string, convert: string): string {
  const params = new URLSearchParams({
    subpath: "/v1/tools/price-conversion",
    amount,
    symbol,
    convert,
  });
  return `/api/data?${params.toString()}`;
}

export default function Page() {
  const [amount, setAmount] = useState("1");
  const [symbol, setSymbol] = useState("");
  const [convert, setConvert] = useState("");
  const [swrKey, setSwrKey] = useState<string | null>(null);
  const [submittedConvert, setSubmittedConvert] = useState("");

  // Fetch crypto options for "From"
  const cryptoParams = new URLSearchParams({
    subpath: "/v1/cryptocurrency/listings/latest",
    limit: MAX_ITEMS_PER_PAGE.toString(),
  });
  const { data: cryptoOptions } = useSWR<CurrencyLatestInfo[]>(
    `/api/data?${cryptoParams.toString()}`,
    (url) => fetchAndTransformData(url, transformCurrencyData)
  );

  // Fetch fiat options for "To"
  const { data: fiatOptions } = useSWR<Currency[]>(
    `/api/data?subpath=${encodeURIComponent("/v1/fiat/map")}`,
    fetcher
  );

  // Set defaults once options load
  useEffect(() => {
    if (cryptoOptions && cryptoOptions.length > 0 && !symbol) {
      const btc = cryptoOptions.find((c) => c.symbol === "BTC");
      setSymbol(btc ? btc.symbol : cryptoOptions[0].symbol);
    }
  }, [cryptoOptions, symbol]);

  useEffect(() => {
    if (fiatOptions && fiatOptions.length > 0 && !convert) {
      const usd = fiatOptions.find((c) => c.symbol === "USD");
      setConvert(usd ? usd.symbol : fiatOptions[0].symbol);
    }
  }, [fiatOptions, convert]);

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
    if (parseFloat(amount) <= 0 || !symbol || !convert) return;

    // Validate symbol and convert are strictly from the loaded option lists
    const validSymbol = cryptoOptions?.some((c) => c.symbol === symbol);
    const validConvert = fiatOptions?.some((c) => c.symbol === convert);
    if (!validSymbol || !validConvert) return;

    setSubmittedConvert(convert);
    setSwrKey(buildUrl(amount, symbol, convert));
  }

  const optionsReady = !!cryptoOptions && !!fiatOptions;

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
          <select
            className="select select-bordered w-36"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            disabled={!optionsReady}
            required
          >
            {!optionsReady && <option value="">Loading...</option>}
            {cryptoOptions?.map((c) => (
              <option key={c.id} value={c.symbol}>
                {c.symbol} — {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">To</span>
          </label>
          <select
            className="select select-bordered w-36"
            value={convert}
            onChange={(e) => setConvert(e.target.value)}
            disabled={!optionsReady}
            required
          >
            {!optionsReady && <option value="">Loading...</option>}
            {fiatOptions?.map((c) => (
              <option key={c.id} value={c.symbol}>
                {c.symbol} — {c.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={!optionsReady}>
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
            <span>Conversion failed. Please try again.</span>
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
