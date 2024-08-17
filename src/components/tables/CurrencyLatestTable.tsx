// src/components/Table.tsx
import { CurrencyLatestInfo } from "@/app/types/currencyLatestInfo";
import {
  formatDate,
  formatPrice,
  formatVolumeChange,
} from "@/utils/formatters";
import React from "react";
interface LatestTableProps {
  currencies: CurrencyLatestInfo[];
  sortOption: keyof CurrencyLatestInfo;
  isAscending: boolean;
}

const CurrencyLatestTable: React.FC<LatestTableProps> = ({
  currencies,
  sortOption,
  isAscending,
}: LatestTableProps) => {
  const sortedCurrencies = [...currencies].sort((a, b) => {
    if (a[sortOption] < b[sortOption]) return isAscending ? -1 : 1;
    if (a[sortOption] > b[sortOption]) return isAscending ? 1 : -1;
    return 0;
  });
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Volume Change 24h</th>
            <th>Market Cap</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {sortedCurrencies.map((currency) => (
            <tr className="hover" key={currency.id}>
              <td>{currency.name}</td>
              <td>{currency.symbol}</td>
              <td>{formatPrice(currency.price)}</td>
              <td
                className={
                  currency.volume_change_24h < 0 ? "text-error" : "text-success"
                }
              >
                {formatVolumeChange(currency.volume_change_24h)}
              </td>
              <td>{formatPrice(currency.market_cap)}</td>
              <td>{formatDate(currency.last_updated)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyLatestTable;
