
from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.engine import make_url
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.core.config import get_settings


class Base(DeclarativeBase):
    """Base class for database models."""
    pass


def create_database_engine():
    """Create a database engine from environment settings."""
    settings = get_settings()
    database_url = settings.database_url

    # SQLite needs this option when used with FastAPI.
    connect_args = {}

    if make_url(database_url).get_backend_name() == "sqlite":
        connect_args["check_same_thread"] = False

    return create_engine(
        database_url,
        connect_args=connect_args,
        pool_pre_ping=True,
    )


engine = create_database_engine()

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    expire_on_commit=False,
)


def get_db() -> Generator[Session, None, None]:
    """Provide one database session per request."""
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()
