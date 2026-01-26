"""
Menu item database model.
"""

from sqlalchemy import Column, Integer, String, Float, Text, JSON
from sqlalchemy.sql import func
from sqlalchemy.types import DateTime
from app.database import Base


class MenuItem(Base):
    """Menu item model representing dishes available in the restaurant."""
    
    __tablename__ = "menu_items"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=False)
    price = Column(Float, nullable=False)
    category = Column(String(50), nullable=False, index=True)  # Appetizers, Main, Desserts, Beverages
    image_url = Column(String(500))
    dietary_tags = Column(JSON, default=list)  # ["vegan", "gluten-free", etc.]
    ingredients = Column(Text)
    is_available = Column(Integer, default=1)  # 1 = available, 0 = not available
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    def __repr__(self):
        return f"<MenuItem(id={self.id}, name='{self.name}', category='{self.category}')>"
