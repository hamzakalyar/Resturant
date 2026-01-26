"""
AI API routes for intelligent features.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.menu import MenuItem as MenuItemModel
from app.schemas.ai import MenuRecommendationRequest, ChatRequest, ChatResponse, SearchRequest
from app.schemas.menu import MenuItem
from app.services.ai_service import ai_service
from typing import List

router = APIRouter()


@router.post("/recommendations", response_model=List[MenuItem])
async def get_recommendations(
    request: MenuRecommendationRequest,
    db: Session = Depends(get_db)
):
    """Get AI-powered menu recommendations based on preferences."""
    # Get all available menu items
    menu_items = db.query(MenuItemModel).filter(
        MenuItemModel.is_available == 1
    ).all()
    
    if not menu_items:
        raise HTTPException(status_code=404, detail="No menu items available")
    
    # Convert to dict format for AI service
    items_dict = [
        {
            "id": item.id,
            "name": item.name,
            "description": item.description,
            "price": item.price,
            "category": item.category,
            "dietary_tags": item.dietary_tags or [],
            "image_url": item.image_url
        }
        for item in menu_items
    ]
    
    # Get AI recommendations
    recommendations = await ai_service.get_menu_recommendations(
        menu_items=items_dict,
        preferences=request.preferences,
        budget=request.budget,
        dietary_restrictions=request.dietary_restrictions
    )
    
    # Convert back to MenuItem schema
    if not recommendations:
        return []
    
    recommended_ids = [rec['id'] for rec in recommendations]
    return db.query(MenuItemModel).filter(MenuItemModel.id.in_(recommended_ids)).all()


@router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(request: ChatRequest):
    """Chat with AI assistant for customer support."""
    response = await ai_service.chat(
        message=request.message,
        conversation_history=request.conversation_history
    )
    
    return ChatResponse(
        response=response["response"],
        suggested_actions=response.get("suggested_actions", [])
    )


@router.post("/search", response_model=List[MenuItem])
async def natural_language_search(
    request: SearchRequest,
    db: Session = Depends(get_db)
):
    """Natural language search for menu items."""
    # Get all available menu items
    menu_items = db.query(MenuItemModel).filter(
        MenuItemModel.is_available == 1
    ).all()
    
    if not menu_items:
        return []
    
    # Simple keyword search (can be enhanced with AI)
    query_lower = request.query.lower()
    results = []
    
    for item in menu_items:
        search_text = f"{item.name} {item.description} {item.category}".lower()
        if query_lower in search_text:
            results.append(item)
    
    return results[:20]  # Return top 20 results


@router.get("/health")
async def ai_health_check():
    """Check if AI services are available."""
    return {
        "ai_enabled": ai_service.has_openai,
        "services": {
            "recommendations": "available",
            "chatbot": "available",
            "sentiment_analysis": "available",
            "search": "available"
        }
    }
