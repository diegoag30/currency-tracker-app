import { API_BASE_URL } from "@/config/constants";

export async function GET(req) {
  try {
    const subpath = req.nextUrl.searchParams.get("subpath");
    const apiKey = process.env.API_KEY; // Make sure to set this in your environment variables
    const full_url = `${API_BASE_URL}${subpath}?limit=7&CMC_PRO_API_KEY=${apiKey}`;
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
