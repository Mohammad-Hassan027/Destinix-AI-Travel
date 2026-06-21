# AGENTS.md

## Project Overview

AI-powered travel planning platform. React 19 frontend + Express backend + PostgreSQL (Prisma) + Firebase Auth + Gemini AI + Razorpay payments + Socket.io real-time collaboration.

## Essential Commands

```bash
# Development (starts Express + Vite HMR on port 3000)
npm run dev

# Build & preview
npm run build
npm run preview

# Type checking (this is the "lint" command)
npm run lint          # runs: tsc --noEmit

# Tests
npm run test          # runs: vitest run

# Database
npx prisma generate   # generate client after schema changes
npx prisma db push    # push schema to database
npx prisma migrate dev # create migrations
```

**Command order matters**: After changing `prisma/schema.prisma`, run `npx prisma generate` before `npm run lint` or `npm run test`.

## Commit Convention

Enforced via commitlint + husky `commit-msg` hook. Non-conforming commits are rejected.

Format: `<type>[optional scope]: <description>`

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

Scope must be kebab-case. Subject must be lowercase, max 72 chars.

## Branch Naming

Pattern: `category/short-description` (e.g., `feat/google-auth`, `fix/trip-details-css`)

## Architecture

**Single package** (not a monorepo).

- `server.ts` — Express backend entry point. Runs Vite in middleware mode for dev, serves static `dist/` in production. Contains most API routes.
- `server/collaboration/` — Collaborative trip planning feature (controllers, services, routes, socket handlers, validators). Real-time via Socket.io.
- `App.tsx` — React Router entry point.
- `components/` — React components (pages, UI elements).
- `services/` — Client-side API connectors (auth, gemini).
- `prisma/schema.prisma` — Database schema (PostgreSQL).
- `constants.tsx` — MOCK_PACKAGES data (also used for auto-seeding).
- `i18n/` — i18next config with English and Hindi locales.

## Key Gotchas

1. **Environment variables**: Client-side vars need `VITE_` prefix (Vite convention). Server-side vars use plain names. Both `RAZORPAY_KEY_ID` and `VITE_RAZORPAY_KEY_ID` exist in the codebase.

2. **Database connection**: Uses `DIRECT_URL` for Prisma migrations, `DATABASE_URL` for runtime connection pooling. Both must be set.

3. **Auto-seeding**: If `TravelPackage` table is empty, `GET /api/packages` auto-seeds from `MOCK_PACKAGES`. No manual seed step needed for dev.

4. **SMTP fallback**: Email features (OTP, booking confirmation) work in demo mode without SMTP credentials. Set `SMTP_USER` and `SMTP_PASS` for real emails.

5. **Path alias**: `@/` maps to project root (configured in both `tsconfig.json` and `vite.config.ts`).

6. **Vite config**: `process.env.GEMINI_API_KEY` is injected at build time via `define` in `vite.config.ts`.

7. **Prisma adapter**: Uses `@prisma/adapter-pg` with `pg` Pool (not the default Prisma engine). This is set up in `server.ts`.

## Testing

- Framework: Vitest
- Single test file: `tests/collaboration.test.ts`
- Tests mock the database module (`server/collaboration/services/db`) and mail service
- Run with `npm run test`

## Internationalization

- i18next with browser language detection
- Supported languages: English (`en`), Hindi (`hi`)
- Translation files: `i18n/locales/{en,hi}/translation.json`
- Language preference stored in `localStorage` under key `destinix_language`

## Styling

- Tailwind CSS with dark mode (glassmorphism aesthetic)
- Framer Motion (`motion` package) for animations
- Lucide icons

## Database Schema Highlights

Key models: `User`, `TravelPackage`, `Booking`, `TripGroup`, `TripMember`, `Expense`, `Review`

- Bookings have optional `BookingFlight`, `BookingHotel`, `BookingAddon` relations
- Collaboration: `TripGroup` → `TripMember`, `SharedItinerary`, `DestinationSuggestion`, `DiscussionMessage`, `SharedBooking`, `Expense`
- Expense categories: `food`, `transport`, `stay`, `activities`, `other`

## Code Style

- Functional React components with hooks
- TypeScript (but `strict` mode is NOT enabled in tsconfig)
- Avoid `any` types where possible
- Remove `console.log` statements before committing
- Use Tailwind utility classes for styling

## Available Skills (`.agents/skills/`)

| Skill | What it does in this repo |
|---|---|
| `conventional-commit` | Writes commit messages in the `type(scope): description` format enforced by husky + commitlint |
| `jsdoc-typescript-docs` | Adds JSDoc comments to TypeScript files — server routes, services, Prisma models, React components |
| `prisma-expert` | Designs schema changes, writes migrations, and optimizes Prisma queries for the PostgreSQL database |
| `react-hook-builder` | Creates custom React hooks for patterns used here: auth state, trip data fetching, local storage, debounce |
| `typescript-advanced-types` | Writes complex TypeScript types for API responses, Prisma model shapes, and component props |
