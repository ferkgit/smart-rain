# Copilot Instructions for Smart Rain Distribution B2B Portal

## Overview
This project is a B2B web portal for managing distribution of pipes and equipment, integrating CRM, pricing, discounts, delivery planning, and external ERP/e-commerce systems.

### Architecture
- **Frontend**: React (with Tailwind, shadcn/ui), located in `frontend/`
- **Backend**: Python (FastAPI style) in `backend/` (main logic), with some Node.js modules for delivery/routing in `backend/delivery/`
- **Integrations**: Pantheon (read-only, ERP), MerchantPro (bi-directional, e-commerce)
- **Master Data**: App is the source of truth for pricing and discounts (rabati)

## Key Directories & Files
- `backend/app/` — Main backend app (CRM, pricing, discounts, integrations)
- `backend/api/` — API endpoints (Pantheon, etc.)
- `backend/delivery/` — Delivery/routing logic (JS)
- `backend/discounts/` — Discount models and simulation
- `frontend/src/` — React app (UI, map, route planner)

## Developer Workflows
- **Backend (Python):**
  - Install deps: `pip install -r backend/requirements.txt`
  - Run: `python -m backend.main`
  - Test: (Python tests not present by default; see JS for delivery logic)
- **Delivery Logic (Node.js):**
  - Run tests: `cd backend/delivery && npm install && npm test`
- **Frontend:**
  - Run: `cd frontend && npm install && npm run dev`

## Patterns & Conventions
- **Integrations:**
  - Pantheon: Read-only sync (docs, stock, accounts) via `backend/integrations/pantheon_client.py`
  - MerchantPro: Bi-directional sync (prices, stock, orders)
  - Sync status, logs, and actions managed in backend/app/integrations/
- **Pricing & Discounts:**
  - App is master for all pricing/rabati logic (see `backend/discounts/`)
  - Simulation and audit log for changes
- **Routing/Delivery:**
  - DeliveryStop, vehicle, and route logic in `backend/delivery/`
  - Algorithms: nearest neighbor, 2-Opt
- **Map/Route Planner:**
  - Map UI in `frontend/src/components/map/`
  - Static OSM, plan for interactive map (Leaflet/MapLibre)

## Testing & Validation
- **Smoke tests:**
  - KPIs present
  - Leads have coordinates
  - Routes have >1 stop and start at depot
  - Price lists exist

## Integration Points
- **Pantheon**: Read-only, periodic sync
- **MerchantPro**: Bi-directional, with sync status/actions
- **CSV Import/Export**: For leads and price lists

## Examples
- To add a new integration, follow the pattern in `backend/app/integrations/`
- To extend delivery logic, see `backend/delivery/routeService.js`
- For new UI features, use shadcn/ui and Tailwind in `frontend/src/components/`

---
For questions, review `README.md` and key backend/frontend directories for examples of data flow and integration patterns.
