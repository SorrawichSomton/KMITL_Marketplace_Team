"""Owner maintained: combine independent Catalog and Trading routers."""
from fastapi import APIRouter
from ..features.catalog.router import router as catalog_router
from ..features.trading.router import router as trading_router

router = APIRouter()
# Register /me/favorites before /{listing_id} to avoid route shadowing.
router.include_router(trading_router)
router.include_router(catalog_router)
