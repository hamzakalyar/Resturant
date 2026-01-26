"""
Order API routes.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.order import Order as OrderModel
from app.schemas.order import Order, OrderCreate, OrderUpdate

router = APIRouter()


@router.get("/", response_model=List[Order])
async def get_orders(
    status: Optional[str] = Query(None, description="Filter by status"),
    db: Session = Depends(get_db)
):
    """Get all orders with optional filters (admin)."""
    query = db.query(OrderModel)
    
    if status:
        query = query.filter(OrderModel.status == status)
    
    return query.order_by(OrderModel.created_at.desc()).all()


@router.get("/{order_id}", response_model=Order)
async def get_order(order_id: int, db: Session = Depends(get_db)):
    """Get a specific order by ID."""
    order = db.query(OrderModel).filter(OrderModel.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.post("/", response_model=Order, status_code=201)
async def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    """Create a new order."""
    # Validate delivery address for delivery orders
    if order.order_type == "delivery" and not order.delivery_address:
        raise HTTPException(
            status_code=400,
            detail="Delivery address is required for delivery orders"
        )
    
    # Convert order items to JSON-serializable format
    order_items_json = [item.model_dump() for item in order.order_items]
    
    db_order = OrderModel(
        customer_name=order.customer_name,
        email=order.email,
        phone=order.phone,
        order_items=order_items_json,
        total_amount=order.total_amount,
        order_type=order.order_type,
        delivery_address=order.delivery_address,
        special_instructions=order.special_instructions,
        status="received"
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    # TODO: Send order confirmation email
    
    return db_order


@router.put("/{order_id}", response_model=Order)
async def update_order_status(
    order_id: int,
    order_update: OrderUpdate,
    db: Session = Depends(get_db)
):
    """Update order status (admin only)."""
    db_order = db.query(OrderModel).filter(OrderModel.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order_update.status:
        db_order.status = order_update.status
    
    db.commit()
    db.refresh(db_order)
    
    # TODO: Send status update email to customer
    
    return db_order
