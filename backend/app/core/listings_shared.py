from fastapi import HTTPException
from sqlalchemy import select
from ..models import Listing

def get_listing(db, listing_id, lock=False):
    query = select(Listing).where(Listing.id == listing_id)
    if lock:
        query = query.with_for_update()
    item = db.scalar(query)
    if not item:
        raise HTTPException(404, 'ไม่พบสินค้า')
    return item
