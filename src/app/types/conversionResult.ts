export interface ConversionResult {
  id: number;
  name: string;
  symbol: string;
  amount: number;
  convertedAmount: number;
  convertTo: string;
  last_updated: string;
}
