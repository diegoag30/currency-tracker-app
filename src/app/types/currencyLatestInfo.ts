export interface CurrencyLatestInfo {
  id: number;
  name: string;
  symbol: string;
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  market_cap: number;
  circulating_supply: number;
  total_supply: number;
  last_updated: string;
}
