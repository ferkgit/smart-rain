
from fastapi import APIRouter

router = APIRouter()

@router.get("/ping")
async def ping():
    return {"message": "pong from discounts"}

# Dummy rabati data
DISCOUNTS = [
    {"id": 1, "type": "kupac", "name": "Firma A", "value": 5, "policy": "stack"},
    {"id": 2, "type": "segment", "name": "Tier B", "value": 3, "policy": "exclusive"},
    {"id": 3, "type": "grupa", "name": "Cevi", "value": 2, "policy": "max"},
    {"id": 4, "type": "global", "name": "Svi kupci", "value": 1, "policy": "stack"},
]

@router.get("/rules")
async def get_discount_rules():
    return DISCOUNTS
