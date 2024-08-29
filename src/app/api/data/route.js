import { API_BASE_URL } from "@/config/constants";

export async function GET(req) {
  try {
    const url = new URL(req.nextUrl);
    const subpath = url.searchParams.get("subpath");
    const apiKey = process.env.API_KEY; // Make sure to set this in your environment variables
    // Remove 'subpath' from searchParams
    url.searchParams.delete("subpath");

    // Create a query string from the remaining search parameters
    const queryString = url.searchParams.toString();
    //console.log(req.nextUrl.searchParams);
    const full_url = `${API_BASE_URL}${subpath}?${queryString}&CMC_PRO_API_KEY=${apiKey}`;

    console.log(full_url);
    if (!apiKey) {
      throw new Error("API_KEY is not set in environment variables");
    }
    const response = await fetch(
      // `${API_BASE_URL}${subpath}?start=1&limit=7&sort=id&CMC_PRO_API_KEY=${apiKey}`
      full_url
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
