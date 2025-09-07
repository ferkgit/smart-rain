"""Client for Pantheon API interactions."""

from __future__ import annotations

import requests
from ..config import PANTHEON_API_KEY, PANTHEON_BASE_URL


class PantheonClient:
    """Simple client to fetch data from Pantheon API."""

    def __init__(self, base_url: str = PANTHEON_BASE_URL, api_key: str = PANTHEON_API_KEY) -> None:
        self.base_url = base_url.rstrip('/')
        self.headers = {"Authorization": f"Bearer {api_key}"}

    def _get(self, endpoint: str) -> dict:
        url = f"{self.base_url}/{endpoint}"
        response = requests.get(url, headers=self.headers, timeout=10)
        response.raise_for_status()
        return response.json()

    def fetch_documents(self) -> dict:
        """Fetch documents from Pantheon."""
        return self._get('documents')

    def fetch_inventory(self) -> dict:
        """Fetch inventory from Pantheon."""
        return self._get('inventory')

    def fetch_accounts(self) -> dict:
        """Fetch accounts from Pantheon."""
        return self._get('accounts')
