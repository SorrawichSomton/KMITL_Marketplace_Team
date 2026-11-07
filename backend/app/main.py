from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings

settings = get_settings()
app = FastAPI(title="KMITL Marketplace Team5 Starter", version="0.0.1")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["Content-Type"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "team-scaffold"}


# OWNER INTEGRATION POINT:
# Owner registers feature routers here after contract review.
# Friends must not modify main.py in their own PRs.
