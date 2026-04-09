# LogiOps Admin

Internal logistics operations dashboard for the LogiOps engineering and operations teams.

## Tech Stack

- **Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Vitest + React Testing Library
- **Data:** Mock/local data layer (no database)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Dashboard overview
│   ├── shipments/          # Shipment tracking
│   ├── drivers/            # Fleet management
│   └── inventory/          # Warehouse inventory
├── components/
│   ├── active/             # Current production components
│   ├── legacy/             # Deprecated components (pending cleanup)
│   └── layout/             # Layout primitives (Sidebar, PageHeader)
├── flags/                  # Feature flag system
│   ├── featureFlags.ts     # Flag definitions
│   └── rolloutConfig.ts    # Rollout history
├── lib/
│   ├── logistics/          # Domain data and utilities
│   └── analytics/          # Dashboard metrics
tests/                      # Test suite
docs/                       # Documentation
```

## Feature Flags

This repo uses an in-code feature flag system. See [docs/feature-flag-policy.md](docs/feature-flag-policy.md) for the team's flag lifecycle policy and current flag status.

## Pages

- **Dashboard** — KPI overview with shipment, driver, and inventory metrics
- **Shipments** — Shipment cards with status filtering
- **Drivers** — Driver status panels with fleet info
- **Inventory** — Stock table with low-stock alerts
