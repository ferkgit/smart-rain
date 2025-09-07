import os
import time
from typing import Any, Dict, Optional

import requests


class MerchantProClient:
    """Client for interacting with the MerchantPro API.

    Provides helper methods to pull (read) and push (write) data for
    prices, stock levels, and orders. All requests include basic retry
    logic so transient network issues are retried before failing.
    """

    def __init__(
        self,
        base_url: Optional[str] = None,
        api_key: Optional[str] = None,
        *,
        retries: int = 3,
        timeout: int = 10,
    ) -> None:
        self.base_url = (base_url or os.getenv("MERCHANTPRO_BASE_URL", "")).rstrip("/")
        self.api_key = api_key or os.getenv("MERCHANTPRO_API_KEY", "")
        self.retries = retries
        self.timeout = timeout

    # -----------------------------------------------------
    # internal helpers
    # -----------------------------------------------------
    def _request(self, method: str, endpoint: str, *, json: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Perform an HTTP request with simple exponential backoff."""
        url = f"{self.base_url}/{endpoint.lstrip('/') }"
        headers = {"Authorization": f"Bearer {self.api_key}"}

        last_error: Optional[Exception] = None
        for attempt in range(1, self.retries + 1):
            try:
                response = requests.request(
                    method,
                    url,
                    headers=headers,
                    json=json,
                    timeout=self.timeout,
                )
                response.raise_for_status()
                if response.content:
                    return response.json()
                return {}
            except Exception as exc:  # pragma: no cover - network error paths
                last_error = exc
                if attempt < self.retries:
                    time.sleep(2 ** (attempt - 1))
        # Retries exhausted
        assert last_error is not None
        raise last_error

    # -----------------------------------------------------
    # pull (read) operations
    # -----------------------------------------------------
    def pull_prices(self) -> Dict[str, Any]:
        return self._request("GET", "/prices")

    def pull_stock(self) -> Dict[str, Any]:
        return self._request("GET", "/stock")

    def pull_orders(self) -> Dict[str, Any]:
        return self._request("GET", "/orders")

    # -----------------------------------------------------
    # push (write) operations
    # -----------------------------------------------------
    def push_prices(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return self._request("POST", "/prices", json=payload)

    def push_stock(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return self._request("POST", "/stock", json=payload)

    def push_orders(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return self._request("POST", "/orders", json=payload)
