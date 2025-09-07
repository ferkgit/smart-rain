from fastapi import FastAPI
from fastapi import APIRouter

from .auth.router import router as auth_router
from .integrations.router import router as integrations_router
from .crm.router import router as crm_router
from .pricing.router import router as pricing_router
from .discounts.router import router as discounts_router
from .routing.router import router as routing_router

from .core.config import settings


app = FastAPI(title=settings.app_name)

# Dashboard router
dashboard_router = APIRouter()

@dashboard_router.get("/dashboard/kpi")
async def get_dashboard_kpi():
    # Dummy data, replace with real queries
    return {
        "monthly_revenue": 120000,
        "lead_count": 42,
        "stock_level": 3500,
        "active_customers": 18
    }

app.include_router(dashboard_router, prefix="", tags=["dashboard"])

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(integrations_router, prefix="/integrations", tags=["integrations"])
app.include_router(crm_router, prefix="/crm", tags=["crm"])
app.include_router(pricing_router, prefix="/pricing", tags=["pricing"])
app.include_router(discounts_router, prefix="/discounts", tags=["discounts"])
app.include_router(routing_router, prefix="/routing", tags=["routing"])


@app.get("/")
async def root():
    return {"message": "Smart Rain API"}
