// src/components/Table.tsx
"use client";
import { Currency } from "@/app/types/currency";
import { useFilterCurrencies } from "@/hooks/useFilterCurrencies";
import { getCurrencyFlag } from "@/utils/flags";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

interface TableProps {
  currencies: Currency[];
}

const CurrencyTable: React.FC<TableProps> = ({ currencies }) => {
  const { query, setQuery, filtered } = useFilterCurrencies(currencies);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <label className="input input-bordered flex items-center gap-2 flex-1">
          <input
            type="text"
            className="grow"
            placeholder="Search by name or symbol"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <MagnifyingGlassIcon className="h-4 w-4 opacity-50" />
        </label>
        <span className="badge badge-neutral">{filtered.length} currencies</span>
      </div>
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
            {filtered.map((currency) => (
              <tr className="hover" key={currency.id}>
                <td>
                  <span className="flex items-center gap-2">
                    <span className="text-lg leading-none">{getCurrencyFlag(currency.symbol)}</span>
                    {currency.name}
                  </span>
                </td>
                <td>{currency.sign}</td>
                <td>{currency.symbol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrencyTable;
