# Lacus Solutions

Marketing site for Lacus — custom software development. Built with **Next.js** (App Router), **React**, **TypeScript**, **Tailwind CSS v4**, and **next-intl** (English + Brazilian Portuguese).

## Requirements

- [Bun](https://bun.sh) 1.4.x (see `vercel.json`)

## Scripts

```sh
bun install
bun run dev      # development server (http://localhost:3000)
bun run build    # production build
bun run start    # serve production build
bun run lint     # ESLint
bun run typecheck
bun run test     # unit tests (Vitest)
```

## Routing & i18n

- Locales: `/en/` (default) and `/pt/`
- Bare `/` redirects via proxy using cookie → `Accept-Language` → `en`
- Messages: `src/i18n/locales/en.json`, `src/i18n/locales/pt.json`

## Deployment

Configured for **Vercel** with Bun (`vercel.json`).

## Project structure

Application source lives under `src/` (`src/app` for routes, `src/components` for UI). Tooling config files remain at the repository root (`next.config.ts`, `postcss.config.js`, etc.).
