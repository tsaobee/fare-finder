# Fare Finder

A SaaS landing page + authenticated app shell for **Flight Price Notifier (機票降價通知)** — a
product that watches popular flight routes from Taipei and emails the user when the cheapest
fare drops to or below their target price. Aimed at budget-driven travelers who don't care
exactly when they fly, they just want a ticket under their budget.

- Public landing page (`/`) — hero, how it works, popular routes, watchlist preview, CTA.
- `/sign-in`, `/sign-up` — Supabase email/password + Google OAuth.
- `/app` — authenticated watchlist (add/remove routes and target prices).

## Tech stack

Plain **Vite + React** single-page app (no SSR). Client-side routing with **React Router**,
data fetching with **TanStack Query**, styling with **Tailwind CSS v4**, auth + data with
**Supabase**. The build (`vite build`) emits a static SPA to `dist/`.

## Development

Requires Node.js 20+ and npm.

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build locally
```

Environment variables live in `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`)
and are inlined at build time. The `VITE_SUPABASE_PUBLISHABLE_KEY` is Supabase's browser-safe
publishable key (`sb_publishable_*`) — the current name for what used to be the "anon key".

## Database

The Supabase schema lives in `supabase/migrations/`. Apply it to the project referenced in
`supabase/config.toml` with `supabase db push` (or paste the SQL into the dashboard SQL editor).

## Deployment (Vercel)

Static build, no server. `vercel.json` sets the framework preset, `dist/` as the output
directory, and a SPA fallback rewrite so deep links like `/app` resolve client-side. Set the
`VITE_SUPABASE_*` variables in the Vercel project settings (or rely on the committed `.env`).
