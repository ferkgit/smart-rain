"""FastAPI application entrypoint."""

from fastapi import FastAPI
from .api.pantheon import router as pantheon_router

app = FastAPI()
app.include_router(pantheon_router, prefix='/api/pantheon', tags=['pantheon'])


@app.get('/api/health')
def health() -> dict:
    return {'status': 'ok'}
