"""
Reservation API routes.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.database import get_db
from app.models.reservation import Reservation as ReservationModel
from app.schemas.reservation import Reservation, ReservationCreate, ReservationUpdate

router = APIRouter()


@router.get("/", response_model=List[Reservation])
async def get_reservations(
    status: Optional[str] = Query(None, description="Filter by status"),
    date: Optional[str] = Query(None, description="Filter by date (YYYY-MM-DD)"),
    db: Session = Depends(get_db)
):
    """Get all reservations with optional filters (admin)."""
    query = db.query(ReservationModel)
    
    if status:
        query = query.filter(ReservationModel.status == status)
    
    if date:
        try:
            date_obj = datetime.strptime(date, "%Y-%m-%d").date()
            query = query.filter(
                ReservationModel.reservation_date >= date_obj,
                ReservationModel.reservation_date < datetime.combine(
                    date_obj,
                    datetime.max.time()
                )
            )
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    
    return query.order_by(ReservationModel.reservation_date.desc()).all()


@router.get("/{reservation_id}", response_model=Reservation)
async def get_reservation(reservation_id: int, db: Session = Depends(get_db)):
    """Get a specific reservation by ID."""
    reservation = db.query(ReservationModel).filter(
        ReservationModel.id == reservation_id
    ).first()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return reservation


@router.post("/", response_model=Reservation, status_code=201)
async def create_reservation(
    reservation: ReservationCreate,
    db: Session = Depends(get_db)
):
    """Create a new reservation."""
    # Check if reservation date is in the future
    if reservation.reservation_date < datetime.now():
        raise HTTPException(
            status_code=400,
            detail="Reservation date must be in the future"
        )
    
    # TODO: Add logic to check for availability/conflicts
    
    db_reservation = ReservationModel(
        guest_name=reservation.guest_name,
        email=reservation.email,
        phone=reservation.phone,
        reservation_date=reservation.reservation_date,
        party_size=reservation.party_size,
        special_requests=reservation.special_requests,
        status="pending"
    )
    db.add(db_reservation)
    db.commit()
    db.refresh(db_reservation)
    
    # TODO: Send confirmation email
    
    return db_reservation


@router.put("/{reservation_id}", response_model=Reservation)
async def update_reservation(
    reservation_id: int,
    reservation_update: ReservationUpdate,
    db: Session = Depends(get_db)
):
    """Update a reservation."""
    db_reservation = db.query(ReservationModel).filter(
        ReservationModel.id == reservation_id
    ).first()
    if not db_reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    
    update_data = reservation_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_reservation, field, value)
    
    db.commit()
    db.refresh(db_reservation)
    return db_reservation


@router.delete("/{reservation_id}", status_code=204)
async def cancel_reservation(reservation_id: int, db: Session = Depends(get_db)):
    """Cancel a reservation."""
    db_reservation = db.query(ReservationModel).filter(
        ReservationModel.id == reservation_id
    ).first()
    if not db_reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    
    db_reservation.status = "cancelled"
    db.commit()
    return None
