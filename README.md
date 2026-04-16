# Currency Tracker

A cryptocurrency and fiat currency tracking app built with Next.js 14, powered by the [CoinMarketCap Pro API](https://coinmarketcap.com/api/).

## Features

- **Dashboard** — live crypto listings with search, sort, and pagination
- **Currency detail** — price, market cap, volume, supply stats, and full description for each coin
- **Fiat currencies** — searchable table of world currencies with flag emojis, ISO codes, and signs
- **Converter** — real-time currency conversion
- **Overview** — global market metrics (total market cap, BTC/ETH dominance, active exchanges)
- **Watchlist** — save and track favourite currencies (requires login)
- **Authentication** — login/signup via Supabase

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + DaisyUI |
| Data fetching | SWR |
| Auth + DB | Supabase |
| Testing | Vitest |

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```env
API_KEY=your_coinmarketcap_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

- `API_KEY` — CoinMarketCap Pro API key (server-side only, never exposed to the client)
- Supabase credentials — from your project's API settings at supabase.com

### 3. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Commands

```bash
pnpm dev       # Start dev server (localhost:3000)
pnpm build     # Production build
pnpm start     # Run production server
pnpm lint      # ESLint (next/core-web-vitals)
pnpm vitest    # Run tests in watch mode
pnpm vitest run # Run tests once
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── data/route.js        # API proxy → CoinMarketCap
│   │   └── fetcher.ts           # Fetch + transform utilities
│   ├── dashboard/
│   │   ├── page.tsx             # Crypto listings
│   │   ├── [id]/page.tsx        # Currency detail
│   │   ├── currencies/page.tsx  # Fiat currencies
│   │   ├── converter/page.tsx   # Currency converter
│   │   ├── overview/page.tsx    # Global market metrics
│   │   └── watchlist/page.tsx   # Saved currencies
│   ├── page.tsx                 # Login page
│   └── types/                   # TypeScript interfaces
├── components/
│   ├── tables/                  # Table components
│   └── buttons/                 # Reusable button components
├── hooks/                       # Custom React hooks
├── utils/                       # Formatters, flag helpers
└── config/
    └── constants.ts             # API config, table columns, mappings
```

## Data Flow

1. Client components fetch data via SWR pointing to `/api/data?subpath=...`
2. The `/api/data` route acts as a proxy — it appends the `API_KEY` and forwards the request to CoinMarketCap
3. Responses are transformed into typed interfaces using `fetchAndTransformData()` in `src/app/api/fetcher.ts`
4. The API key is never exposed to the browser
