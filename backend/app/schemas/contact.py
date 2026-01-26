"""
Pydantic schemas for contact messages.
"""

from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime


class ContactMessageBase(BaseModel):
    """Base schema for contact messages."""
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, min_length=10, max_length=20)
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=10)


class ContactMessageCreate(ContactMessageBase):
    """Schema for creating a contact message."""
    pass


class ContactMessage(ContactMessageBase):
    """Schema for contact message response."""
    id: int
    is_read: int
    created_at: datetime
    
    class Config:
        from_attributes = True
