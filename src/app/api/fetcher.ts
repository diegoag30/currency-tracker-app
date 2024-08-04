import { Currency } from "../types/currency";

export const fetcher = async (url: string): Promise<Currency[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const result = await response.json();
  return result.data; // Adjust this based on the actual structure of your API response
};
