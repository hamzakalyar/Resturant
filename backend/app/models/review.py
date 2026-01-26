"""
Review database model.
"""

from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.database import Base


class Review(Base):
    """Review model for customer feedback."""
    
    __tablename__ = "reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(100), nullable=False)
    rating = Column(Integer, nullable=False)  # 1-5 stars
    comment = Column(Text, nullable=False)
    sentiment = Column(String(20))  # positive, neutral, negative (from AI analysis)
    is_approved = Column(Integer, default=0)  # 0 = pending, 1 = approved, 2 = rejected
    created_at = Column(DateTime, server_default=func.now(), index=True)
    
    def __repr__(self):
        return f"<Review(id={self.id}, customer='{self.customer_name}', rating={self.rating})>"
