// src/components/Table.tsx
"use client";

import { CurrencyLatestInfo } from "@/app/types/currencyLatestInfo";
import {
  formatDate,
  formatPrice,
  formatVolumeChange,
} from "@/utils/formatters";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
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
  const columns = [
    { label: "Name", value: "name" },
    { label: "Symbol", value: "symbol" },
    { label: "Price", value: "price" },
    { label: "Volume Change 24h", value: "volume_change_24h" },
    { label: "Market Cap", value: "market_cap" },
    { label: "Last Updated", value: "last_updated" },
    // Add other columns as needed
  ];
  const router = useRouter();
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.value}>
                {column.label}
                {sortOption === column.value && (
                  <>
                    {isAscending ? (
                      <ChevronDoubleUpIcon className="inline-block w-4 h-4 ml-1 text-secondary" />
                    ) : (
                      <ChevronDoubleDownIcon className="inline-block w-4 h-4 ml-1 text-secondary" />
                    )}
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedCurrencies.map((currency) => (
            <tr
              className="cursor-pointer hover"
              key={currency.id}
              onClick={() => router.push(`/dashboard/${currency.id}`)}
            >
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
