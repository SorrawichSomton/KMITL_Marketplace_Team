"""Compatibility imports for the central application settings.

The canonical settings implementation lives in app.config.
"""

from ..config import Settings, get_settings

__all__ = ["Settings", "get_settings"]