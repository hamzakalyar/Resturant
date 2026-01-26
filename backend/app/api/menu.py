"""
Menu API routes.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.menu import MenuItem as MenuItemModel
from app.schemas.menu import MenuItem, MenuItemCreate, MenuItemUpdate

router = APIRouter()


@router.get("/", response_model=List[MenuItem])
async def get_menu_items(
    category: Optional[str] = Query(None, description="Filter by category"),
    dietary_tag: Optional[str] = Query(None, description="Filter by dietary tag"),
    available_only: bool = Query(True, description="Show only available items"),
    db: Session = Depends(get_db)
):
    """Get all menu items with optional filters."""
    query = db.query(MenuItemModel)
    
    if available_only:
        query = query.filter(MenuItemModel.is_available == 1)
    
    if category:
        query = query.filter(MenuItemModel.category == category)
    
    if dietary_tag:
        # SQLite JSON filtering - for production PostgreSQL use better JSON queries
        items = query.all()
        items = [item for item in items if dietary_tag in (item.dietary_tags or [])]
        return items
    
    return query.all()


@router.get("/{item_id}", response_model=MenuItem)
async def get_menu_item(item_id: int, db: Session = Depends(get_db)):
    """Get a specific menu item by ID."""
    item = db.query(MenuItemModel).filter(MenuItemModel.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return item


@router.post("/", response_model=MenuItem, status_code=201)
async def create_menu_item(item: MenuItemCreate, db: Session = Depends(get_db)):
    """Create a new menu item (admin only - authentication to be added)."""
    db_item = MenuItemModel(
        name=item.name,
        description=item.description,
        price=item.price,
        category=item.category,
        image_url=item.image_url,
        dietary_tags=item.dietary_tags,
        ingredients=item.ingredients,
        is_available=1 if item.is_available else 0
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.put("/{item_id}", response_model=MenuItem)
async def update_menu_item(
    item_id: int,
    item_update: MenuItemUpdate,
    db: Session = Depends(get_db)
):
    """Update a menu item (admin only - authentication to be added)."""
    db_item = db.query(MenuItemModel).filter(MenuItemModel.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    
    update_data = item_update.model_dump(exclude_unset=True)
    if "is_available" in update_data:
        update_data["is_available"] = 1 if update_data["is_available"] else 0
    
    for field, value in update_data.items():
        setattr(db_item, field, value)
    
    db.commit()
    db.refresh(db_item)
    return db_item


@router.delete("/{item_id}", status_code=204)
async def delete_menu_item(item_id: int, db: Session = Depends(get_db)):
    """Delete a menu item (admin only - authentication to be added)."""
    db_item = db.query(MenuItemModel).filter(MenuItemModel.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    
    db.delete(db_item)
    db.commit()
    return None


@router.get("/categories/list", response_model=List[str])
async def get_categories(db: Session = Depends(get_db)):
    """Get all unique categories."""
    categories = db.query(MenuItemModel.category).distinct().all()
    return [cat[0] for cat in categories]
