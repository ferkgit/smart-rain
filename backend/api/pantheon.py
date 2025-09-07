"""API endpoints for Pantheon data."""

from fastapi import APIRouter, Depends
from ..integrations.pantheon_client import PantheonClient

router = APIRouter()


def get_client() -> PantheonClient:
    return PantheonClient()


@router.get('/documents')
def documents(client: PantheonClient = Depends(get_client)) -> dict:
    return client.fetch_documents()


@router.get('/inventory')
def inventory(client: PantheonClient = Depends(get_client)) -> dict:
    return client.fetch_inventory()


@router.get('/accounts')
def accounts(client: PantheonClient = Depends(get_client)) -> dict:
    return client.fetch_accounts()
