
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version="0.2.0",
    description="KMITL Marketplace Team API",
    docs_url="/docs" if not settings.is_production else None,
    redoc_url="/redoc" if not settings.is_production else None,
)

# Allow the frontend to communicate with the API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)


@app.get("/health", tags=["System"])
def health() -> dict[str, str]:
    """Health check for local development and deployment."""
    return {
        "status": "ok",
        "service": "team-scaffold",
    }


@app.get("/", tags=["System"])
def root() -> dict[str, str]:
    """Provide a simple API welcome endpoint."""
    return {
        "message": "KMITL Marketplace API",
        "version": "0.2.0",
    }


# -------------------------------------------------------------------
# FEATURE ROUTER INTEGRATION
#
# Owner-only section.
#
# Feature developers create routers in their assigned directories:
#
# app/features/accounts/
# app/features/catalog/
# app/features/trading/
# app/features/community/
#
# Do not import routers that have not been implemented yet.
#
# After the team approves each API contract, the Owner will:
#
# 1. Import the feature's APIRouter.
# 2. Register it using app.include_router().
# 3. Test endpoint paths and permissions.
# 4. Commit the integration changes.
#
# Example (only when the file exists):
#
# from app.features.catalog.router import router as catalog_router
# app.include_router(catalog_router)
#
# Avoid catching ImportError to silently skip broken routers.
# -------------------------------------------------------------------
