"""
Pydantic schemas for reservations.
"""

from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime


class ReservationBase(BaseModel):
    """Base schema for reservations."""
    guest_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    reservation_date: datetime
    party_size: int = Field(..., ge=1, le=20)
    special_requests: Optional[str] = None


class ReservationCreate(ReservationBase):
    """Schema for creating a reservation."""
    pass


class ReservationUpdate(BaseModel):
    """Schema for updating a reservation."""
    guest_name: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    phone: Optional[str] = Field(None, min_length=10, max_length=20)
    reservation_date: Optional[datetime] = None
    party_size: Optional[int] = Field(None, ge=1, le=20)
    special_requests: Optional[str] = None
    status: Optional[str] = Field(None, pattern="^(pending|confirmed|cancelled)$")


class Reservation(ReservationBase):
    """Schema for reservation response."""
    id: int
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
