"""
Pydantic schemas for menu items.
"""

from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class MenuItemBase(BaseModel):
    """Base schema for menu items."""
    name: str = Field(..., min_length=1, max_length=100)
    description: str = Field(..., min_length=1)
    price: float = Field(..., gt=0)
    category: str = Field(..., min_length=1, max_length=50)
    image_url: Optional[str] = None
    dietary_tags: List[str] = Field(default_factory=list)
    ingredients: Optional[str] = None
    is_available: bool = True


class MenuItemCreate(MenuItemBase):
    """Schema for creating a menu item."""
    pass


class MenuItemUpdate(BaseModel):
    """Schema for updating a menu item."""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, min_length=1)
    price: Optional[float] = Field(None, gt=0)
    category: Optional[str] = Field(None, min_length=1, max_length=50)
    image_url: Optional[str] = None
    dietary_tags: Optional[List[str]] = None
    ingredients: Optional[str] = None
    is_available: Optional[bool] = None


class MenuItem(MenuItemBase):
    """Schema for menu item response."""
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
