"""
Pydantic schemas for shopping cart.
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class CartItemBase(BaseModel):
    """Base schema for cart items."""
    menu_item_id: int
    quantity: int = Field(default=1, ge=1)


class CartItemCreate(CartItemBase):
    """Schema for adding item to cart."""
    pass


class CartItemUpdate(BaseModel):
    """Schema for updating cart item quantity."""
    quantity: int = Field(..., ge=1)


class CartItem(CartItemBase):
    """Schema for cart item response."""
    id: int
    user_id: int
    created_at: datetime
    
    # We'll include menu item details in a separate field
    class Config:
        from_attributes = True


class CartItemWithDetails(CartItem):
    """Cart item with menu item details."""
    menu_item_name: str
    menu_item_price: float
    menu_item_image: Optional[str] = None
    subtotal: float


class CartResponse(BaseModel):
    """Response for getting user's cart."""
    items: list[CartItemWithDetails]
    total_items: int
    subtotal: float
    tax: float
    total: float
