"use client";
import useSWR from "swr";
import { fetcher } from "../api/fetcher";
import { Currency } from "../types/currency";

export default function Page() {
  const { data, error } = useSWR<Currency[]>("/api/data", fetcher);
  console.log(data);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <main>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <h1>Hello from Dashboard</h1>
        {data.map((currency) => (
          <div key={currency.id}>{currency.name}</div> // Ensure each item has a unique key
        ))}
      </div>
    </main>
  );
}
