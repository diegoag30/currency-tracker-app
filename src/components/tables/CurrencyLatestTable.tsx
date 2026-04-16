// src/components/Table.tsx
"use client";

import { CurrencyLatestInfo } from "@/app/types/currencyLatestInfo";
import { AbbreviatedNumberFormat, formatPrice, formatVolumeChange } from "@/utils/formatters";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";
import WatchlistButton from "@/components/WatchlistButton";
import { CURRENCY_TABLE_COLUMNS } from "@/config/constants";

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

  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            {CURRENCY_TABLE_COLUMNS.map((column) => (
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
              <td>
                <WatchlistButton
                  currency={{
                    currency_id: currency.id,
                    currency_name: currency.name,
                    currency_symbol: currency.symbol,
                  }}
                />
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <img
                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}
                    alt={currency.name}
                    className="w-6 h-6 rounded-full"
                  />
                  {currency.name}
                </div>
              </td>
              <td>{currency.symbol}</td>
              <td>{formatPrice(currency.price)}</td>
              <td>$&nbsp;{AbbreviatedNumberFormat(currency.volume_24h)}</td>
              <td className={currency.percent_change_24h < 0 ? "text-error" : "text-success"}>
                {formatVolumeChange(currency.percent_change_24h)}
              </td>
              <td>$&nbsp;{AbbreviatedNumberFormat(currency.market_cap)}</td>
              <td>{AbbreviatedNumberFormat(currency.circulating_supply)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyLatestTable;
