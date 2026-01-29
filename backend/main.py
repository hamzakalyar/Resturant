"""
Main FastAPI application entry point.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.database import engine, Base

# Import all models to ensure they're registered with SQLAlchemy
from app.models import menu, reservation, order, review, contact, user

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    description="A modern restaurant website with AI-powered features",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """Run on application startup."""
    print("\n" + "=" * 60)
    print("Restaurant API Starting Up")
    print("=" * 60)
    print(f"App Name: {settings.APP_NAME}")
    print(f"Debug Mode: {settings.DEBUG}")
    print(f"Database: {settings.DATABASE_URL}")
    print(f"CORS Origins: {', '.join(settings.cors_origins)}")
    print("=" * 60)
    
    # Verify database connection
    try:
        from app.models.user import User as UserModel
        from sqlalchemy import select
        db = next(get_db())
        # Try a simple query
        result = db.execute(select(UserModel).limit(1))
        user_count = db.query(UserModel).count()
        db.close()
        print(f"[OK] Database connected - {user_count} users in system")
    except Exception as e:
        print(f"[WARNING] Database connection issue: {e}")
    
    print("=" * 60 + "\n")


@app.get("/")
async def root():
    """Root endpoint - health check."""
    return {
        "message": "Welcome to Restaurant API",
        "status": "online",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


# Import and include routers
from app.api import menu as menu_router
from app.api import reservation as reservation_router
from app.api import order as order_router
from app.api import review as review_router
from app.api import contact as contact_router
from app.api import ai as ai_router

app.include_router(menu_router.router, prefix="/api/menu", tags=["Menu"])
app.include_router(reservation_router.router, prefix="/api/reservations", tags=["Reservations"])
app.include_router(order_router.router, prefix="/api/orders", tags=["Orders"])
app.include_router(review_router.router, prefix="/api/reviews", tags=["Reviews"])
app.include_router(contact_router.router, prefix="/api/contact", tags=["Contact"])
app.include_router(ai_router.router, prefix="/api/ai", tags=["AI Features"])



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )
