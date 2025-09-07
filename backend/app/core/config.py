
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Smart Rain Backend"
    app_host: str = "0.0.0.0"
    app_port: int = 8000

    class Config:
        env_file = ".env"


settings = Settings()
