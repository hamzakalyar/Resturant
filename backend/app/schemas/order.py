"""
Pydantic schemas for orders.
"""

from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime


class OrderItem(BaseModel):
    """Schema for individual order items."""
    item_id: int
    name: str
    quantity: int = Field(..., ge=1)
    price: float = Field(..., gt=0)


class OrderBase(BaseModel):
    """Base schema for orders."""
    customer_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    order_items: List[OrderItem]
    total_amount: float = Field(..., gt=0)
    order_type: str = Field(..., pattern="^(delivery|pickup)$")
    delivery_address: Optional[str] = None
    special_instructions: Optional[str] = None


class OrderCreate(OrderBase):
    """Schema for creating an order."""
    pass


class OrderUpdate(BaseModel):
    """Schema for updating an order."""
    status: Optional[str] = Field(None, pattern="^(received|preparing|ready|delivered|cancelled)$")


class Order(OrderBase):
    """Schema for order response."""
    id: int
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
