// pages/api/data.js
const base_url = "https://pro-api.coinmarketcap.com";

export async function GET(req) {
  console.log("REACHED");
  try {
    const apiKey = process.env.API_KEY; // Make sure to set this in your environment variables
    if (!apiKey) {
      throw new Error("API_KEY is not set in environment variables");
    }

    const response = await fetch(
      `${base_url}/v1/fiat/map?start=1&limit=5&sort=id&CMC_PRO_API_KEY=${apiKey}`
    );
    // console.log(response);
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
