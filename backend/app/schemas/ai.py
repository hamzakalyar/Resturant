"""
Pydantic schemas for AI features.
"""

from pydantic import BaseModel, Field
from typing import List, Optional


class MenuRecommendationRequest(BaseModel):
    """Schema for menu recommendation request."""
    preferences: List[str] = Field(..., min_length=1)  # ["spicy", "vegetarian", etc.]
    budget: Optional[float] = Field(None, gt=0)
    dietary_restrictions: List[str] = Field(default_factory=list)  # ["vegan", "gluten-free"]


class ChatRequest(BaseModel):
    """Schema for AI chatbot request."""
    message: str = Field(..., min_length=1)
    conversation_history: List[dict] = Field(default_factory=list)


class ChatResponse(BaseModel):
    """Schema for AI chatbot response."""
    response: str
    suggested_actions: List[str] = Field(default_factory=list)


class SearchRequest(BaseModel):
    """Schema for natural language search."""
    query: str = Field(..., min_length=1)
