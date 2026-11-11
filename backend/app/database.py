
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from .config import get_settings


url = get_settings().database_url

# Railway PostgreSQL URL uses the default psycopg2 dialect.
# Explicitly select psycopg version 3, which is installed
# through psycopg[binary] in requirements.txt.
if url.startswith("postgresql://"):
    url = url.replace("postgresql://", "postgresql+psycopg://", 1)
elif url.startswith("postgres://"):
    url = url.replace("postgres://", "postgresql+psycopg://", 1)

engine = create_engine(
    url,
    connect_args={"check_same_thread": False} if url.startswith("sqlite") else {},
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    pass


def get_db():
    with SessionLocal() as db:
        yield db