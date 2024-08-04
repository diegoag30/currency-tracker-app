"use client";
import useSWR from "swr";

const fetcher = async (url: string): Promise<Currency[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const result = await response.json();
  return result.data; // Adjust this based on the actual structure of your API response
};
interface Currency {
  id: number; // or string if your IDs are strings
  name: string;
  sign: string;
  symbol: string;
}

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
