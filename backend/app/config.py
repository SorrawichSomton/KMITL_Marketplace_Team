
from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')

    env: str = 'development'
    database_url: str = 'sqlite:///./marketplace.db'
    secret_key: str = 'dev-key-unsafe-change-before-production-at-least-32'
    frontend_origins: str = 'http://localhost:3000'
    api_public_url: str = 'http://localhost:8000'

    smtp_host: str = ''
    smtp_port: int = 587
    smtp_username: str = ''
    smtp_password: str = ''
    smtp_from: str = ''
    admin_emails: str = ''

    demo_login_enabled: bool = False
    demo_login_code: str = ''

    @property
    def origins(self):
        return [
            origin.strip()
            for origin in self.frontend_origins.split(',')
            if origin.strip()
        ]

    @property
    def admins(self):
        return {
            email.strip().lower()
            for email in self.admin_emails.split(',')
            if email.strip()
        }

    @property
    def is_production(self):
        return self.env == 'production'


@lru_cache
def get_settings() -> Settings:
    return Settings()
