"""
Review API routes.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.review import Review as ReviewModel
from app.schemas.review import Review, ReviewCreate

router = APIRouter()


@router.get("/", response_model=List[Review])
async def get_reviews(
    approved_only: bool = Query(True, description="Show only approved reviews"),
    min_rating: Optional[int] = Query(None, ge=1, le=5, description="Minimum rating filter"),
    db: Session = Depends(get_db)
):
    """Get all reviews with optional filters."""
    query = db.query(ReviewModel)
    
    if approved_only:
        query = query.filter(ReviewModel.is_approved == 1)
    
    if min_rating:
        query = query.filter(ReviewModel.rating >= min_rating)
    
    return query.order_by(ReviewModel.created_at.desc()).all()


@router.get("/{review_id}", response_model=Review)
async def get_review(review_id: int, db: Session = Depends(get_db)):
    """Get a specific review by ID."""
    review = db.query(ReviewModel).filter(ReviewModel.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return review


@router.post("/", response_model=Review, status_code=201)
async def create_review(review: ReviewCreate, db: Session = Depends(get_db)):
    """Create a new review."""
    # TODO: Add AI sentiment analysis here
    sentiment = "neutral"  # Placeholder
    
    db_review = ReviewModel(
        customer_name=review.customer_name,
        rating=review.rating,
        comment=review.comment,
        sentiment=sentiment,
        is_approved=0  # Pending approval by default
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review


@router.put("/{review_id}/approve", response_model=Review)
async def approve_review(review_id: int, db: Session = Depends(get_db)):
    """Approve a review (admin only)."""
    db_review = db.query(ReviewModel).filter(ReviewModel.id == review_id).first()
    if not db_review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    db_review.is_approved = 1
    db.commit()
    db.refresh(db_review)
    return db_review


@router.put("/{review_id}/reject", response_model=Review)
async def reject_review(review_id: int, db: Session = Depends(get_db)):
    """Reject a review (admin only)."""
    db_review = db.query(ReviewModel).filter(ReviewModel.id == review_id).first()
    if not db_review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    db_review.is_approved = 2
    db.commit()
    db.refresh(db_review)
    return db_review


@router.get("/stats/summary")
async def get_review_stats(db: Session = Depends(get_db)):
    """Get review statistics."""
    total_reviews = db.query(ReviewModel).filter(ReviewModel.is_approved == 1).count()
    
    if total_reviews == 0:
        return {
            "total_reviews": 0,
            "average_rating": 0,
            "rating_distribution": {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
        }
    
    # Calculate average rating
    reviews = db.query(ReviewModel).filter(ReviewModel.is_approved == 1).all()
    avg_rating = sum(r.rating for r in reviews) / len(reviews)
    
    # Rating distribution
    distribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
    for review in reviews:
        distribution[review.rating] += 1
    
    return {
        "total_reviews": total_reviews,
        "average_rating": round(avg_rating, 2),
        "rating_distribution": distribution
    }
