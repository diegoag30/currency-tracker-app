interface CMCQuote {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  market_cap: number;
  last_updated: string;
}

interface CMCCurrencyItem {
  id: number;
  name: string;
  symbol: string;
  circulating_supply: number;
  total_supply: number;
  quote: Record<string, CMCQuote>;
}

export interface CMCListingsResponse {
  data: Record<string, CMCCurrencyItem>;
}

export interface CMCConversionResponse {
  data: {
    id: number;
    name: string;
    symbol: string;
    amount: number;
    quote: Record<string, { price: number; last_updated: string }>;
  };
}

export interface CMCGlobalMetricsResponse {
  data: {
    btc_dominance: number;
    eth_dominance: number;
    active_cryptocurrencies: number;
    total_cryptocurrencies: number;
    active_market_pairs: number;
    active_exchanges: number;
    total_exchanges: number;
    last_updated: string;
    quote: Record<
      string,
      {
        total_market_cap: number;
        total_volume_24h: number;
        altcoin_volume_24h: number;
        defi_volume_24h: number;
        stablecoin_volume_24h: number;
        total_market_cap_yesterday: number;
        total_volume_24h_yesterday: number;
        total_market_cap_yesterday_percentage_change: number;
        total_volume_24h_yesterday_percentage_change: number;
      }
    >;
  };
}

export interface CMCMetaDataResponse {
  data: Record<
    string,
    {
      id: number;
      name: string;
      symbol: string;
      slug: string;
      logo: string;
      description: string;
    }
  >;
}
