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
Run basic smoke tests to ensure the portal builds and the integrations respond:
```bash
npm test
```

## Pantheon API
The backend exposes endpoints for Pantheon data used by the dashboard:

- `GET /api/pantheon/documents`
- `GET /api/pantheon/inventory`
- `GET /api/pantheon/accounts`

## Environment Variables
Create a `.env` file with the following keys before running or deploying the portal:

### Pantheon Integration
- `PANTHEON_API_KEY`
- `PANTHEON_BASE_URL`
- `PANTHEON_SYNC_INTERVAL` (seconds between background syncs, defaults to 3600)

### MerchantPro Integration
- `MERCHANTPRO_API_KEY`
- `MERCHANTPRO_BASE_URL`

### Database
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
