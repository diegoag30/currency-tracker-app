// src/components/Table.tsx
import { CurrencyLatestInfo } from "@/app/types/currencyLatestInfo";
import React from "react";

interface LatestTableProps {
  currencies: CurrencyLatestInfo[];
}

const CurrencyLatestTable: React.FC<LatestTableProps> = ({ currencies }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Volume 24h</th>
            <th>Market Cap</th>
            <th>Total Supply</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency) => (
            <tr className="hover" key={currency.id}>
              <td>{currency.name}</td>
              <td>{currency.symbol}</td>
              <td>{currency.price}</td>
              <td>{currency.volume_24h}</td>
              <td>{currency.market_cap}</td>
              <td>{currency.total_supply}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyLatestTable;
