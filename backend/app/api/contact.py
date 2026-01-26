"""
Contact API routes.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.contact import ContactMessage as ContactMessageModel
from app.schemas.contact import ContactMessage, ContactMessageCreate

router = APIRouter()


@router.get("/", response_model=List[ContactMessage])
async def get_contact_messages(db: Session = Depends(get_db)):
    """Get all contact messages (admin only)."""
    return db.query(ContactMessageModel).order_by(
        ContactMessageModel.created_at.desc()
    ).all()


@router.get("/{message_id}", response_model=ContactMessage)
async def get_contact_message(message_id: int, db: Session = Depends(get_db)):
    """Get a specific contact message by ID."""
    message = db.query(ContactMessageModel).filter(
        ContactMessageModel.id == message_id
    ).first()
    if not message:
        raise HTTPException(status_code=404, detail="Contact message not found")
    return message


@router.post("/", response_model=ContactMessage, status_code=201)
async def create_contact_message(
    message: ContactMessageCreate,
    db: Session = Depends(get_db)
):
    """Submit a contact form message."""
    db_message = ContactMessageModel(
        name=message.name,
        email=message.email,
        phone=message.phone,
        subject=message.subject,
        message=message.message,
        is_read=0
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    
    # TODO: Send notification email to restaurant staff
    
    return db_message


@router.put("/{message_id}/mark-read", response_model=ContactMessage)
async def mark_message_read(message_id: int, db: Session = Depends(get_db)):
    """Mark a contact message as read (admin only)."""
    db_message = db.query(ContactMessageModel).filter(
        ContactMessageModel.id == message_id
    ).first()
    if not db_message:
        raise HTTPException(status_code=404, detail="Contact message not found")
    
    db_message.is_read = 1
    db.commit()
    db.refresh(db_message)
    return db_message
