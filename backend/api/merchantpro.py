"""FastAPI routes exposing manual MerchantPro sync operations."""
from typing import Any, Dict

from fastapi import APIRouter, Depends

from ..integrations.merchantpro_client import MerchantProClient

router = APIRouter(prefix="/api/merchantpro", tags=["merchantpro"])


# Dependency to instantiate the client. This keeps the endpoints clean and
# centralizes configuration loading from environment variables.
def get_client() -> MerchantProClient:
    return MerchantProClient()


# ---------------------------------------------------------------------------
# Pull endpoints
# ---------------------------------------------------------------------------
@router.post("/pull/prices")
def pull_prices(client: MerchantProClient = Depends(get_client)) -> Dict[str, Any]:
    return client.pull_prices()


@router.post("/pull/stock")
def pull_stock(client: MerchantProClient = Depends(get_client)) -> Dict[str, Any]:
    return client.pull_stock()


@router.post("/pull/orders")
def pull_orders(client: MerchantProClient = Depends(get_client)) -> Dict[str, Any]:
    return client.pull_orders()


# ---------------------------------------------------------------------------
# Push endpoints
# ---------------------------------------------------------------------------
@router.post("/push/prices")
def push_prices(payload: Dict[str, Any], client: MerchantProClient = Depends(get_client)) -> Dict[str, Any]:
    return client.push_prices(payload)


@router.post("/push/stock")
def push_stock(payload: Dict[str, Any], client: MerchantProClient = Depends(get_client)) -> Dict[str, Any]:
    return client.push_stock(payload)


@router.post("/push/orders")
def push_orders(payload: Dict[str, Any], client: MerchantProClient = Depends(get_client)) -> Dict[str, Any]:
    return client.push_orders(payload)
