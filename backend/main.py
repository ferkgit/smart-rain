"""Minimal FastAPI application wiring up API routes."""
from fastapi import FastAPI

from .api.merchantpro import router as merchantpro_router

app = FastAPI(title="Smart Rain API")
app.include_router(merchantpro_router)


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}
