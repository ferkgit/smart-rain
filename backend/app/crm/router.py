
from fastapi import APIRouter

router = APIRouter()

@router.get("/ping")
async def ping():
    return {"message": "pong from crm"}



# Dummy kupci data
CUSTOMERS = [
    {"id": 1, "name": "Firma A", "pib": "100100100", "grad": "Beograd", "tier": "A"},
    {"id": 2, "name": "Firma B", "pib": "200200200", "grad": "Novi Sad", "tier": "B"},
    {"id": 3, "name": "Firma C", "pib": "300300300", "grad": "Niš", "tier": "C"},
]

@router.get("/customers")
async def get_customers():
    return CUSTOMERS

# Dummy leadovi data
LEADS = [
    {"id": 1, "name": "Lead 1", "status": "novi", "source": "web", "owner": "Milan", "address": "Beograd, Ulica 1", "lat": 44.8, "lon": 20.5},
    {"id": 2, "name": "Lead 2", "status": "kontaktiran", "source": "email", "owner": "Jelena", "address": "Novi Sad, Ulica 2", "lat": 45.2, "lon": 19.8},
    {"id": 3, "name": "Lead 3", "status": "u obradi", "source": "telefon", "owner": "Marko", "address": "Niš, Ulica 3", "lat": 43.3, "lon": 21.9},
]

@router.get("/leads")
async def get_leads():
    return LEADS
