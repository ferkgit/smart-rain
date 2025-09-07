
from fastapi import APIRouter

router = APIRouter()

@router.get("/ping")
async def ping():
    return {"message": "pong from integrations"}

# Dummy integracije status
INTEGRATIONS = [
    {
        "name": "Pantheon",
        "status": "connected",
        "uptime": "99.9%",
        "error_rate": "0.1%",
        "last_sync": "2025-09-07T08:00:00",
        "next_sync": "2025-09-07T12:00:00",
        "auth_method": "API key"
    },
    {
        "name": "MerchantPro",
        "status": "degraded",
        "uptime": "97.5%",
        "error_rate": "2.5%",
        "last_sync": "2025-09-07T07:30:00",
        "next_sync": "2025-09-07T11:30:00",
        "auth_method": "OAuth2"
    }
]

@router.get("/status")
async def get_integrations_status():
    return INTEGRATIONS
