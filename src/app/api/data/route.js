import { API_BASE_URL } from "@/config/constants";
import { extractSubpathAndQuery } from "@/utils/handleUrl";

export async function GET(req) {
  try {
    const { subpath, queryString } = extractSubpathAndQuery(req.nextUrl);

    const apiKey = process.env.API_KEY;

    const full_url = `${API_BASE_URL}${subpath}?${queryString}&CMC_PRO_API_KEY=${apiKey}`;

    if (!apiKey) {
      throw new Error("API_KEY is not set in environment variables");
    }
    const response = await fetch(full_url);

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
