"""
Database seed script for restaurant website.
Populates the database with sample menu items.
"""

from app.database import SessionLocal
from app.models.menu import MenuItem
from datetime import datetime


def seed_menu_items():
    """Seed the database with sample menu items."""
    db = SessionLocal()
    
    try:
        # Check if data already exists
        existing_items = db.query(MenuItem).count()
        if existing_items > 0:
            print(f"Database already has {existing_items} menu items. Skipping seed.")
            return
        
        menu_items = [
            # Appetizers
            {
                "name": "Crispy Calamari",
                "description": "Lightly breaded calamari rings served with marinara sauce and lemon aioli",
                "price": 12.99,
                "category": "Appetizers",
                "image_url": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500",
                "dietary_tags": ["seafood"],
                "ingredients": "Calamari, flour, marinara sauce, lemon, garlic aioli",
                "is_available": 1
            },
            {
                "name": "Bruschetta",
                "description": "Toasted bread topped with fresh tomatoes, basil, garlic, and olive oil",
                "price": 9.99,
                "category": "Appetizers",
                "image_url": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500",
                "dietary_tags": ["vegetarian", "vegan"],
                "ingredients": "Bread, tomatoes, basil, garlic, olive oil",
                "is_available": 1
            },
            {
                "name": "Buffalo Wings",
                "description": "Spicy chicken wings tossed in buffalo sauce, served with blue cheese dressing",
                "price": 11.99,
                "category": "Appetizers",
                "image_url": "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=500",
                "dietary_tags": ["spicy"],
                "ingredients": "Chicken wings, buffalo sauce, blue cheese dressing, celery",
                "is_available": 1
            },
            {
                "name": "Spinach Artichoke Dip",
                "description": "Creamy blend of spinach, artichokes, and cheese, served with tortilla chips",
                "price": 10.99,
                "category": "Appetizers",
                "image_url": "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=500",
                "dietary_tags": ["vegetarian"],
                "ingredients": "Spinach, artichokes, cream cheese, mozzarella, tortilla chips",
                "is_available": 1
            },
            
            # Main Courses
            {
                "name": "Grilled Salmon",
                "description": "Fresh Atlantic salmon grilled to perfection with lemon butter sauce, served with roasted vegetables",
                "price": 24.99,
                "category": "Main Courses",
                "image_url": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500",
                "dietary_tags": ["seafood", "gluten-free"],
                "ingredients": "Salmon, lemon, butter, asparagus, carrots, herbs",
                "is_available": 1
            },
            {
                "name": "Ribeye Steak",
                "description": "12oz prime ribeye steak grilled to your liking, served with mashed potatoes and seasonal vegetables",
                "price": 32.99,
                "category": "Main Courses",
                "image_url": "https://images.unsplash.com/photo-1558030006-450675393462?w=500",
                "dietary_tags": ["gluten-free"],
                "ingredients": "Ribeye steak, potatoes, butter, vegetables, herbs",
                "is_available": 1
            },
            {
                "name": "Chicken Parmesan",
                "description": "Breaded chicken breast topped with marinara sauce and melted mozzarella, served over spaghetti",
                "price": 19.99,
                "category": "Main Courses",
                "image_url": "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=500",
                "dietary_tags": [],
                "ingredients": "Chicken breast, marinara sauce, mozzarella, spaghetti, parmesan",
                "is_available": 1
            },
            {
                "name": "Vegetable Stir Fry",
                "description": "Fresh seasonal vegetables wok-tossed in savory sauce, served over jasmine rice",
                "price": 16.99,
                "category": "Main Courses",
                "image_url": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500",
                "dietary_tags": ["vegetarian", "vegan"],
                "ingredients": "Bell peppers, broccoli, carrots, snap peas, soy sauce, rice",
                "is_available": 1
            },
            {
                "name": "Shrimp Scampi",
                "description": "Succulent shrimp sautéed in garlic butter and white wine, served over linguine",
                "price": 22.99,
                "category": "Main Courses",
                "image_url": "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=500",
                "dietary_tags": ["seafood"],
                "ingredients": "Shrimp, garlic, butter, white wine, linguine, parsley",
                "is_available": 1
            },
            {
                "name": "Mushroom Risotto",
                "description": "Creamy arborio rice with wild mushrooms, parmesan, and truffle oil",
                "price": 18.99,
                "category": "Main Courses",
                "image_url": "https://images.unsplash.com/photo-1476124369491-c1d3e48c5f39?w=500",
                "dietary_tags": ["vegetarian"],
                "ingredients": "Arborio rice, mushrooms, parmesan, truffle oil, white wine",
                "is_available": 1
            },
            {
                "name": "BBQ Ribs",
                "description": "Fall-off-the-bone baby back ribs glazed with BBQ sauce, served with coleslaw and fries",
                "price": 26.99,
                "category": "Main Courses",
                "image_url": "https://images.unsplash.com/photo-1544025162-d76694265947?w=500",
                "dietary_tags": [],
                "ingredients": "Baby back ribs, BBQ sauce, coleslaw, french fries",
                "is_available": 1
            },
            {
                "name": "Margherita Pizza",
                "description": "Classic pizza with fresh mozzarella, basil, and tomato sauce on thin crust",
                "price": 15.99,
                "category": "Main Courses",
                "image_url": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
                "dietary_tags": ["vegetarian"],
                "ingredients": "Pizza dough, mozzarella, tomatoes, basil, olive oil",
                "is_available": 1
            },
            
            # Desserts
            {
                "name": "Chocolate Lava Cake",
                "description": "Warm chocolate cake with molten center, served with vanilla ice cream",
                "price": 8.99,
                "category": "Desserts",
                "image_url": "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500",
                "dietary_tags": ["vegetarian"],
                "ingredients": "Dark chocolate, butter, eggs, sugar, flour, vanilla ice cream",
                "is_available": 1
            },
            {
                "name": "Tiramisu",
                "description": "Classic Italian dessert with layers of espresso-soaked ladyfingers and mascarpone cream",
                "price": 7.99,
                "category": "Desserts",
                "image_url": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500",
                "dietary_tags": ["vegetarian"],
                "ingredients": "Ladyfingers, espresso, mascarpone, eggs, cocoa powder",
                "is_available": 1
            },
            {
                "name": "New York Cheesecake",
                "description": "Rich and creamy cheesecake with graham cracker crust and berry compote",
                "price": 7.99,
                "category": "Desserts",
                "image_url": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500",
                "dietary_tags": ["vegetarian"],
                "ingredients": "Cream cheese, graham crackers, sugar, vanilla, mixed berries",
                "is_available": 1
            },
            {
                "name": "Crème Brûlée",
                "description": "Silky vanilla custard with caramelized sugar crust",
                "price": 8.99,
                "category": "Desserts",
                "image_url": "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=500",
                "dietary_tags": ["vegetarian", "gluten-free"],
                "ingredients": "Heavy cream, egg yolks, vanilla, sugar",
                "is_available": 1
            },
            
            # Beverages
            {
                "name": "Fresh Lemonade",
                "description": "Freshly squeezed lemonade with mint",
                "price": 3.99,
                "category": "Beverages",
                "image_url": "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=500",
                "dietary_tags": ["vegan", "gluten-free"],
                "ingredients": "Lemons, sugar, mint, water",
                "is_available": 1
            },
            {
                "name": "Iced Coffee",
                "description": "Cold brew coffee served over ice",
                "price": 4.99,
                "category": "Beverages",
                "image_url": "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500",
                "dietary_tags": ["vegan", "gluten-free"],
                "ingredients": "Coffee beans, ice, milk (optional)",
                "is_available": 1
            },
            {
                "name": "Mojito Mocktail",
                "description": "Refreshing mint and lime drink with club soda",
                "price": 5.99,
                "category": "Beverages",
                "image_url": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500",
                "dietary_tags": ["vegan", "gluten-free"],
                "ingredients": "Mint, lime, sugar, club soda, ice",
                "is_available": 1
            },
            {
                "name": "Sparkling Water",
                "description": "Premium sparkling mineral water",
                "price": 2.99,
                "category": "Beverages",
                "image_url": "https://images.unsplash.com/photo-1559839914-17aae19d0a0b?w=500",
                "dietary_tags": ["vegan", "gluten-free"],
                "ingredients": "Sparkling water",
                "is_available": 1
            },
        ]
        
        # Add items to database
        for item_data in menu_items:
            menu_item = MenuItem(**item_data)
            db.add(menu_item)
        
        db.commit()
        print(f"✅ Successfully seeded {len(menu_items)} menu items!")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    print("Starting database seed...")
    seed_menu_items()
    print("Seed complete!")
