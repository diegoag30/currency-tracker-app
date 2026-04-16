import { Currency } from "@/app/types/currency";
import { useState } from "react";

export function useFilterCurrencies(currencies: Currency[]) {
  const [query, setQuery] = useState("");

  const filtered = currencies.filter((c) => {
    const q = query.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.symbol.toLowerCase().includes(q) ||
      c.sign.toLowerCase().includes(q)
    );
  });

  return { query, setQuery, filtered };
}
