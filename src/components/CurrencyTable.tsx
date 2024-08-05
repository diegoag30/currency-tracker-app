// src/components/Table.tsx
import { Currency } from "@/app/types/currency";
import React from "react";

interface TableProps {
  currencies: Currency[];
}

const CurrencyTable: React.FC<TableProps> = ({ currencies }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sign</th>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency) => (
            <tr className="hover" key={currency.id}>
              <td>{currency.name}</td>
              <td>{currency.sign}</td>
              <td>{currency.symbol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTable;
