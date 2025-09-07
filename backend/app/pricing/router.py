
from fastapi import APIRouter

router = APIRouter()

@router.get("/ping")
async def ping():
    return {"message": "pong from pricing"}

# Dummy cenovnici data
PRICELISTS = [
    {"id": 1, "type": "VP", "name": "Veleprodajni cenovnik", "items": [
        {"sku": "1001", "name": "Cevi 50mm", "group": "Cevi", "price": 1200, "with_vat": 1440},
        {"sku": "1002", "name": "Spojnica 50mm", "group": "Spojnice", "price": 300, "with_vat": 360},
    ]},
    {"id": 2, "type": "MP", "name": "Maloprodajni cenovnik", "items": [
        {"sku": "1001", "name": "Cevi 50mm", "group": "Cevi", "price": 1500, "with_vat": 1800},
        {"sku": "1002", "name": "Spojnica 50mm", "group": "Spojnice", "price": 400, "with_vat": 480},
    ]},
]

@router.get("/pricelists")
async def get_pricelists():
    return PRICELISTS
