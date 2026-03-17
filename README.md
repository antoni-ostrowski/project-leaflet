# Nobel Laureates Visualization

An interactive visualization of Nobel Prize laureates built with React, Leaflet maps, and Express/MongoDB.

## Features

- **Map View** - Interactive world map showing Nobel laureates by country
- **Laureates List** - Browse and filter all Nobel laureates
- **Statistics** - Charts and analytics about Nobel prizes over time

## Tech Stack

**Frontend** (`apps/web`)

- React19 + TanStack Router + TanStack Query
- Leaflet / react-leaflet for maps
- Recharts for statistics charts
- TailwindCSS v4

**Backend** (`packages/backend`)

- Express.js
- MongoDB

## Development

### Prerequisites

-[Bun](https://bun.sh) installed

- MongoDB instance running

### Setup

1. Install dependencies:

   ```bash
   bun install
   ```

2. Create environment files:

**packages/backend/.env**

```
DATABASE_URI="mongodb://localhost:27017/your-db"
```

**apps/web/.env.local**

```
VITE_FLAG_BASE_URL="https://flagcdn.com/w80"
VITE_BACKEND_URL="http://localhost:8080"
```

3. Run both servers:

Terminal 1 - Backend:

```bash
cd packages/backend && bun run dev
```

Terminal 2 - Frontend:

```bash
bun run dev:web
```

The frontend runs on port 3000, backend on port 8080.

### Useful Commands

| Command                              | Description                   |
| ------------------------------------ | ----------------------------- |
| `bun run dev:web`                    | Start frontend dev server     |
| `cd packages/backend && bun run dev` | Start backend with hot reload |
| `cd apps/web && bun run typecheck`   | Type check frontend           |
| `cd apps/web && bun run check`       | Format + lint fix             |

## Project Structure

```
├── apps/
│   └── web/              # Frontend React app
│       ├── src/
│       │   ├── components/   # UI components
│       │   ├── hooks/        # React hooks
│       │   ├── routes/       # TanStack Router routes
│       │   └── lib/          # Utilities
│       └── package.json
├── packages/
│   └── backend/          # Express + MongoDB backend
│       ├── endpoints/        # API route handlers
│       ├── schemas.ts        # Data schemas
│       └── index.ts          # App entry point
└── package.json           # Monorepo root
```

## database documents

Database just holds big array of objects of this shape.

```json
{
  "_id": {
    "$oid": "699ed4086dc463d0400bc2ef"
  },
  "id": "327",
  "firstname": "George R.",
  "surname": "Minot",
  "born": "1885-12-02",
  "died": "1950-02-25",
  "bornCountry": "USA",
  "bornCountryCode": "US",
  "bornCity": "Boston, MA",
  "diedCountry": "USA",
  "diedCountryCode": "US",
  "diedCity": "Brookline, MA",
  "gender": "male",
  "prizes": [
    {
      "year": "1934",
      "category": "medicine",
      "share": "3",
      "motivation": "\"for their discoveries concerning liver therapy in cases of anaemia\"",
      "affiliations": [
        {
          "name": "Harvard University",
          "city": "Cambridge, MA",
          "country": "USA"
        }
      ]
    }
  ]
}
```

