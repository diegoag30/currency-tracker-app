import { ConversionResult } from "../types/conversionResult";
import { CurrencyLatestInfo } from "../types/currencyLatestInfo";
import { GlobalMetrics } from "../types/globalMetrics";
import { Metadata } from "../types/metadata";
import {
  CMCConversionResponse,
  CMCGlobalMetricsResponse,
  CMCListingsResponse,
  CMCMetaDataResponse,
} from "../types/api";

export const fetchAndTransformData = async <T>(
  url: string,
  transform: (data: unknown) => T
): Promise<T> => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return transform(json);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Data fetching failed");
  }
};

export const fetcher = async (url: string): Promise<[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const result = await response.json();
  return result.data;
};

export const transformCurrencyData = (json: CMCListingsResponse): CurrencyLatestInfo[] => {
  const data = json.data;
  return Object.keys(data).map((key) => {
    const item = data[key];
    return {
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      price: item.quote.USD.price,
      volume_24h: item.quote.USD.volume_24h,
      volume_change_24h: item.quote.USD.volume_change_24h,
      percent_change_24h: item.quote.USD.percent_change_24h,
      percent_change_7d: item.quote.USD.percent_change_7d,
      percent_change_30d: item.quote.USD.percent_change_30d,
      market_cap: item.quote.USD.market_cap,
      circulating_supply: item.circulating_supply,
      total_supply: item.total_supply,
      last_updated: item.quote.USD.last_updated,
    };
  });
};

export const transformConversionData = (json: CMCConversionResponse, convertTo: string): ConversionResult => {
  const item = json.data;
  const key = convertTo.toUpperCase();
  return {
    id: item.id,
    name: item.name,
    symbol: item.symbol,
    amount: item.amount,
    convertedAmount: item.quote[key].price,
    convertTo: key,
    last_updated: item.quote[key].last_updated,
  };
};

export const transformGlobalMetrics = (json: CMCGlobalMetricsResponse): GlobalMetrics => {
  const d = json.data;
  const usd = d.quote.USD;
  return {
    btc_dominance: d.btc_dominance,
    eth_dominance: d.eth_dominance,
    active_cryptocurrencies: d.active_cryptocurrencies,
    total_cryptocurrencies: d.total_cryptocurrencies,
    active_market_pairs: d.active_market_pairs,
    active_exchanges: d.active_exchanges,
    total_exchanges: d.total_exchanges,
    last_updated: d.last_updated,
    total_market_cap: usd.total_market_cap,
    total_volume_24h: usd.total_volume_24h,
    altcoin_volume_24h: usd.altcoin_volume_24h,
    defi_volume_24h: usd.defi_volume_24h,
    stablecoin_volume_24h: usd.stablecoin_volume_24h,
    total_market_cap_yesterday: usd.total_market_cap_yesterday,
    total_volume_24h_yesterday: usd.total_volume_24h_yesterday,
    total_market_cap_yesterday_percentage_change: usd.total_market_cap_yesterday_percentage_change,
    total_volume_24h_yesterday_percentage_change: usd.total_volume_24h_yesterday_percentage_change,
  };
};

export const transformMetaData = (json: CMCMetaDataResponse): Metadata[] => {
  const data = json.data;
  return Object.keys(data).map((key) => {
    const item = data[key];
    return {
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      slug: item.slug,
      logo: item.logo,
      description: item.description,
    };
  });
};
