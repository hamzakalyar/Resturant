"""
Shopping cart database model.
"""

from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class CartItem(Base):
    """Cart item model for shopping cart functionality."""
    
    __tablename__ = "cart_items"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    menu_item_id = Column(Integer, ForeignKey("menu_items.id"), nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    # Relationships
    # user = relationship("User", back_populates="cart_items")
    # menu_item = relationship("MenuItem")
    
    def __repr__(self):
        return f"<CartItem(id={self.id}, user_id={self.user_id}, menu_item_id={self.menu_item_id}, qty={self.quantity})>"
