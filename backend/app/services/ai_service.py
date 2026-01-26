"""
AI service for restaurant features.
Uses OpenAI API for intelligent recommendations and chatbot.
"""

from typing import List, Dict, Optional
from app.core.config import settings


class AIService:
    """Service for AI-powered features."""
    
    def __init__(self):
        self.openai_api_key = settings.OPENAI_API_KEY
        self.has_openai = bool(self.openai_api_key)
    
    async def get_menu_recommendations(
        self,
        menu_items: List[Dict],
        preferences: List[str],
        budget: Optional[float] = None,
        dietary_restrictions: List[str] = []
    ) -> List[Dict]:
        """
        Get AI-powered menu recommendations based on user preferences.
        
        Args:
            menu_items: List of available menu items
            preferences: User preferences (e.g., ["spicy", "healthy"])
            budget: Maximum budget per item
            dietary_restrictions: Dietary restrictions (e.g., ["vegan", "gluten-free"])
        
        Returns:
            List of recommended menu items
        """
        if not self.has_openai:
            # Fallback: Simple filtering without AI
            return self._filter_menu_simple(menu_items, preferences, budget, dietary_restrictions)
        
        try:
            # TODO: Implement OpenAI-based recommendations
            # For now, use simple filtering
            return self._filter_menu_simple(menu_items, preferences, budget, dietary_restrictions)
        except Exception as e:
            print(f"AI recommendation error: {e}")
            return self._filter_menu_simple(menu_items, preferences, budget, dietary_restrictions)
    
    def _filter_menu_simple(
        self,
        menu_items: List[Dict],
        preferences: List[str],
        budget: Optional[float],
        dietary_restrictions: List[str]
    ) -> List[Dict]:
        """Simple filtering fallback when AI is not available."""
        filtered = []
        
        for item in menu_items:
            # Check budget
            if budget and item.get('price', 0) > budget:
                continue
            
            # Check dietary restrictions
            item_tags = item.get('dietary_tags', [])
            if dietary_restrictions:
                if not all(restriction in item_tags for restriction in dietary_restrictions):
                    continue
            
            # Check preferences in name or description
            item_text = f"{item.get('name', '')} {item.get('description', '')}".lower()
            matches = any(pref.lower() in item_text for pref in preferences)
            
            if matches or not preferences:
                filtered.append(item)
        
        return filtered[:10]  # Return top 10 matches
    
    async def chat(self, message: str, conversation_history: List[Dict]) -> Dict[str, any]:
        """
        AI chatbot for customer support.
        
        Args:
            message: User's message
            conversation_history: Previous conversation messages
        
        Returns:
            Dict with response and suggested actions
        """
        if not self.has_openai:
            return self._chatbot_fallback(message)
        
        try:
            # TODO: Implement OpenAI chat completion
            # For now, use fallback
            return self._chatbot_fallback(message)
        except Exception as e:
            print(f"AI chat error: {e}")
            return self._chatbot_fallback(message)
    
    def _chatbot_fallback(self, message: str) -> Dict[str, any]:
        """Fallback chatbot responses."""
        message_lower = message.lower()
        
        # Simple keyword-based responses
        if any(word in message_lower for word in ['hours', 'open', 'close', 'time']):
            return {
                "response": "We're open Monday-Friday: 11AM-10PM, Saturday-Sunday: 10AM-11PM. How can I assist you further?",
                "suggested_actions": ["Make a reservation", "View menu"]
            }
        elif any(word in message_lower for word in ['menu', 'food', 'dish']):
            return {
                "response": "We have a diverse menu including appetizers, main courses, desserts, and beverages. Would you like to see our menu or get personalized recommendations?",
                "suggested_actions": ["View menu", "Get recommendations"]
            }
        elif any(word in message_lower for word in ['reservation', 'book', 'table']):
            return {
                "response": "I'd be happy to help you make a reservation! You can book a table through our reservation form. What date and time works for you?",
                "suggested_actions": ["Make a reservation"]
            }
        elif any(word in message_lower for word in ['delivery', 'order', 'takeout']):
            return {
                "response": "We offer both delivery and pickup options! You can place an order online and choose your preferred method. Would you like to see our menu?",
                "suggested_actions": ["View menu", "Place an order"]
            }
        else:
            return {
                "response": "Thank you for your message! I'm here to help with information about our menu, hours, reservations, and ordering. What would you like to know?",
                "suggested_actions": ["View menu", "Make a reservation", "Contact us"]
            }
    
    async def analyze_sentiment(self, text: str) -> str:
        """
        Analyze sentiment of review text.
        
        Args:
            text: Review text to analyze
        
        Returns:
            Sentiment: "positive", "neutral", or "negative"
        """
        if not self.has_openai:
            return self._sentiment_fallback(text)
        
        try:
            # TODO: Implement OpenAI sentiment analysis
            return self._sentiment_fallback(text)
        except Exception as e:
            print(f"Sentiment analysis error: {e}")
            return self._sentiment_fallback(text)
    
    def _sentiment_fallback(self, text: str) -> str:
        """Simple keyword-based sentiment analysis."""
        text_lower = text.lower()
        
        positive_words = ['excellent', 'amazing', 'great', 'wonderful', 'fantastic', 'love', 'best', 'delicious']
        negative_words = ['terrible', 'awful', 'bad', 'worst', 'horrible', 'disappointed', 'poor']
        
        positive_count = sum(1 for word in positive_words if word in text_lower)
        negative_count = sum(1 for word in negative_words if word in text_lower)
        
        if positive_count > negative_count:
            return "positive"
        elif negative_count > positive_count:
            return "negative"
        else:
            return "neutral"


# Global AI service instance
ai_service = AIService()
