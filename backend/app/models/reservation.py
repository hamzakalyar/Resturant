"""
Reservation database model.
"""

from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base


class Reservation(Base):
    """Reservation model for table bookings."""
    
    __tablename__ = "reservations"
    
    id = Column(Integer, primary_key=True, index=True)
    guest_name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, index=True)
    phone = Column(String(20), nullable=False)
    reservation_date = Column(DateTime, nullable=False, index=True)
    party_size = Column(Integer, nullable=False)
    special_requests = Column(Text)
    status = Column(String(20), default="pending")  # pending, confirmed, cancelled
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    def __repr__(self):
        return f"<Reservation(id={self.id}, guest='{self.guest_name}', date='{self.reservation_date}')>"
