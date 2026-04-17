import { API_BASE_URL } from "@/config/constants";
import { extractSubpathAndQuery } from "@/utils/handleUrl";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: "API_KEY is not set in environment variables" },
      { status: 500 }
    );
  }

  try {
    const { subpath, queryString } = extractSubpathAndQuery(req.nextUrl);
    const full_url = `${API_BASE_URL}${subpath}?${queryString}&CMC_PRO_API_KEY=${apiKey}`;

    const response = await fetch(full_url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
