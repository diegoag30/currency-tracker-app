export const API_BASE_URL = "https://pro-api.coinmarketcap.com";
export const MAX_ITEMS_PER_PAGE = 7;
export const DECIMAL_SCALE = 2;

export const THEMES = ["night", "nord", "cyberpunk"] as const;
export type Theme = (typeof THEMES)[number];

export const CURRENCY_TABLE_COLUMNS: { label: string; value: string }[] = [
  { label: "Name", value: "name" },
  { label: "Symbol", value: "symbol" },
  { label: "Price", value: "price" },
  { label: "Volume 24h", value: "volume_24h" },
  { label: "Change 24h", value: "percent_change_24h" },
  { label: "Market Cap", value: "market_cap" },
  { label: "Circulating Supply", value: "circulating_supply" },
];
