import { CurrencyLatestInfo } from "../types/currencyLatestInfo";
import { Metadata } from "../types/metadata";
// Generic fetch and transform function
export const fetchAndTransformData = async <T>(
  url: string,
  transform: (data: any) => T
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
  return result.data; // Adjust this based on the actual structure of your API response
};

export const transformCurrencyData = (json: any): CurrencyLatestInfo[] => {
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

export const transformMetaData = (json: any): Metadata[] => {
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
