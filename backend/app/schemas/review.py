"""
Pydantic schemas for reviews.
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ReviewBase(BaseModel):
    """Base schema for reviews."""
    customer_name: str = Field(..., min_length=1, max_length=100)
    rating: int = Field(..., ge=1, le=5)
    comment: str = Field(..., min_length=10)


class ReviewCreate(ReviewBase):
    """Schema for creating a review."""
    pass


class Review(ReviewBase):
    """Schema for review response."""
    id: int
    sentiment: Optional[str] = None
    is_approved: int
    created_at: datetime
    
    class Config:
        from_attributes = True
