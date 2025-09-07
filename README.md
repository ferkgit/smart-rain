# Smart Rain Portal

## Goals
- Centralizes rainfall data and reporting to help users make informed water management decisions.
- Provides a unified interface for administrators to manage content and commerce data.

## Tech Stack
- **Frontend:** React with Tailwind CSS and [shadcn/ui](https://ui.shadcn.com) for composable UI components.
- **Backend Integrations:**
  - **Pantheon** for content management.
  - **MerchantPro** for e‑commerce and order data.

## Deployment Requirements
- Node.js 18+
- npm or Yarn package manager
- Access to Pantheon and MerchantPro APIs
- Database (PostgreSQL or compatible)

## Installation & Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Smoke Tests
Run the smoke test suite to verify key features such as KPI cards, lead geolocation, route creation, depot start, and price-list existence:

```bash
npm test
```

## Environment Variables
Create a `.env` file with the following keys before running or deploying the portal:

### Pantheon Integration
- `PANTHEON_API_KEY`
- `PANTHEON_BASE_URL`

### MerchantPro Integration
- `MERCHANTPRO_API_KEY`
- `MERCHANTPRO_BASE_URL`

### Database
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
