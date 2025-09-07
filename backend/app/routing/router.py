
from fastapi import APIRouter

router = APIRouter()

@router.get("/ping")
async def ping():
    return {"message": "pong from routing"}

# Dummy deliveries data
DELIVERIES = [
    {"id": 1, "vehicle": "Kombi 1", "stops": [
        {"address": "Beograd, Ulica 1", "eta": "09:00", "cargo": 1200, "capacity": 2000},
        {"address": "Novi Sad, Ulica 2", "eta": "11:00", "cargo": 800, "capacity": 2000},
    ], "distance_km": 120, "start_depot": "Beograd", "total_eta": "13:00"},
    {"id": 2, "vehicle": "Kombi 2", "stops": [
        {"address": "Niš, Ulica 3", "eta": "10:00", "cargo": 1000, "capacity": 1500},
    ], "distance_km": 90, "start_depot": "Niš", "total_eta": "12:00"},
]

@router.get("/deliveries")
async def get_deliveries():
    return DELIVERIES
