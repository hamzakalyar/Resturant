"""
Order database model.
"""

from sqlalchemy import Column, Integer, String, Float, Text, JSON, DateTime
from sqlalchemy.sql import func
from app.database import Base


class Order(Base):
    """Order model for online food orders."""
    
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    order_items = Column(JSON, nullable=False)  # [{"item_id": 1, "name": "Pasta", "quantity": 2, "price": 12.99}, ...]
    total_amount = Column(Float, nullable=False)
    order_type = Column(String(20), nullable=False)  # delivery, pickup
    delivery_address = Column(Text)  # Required for delivery orders
    special_instructions = Column(Text)
    status = Column(String(20), default="received")  # received, preparing, ready, delivered, cancelled
    created_at = Column(DateTime, server_default=func.now(), index=True)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    def __repr__(self):
        return f"<Order(id={self.id}, customer='{self.customer_name}', total=${self.total_amount})>"
