# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint (next/core-web-vitals)
npm run start    # Run production server
```

No test suite is configured.

## Architecture

Next.js 14 App Router app that displays cryptocurrency data from the CoinMarketCap Pro API. Tailwind CSS + DaisyUI for UI, SWR for client-side data fetching, TypeScript throughout.

### Data Flow

1. React client components call SWR with a URL pointing to `/api/data`
2. `/src/app/api/data/route.js` acts as a proxy — it extracts the `subpath` and query params from the request, appends the `API_KEY` env var, and forwards to `https://pro-api.coinmarketcap.com`
3. The response is returned to the client as JSON
4. Fetcher utilities in `/src/app/api/fetcher.ts` transform raw API responses into typed interfaces using a `fetchAndTransformData(url, transformFn)` pattern

### Routing

App Router pages under `src/app/`:
- `/` — Login page
- `/dashboard` — Main currency listings (search + sort)
- `/dashboard/currencies` — Fiat currency map
- `/dashboard/[id]` — Individual currency detail (uses metadata + latest-quote endpoints)

### State Management

No global state manager. Local `useState` for UI concerns (sorting, filtering, search), SWR for remote data and caching. No Context or Zustand.

### Key Conventions

- Path alias `@/*` → `src/*`
- TypeScript interfaces live in `src/app/types/`
- Number/date formatting utilities in `src/utils/formatters.tsx`
- URL parameter extraction helper in `src/utils/handleUrl.tsx`
- API constants (base URL, pagination limits) in `src/config/constants.ts`

### Environment Variables

- `API_KEY` — CoinMarketCap Pro API key, read server-side only in `src/app/api/data/route.js`
