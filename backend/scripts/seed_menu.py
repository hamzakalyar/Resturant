"""
Menu database seeding script.
Populates the menu with delicious dishes across all categories.
"""

import sys
import os
from pathlib import Path

# Add parent directory to path to import from app
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models.menu import MenuItem

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)


def clear_existing_menu(db: Session):
    """Clear existing menu items."""
    db.query(MenuItem).delete()
    db.commit()
    print("✓ Cleared existing menu items")


def seed_menu_items(db: Session):
    """Add all menu items to database."""
    
    menu_items = [
        # APPETIZERS (6 items)
        {
            "name": "Bruschetta Classica",
            "description": "Toasted bread topped with fresh tomatoes, basil, garlic, and extra virgin olive oil. A perfect Italian starter.",
            "price": 12.99,
            "category": "Appetizers",
            "image_url": "/images/menu/appetizers_bruschetta.jpg",
            "dietary_tags": ["vegetarian"],
            "ingredients": "Tomatoes, basil, garlic, olive oil, baguette, balsamic glaze",
            "is_available": 1
        },
        {
            "name": "Caesar Salad",
            "description": "Crisp romaine lettuce with parmesan cheese, croutons, and our signature Caesar dressing.",
            "price": 10.99,
            "category": "Appetizers",
            "image_url": "/images/menu/appetizers_caesar_salad.jpg",
            "dietary_tags": ["vegetarian"],
            "ingredients": "Romaine lettuce, parmesan, croutons, Caesar dressing, lemon",
            "is_available": 1
        },
        {
            "name": "Vietnamese Spring Rolls",
            "description": "Fresh rice paper rolls filled with shrimp, vegetables, and herbs. Served with peanut dipping sauce.",
            "price": 11.99,
            "category": "Appetizers",
            "image_url": "/images/menu/appetizers_spring_rolls.jpg",
            "dietary_tags": [],
            "ingredients": "Rice paper, shrimp, lettuce, carrots, mint, peanut sauce",
            "is_available": 1
        },
        {
            "name": "Caprese Salad",
            "description": "Fresh mozzarella, ripe tomatoes, and basil drizzled with balsamic reduction and olive oil.",
            "price": 13.99,
            "category": "Appetizers",
            "image_url": "/images/menu/appetizers_caprese.jpg",
            "dietary_tags": ["vegetarian", "gluten-free"],
            "ingredients": "Fresh mozzarella, tomatoes, basil, balsamic glaze, olive oil",
            "is_available": 1
        },
        {
            "name": "Stuffed Mushrooms",
            "description": "Button mushrooms filled with garlic herb cheese, topped with breadcrumbs and baked to perfection.",
            "price": 9.99,
            "category": "Appetizers",
            "image_url": "/images/menu/appetizers_stuffed_mushrooms.jpg",
            "dietary_tags": ["vegetarian"],
            "ingredients": "Mushrooms, cream cheese, garlic, herbs, breadcrumbs, parmesan",
            "is_available": 1
        },
        {
            "name": "French Onion Soup",
            "description": "Rich beef broth with caramelized onions, topped with toasted bread and melted Gruyère cheese.",
            "price": 8.99,
            "category": "Appetizers",
            "image_url": "/images/menu/appetizers_french_onion_soup.jpg",
            "dietary_tags": [],
            "ingredients": "Onions, beef broth, Gruyère cheese, baguette, thyme, sherry",
            "is_available": 1
        },
        
        # MAIN COURSES (10 items)
        {
            "name": "Grilled Atlantic Salmon",
            "description": "Fresh salmon fillet grilled to perfection, served with roasted vegetables and lemon butter sauce.",
            "price": 28.99,
            "category": "Main Courses",
            "image_url": "/images/menu/mains_grilled_salmon.jpg",
            "dietary_tags": ["gluten-free"],
            "ingredients": "Salmon, asparagus, cherry tomatoes, lemon, butter, herbs",
            "is_available": 1
        },
        {
            "name": "Ribeye Steak",
            "description": "12oz premium ribeye steak cooked to your preference, with garlic mashed potatoes and seasonal vegetables.",
            "price": 42.99,
            "category": "Main Courses",
            "image_url": "/images/menu/mains_ribeye_steak.jpg",
            "dietary_tags": ["gluten-free"],
            "ingredients": "Ribeye beef, potatoes, butter, garlic, seasonal vegetables",
            "is_available": 1
        },
        {
            "name": "Pasta Carbonara",
            "description": "Classic Roman pasta with pancetta, eggs, parmesan cheese, and black pepper. Creamy and indulgent.",
            "price": 18.99,
            "category": "Main Courses",
            "image_url": "/images/menu/mains_carbonara.jpg",
            "dietary_tags": [],
            "ingredients": "Spaghetti, pancetta, eggs, parmesan, black pepper, garlic",
            "is_available": 1
        },
        {
            "name": "Butter Chicken",
            "description": "Tender chicken in a rich, creamy tomato-based sauce with aromatic spices. Served with basmati rice and naan.",
            "price": 21.99,
            "category": "Main Courses",
            "image_url": "/images/menu/mains_butter_chicken.jpg",
            "dietary_tags": ["gluten-free"],
            "ingredients": "Chicken, tomatoes, cream, butter, spices, basmati rice, naan",
            "is_available": 1
        },
        {
            "name": "Vegetable Stir Fry",
            "description": "Colorful medley of fresh vegetables wok-tossed in teriyaki sauce. Served over jasmine rice.",
            "price": 16.99,
            "category": "Main Courses",
            "image_url": "/images/menu/mains_vegetable_stir_fry.jpg",
            "dietary_tags": ["vegan", "vegetarian"],
            "ingredients": "Bell peppers, broccoli, carrots, snap peas, teriyaki sauce, rice",
            "is_available": 1
        },
        {
            "name": "Margherita Pizza",
            "description": "Traditional Italian pizza with San Marzano tomato sauce, fresh mozzarella, and basil on wood-fired crust.",
            "price": 17.99,
            "category": "Main Courses",
            "image_url": "/images/menu/mains_margherita_pizza.jpg",
            "dietary_tags": ["vegetarian"],
            "ingredients": "Pizza dough, tomato sauce, mozzarella, basil, olive oil",
            "is_available": 1
        },
        {
            "name": "Herb-Crusted Lamb Chops",
            "description": "Tender lamb chops with rosemary herb crust, served with mint yogurt sauce and roasted potatoes.",
            "price": 38.99,
            "category": "Main Courses",
            "image_url": "/images/menu/mains_lamb_chops.jpg",
            "dietary_tags": ["gluten-free"],
            "ingredients": "Lamb chops, rosemary, thyme, garlic, potatoes, mint yogurt",
            "is_available": 1
        },
        {
            "name": "Seafood Paella",
            "description": "Spanish rice dish with shrimp, mussels, clams, and calamari, infused with saffron and white wine.",
            "price": 32.99,
            "category": "Main Courses",
            "image_url": "/images/menu/mains_seafood_paella.jpg",
            "dietary_tags": ["gluten-free"],
            "ingredients": "Rice, shrimp, mussels, clams, calamari, saffron, peppers, peas",
            "is_available": 1
        },
        {
            "name": "BBQ Ribs",
            "description": "Slow-cooked pork ribs glazed with our signature BBQ sauce. Served with coleslaw and fries.",
            "price": 26.99,
            "category": "Main Courses",
            "image_url": "/images/menu/mains_bbq_ribs.jpg",
            "dietary_tags": [],
            "ingredients": "Pork ribs, BBQ sauce, coleslaw, french fries",
            "is_available": 1
        },
        {
            "name": "Mushroom Risotto",
            "description": "Creamy Arborio rice with wild mushrooms, parmesan, and white wine. Finished with truffle oil.",
            "price": 22.99,
            "category": "Main Courses",
            "image_url": "/images/menu/mains_mushroom_risotto.jpg",
            "dietary_tags": ["vegetarian", "gluten-free"],
            "ingredients": "Arborio rice, wild mushrooms, parmesan, white wine, truffle oil",
            "is_available": 1
        },
        
        # DESSERTS (5 items)
        {
            "name": "Tiramisu",
            "description": "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa.",
            "price": 9.99,
            "category": "Desserts",
            "image_url": "/images/menu/desserts_tiramisu.jpg",
            "dietary_tags": ["vegetarian"],
            "ingredients": "Ladyfingers, espresso, mascarpone, eggs, cocoa powder, marsala",
            "is_available": 1
        },
        {
            "name": "Chocolate Lava Cake",
            "description": "Warm chocolate cake with a molten center, served with vanilla ice cream and berry compote.",
            "price": 11.99,
            "category": "Desserts",
            "image_url": "/images/menu/desserts_lava_cake.jpg",
            "dietary_tags": ["vegetarian"],
            "ingredients": "Dark chocolate, butter, eggs, flour, sugar, vanilla ice cream, berries",
            "is_available": 1
        },
        {
            "name": "Crème Brûlée",
            "description": "Silky vanilla custard topped with caramelized sugar. A French classic.",
            "price": 10.99,
            "category": "Desserts",
            "image_url": "/images/menu/desserts_creme_brulee.jpg",
            "dietary_tags": ["vegetarian", "gluten-free"],
            "ingredients": "Cream, egg yolks, vanilla bean, sugar",
            "is_available": 1
        },
        {
            "name": "New York Cheesecake",
            "description": "Rich and creamy cheesecake on graham cracker crust, topped with fresh strawberries.",
            "price": 10.99,
            "category": "Desserts",
            "image_url": "/images/menu/desserts_cheesecake.jpg",
            "dietary_tags": ["vegetarian"],
            "ingredients": "Cream cheese, graham crackers, eggs, sour cream, strawberries",
            "is_available": 1
        },
        {
            "name": "Apple Pie à la Mode",
            "description": "Homemade apple pie with cinnamon and brown sugar, served warm with vanilla ice cream.",
            "price": 9.99,
            "category": "Desserts",
            "image_url": "/images/menu/desserts_apple_pie.jpg",
            "dietary_tags": ["vegetarian"],
            "ingredients": "Apples, cinnamon, brown sugar, pie crust, vanilla ice cream",
            "is_available": 1
        },
        
        # BEVERAGES (4 items)
        {
            "name": "Fresh Lemonade",
            "description": "House-made lemonade with fresh lemons and mint. Refreshing and perfectly balanced.",
            "price": 4.99,
            "category": "Beverages",
            "image_url": "/images/menu/beverages_lemonade.jpg",
            "dietary_tags": ["vegan", "vegetarian", "gluten-free"],
            "ingredients": "Fresh lemons, sugar, water, mint",
            "is_available": 1
        },
        {
            "name": "Espresso",
            "description": "Rich, bold espresso shot made from premium Arabica beans. The perfect pick-me-up.",
            "price": 3.99,
            "category": "Beverages",
            "image_url": "/images/menu/beverages_espresso.jpg",
            "dietary_tags": ["vegan", "vegetarian", "gluten-free"],
            "ingredients": "Espresso beans",
            "is_available": 1
        },
        {
            "name": "Tropical Smoothie",
            "description": "Blend of mango, pineapple, banana, and coconut milk. Tropical paradise in a glass.",
            "price": 7.99,
            "category": "Beverages",
            "image_url": "/images/menu/beverages_smoothie.jpg",
            "dietary_tags": ["vegan", "vegetarian", "gluten-free"],
            "ingredients": "Mango, pineapple, banana, coconut milk, ice",
            "is_available": 1
        },
        {
            "name": "Signature Cocktail",
            "description": "Our mixologist's special creation with vodka, elderflower, cucumber, and lime. Elegant and refreshing.",
            "price": 12.99,
            "category": "Beverages",
            "image_url": "/images/menu/beverages_cocktail.jpg",
            "dietary_tags": ["gluten-free"],
            "ingredients": "Vodka, elderflower liqueur, cucumber, lime, soda water",
            "is_available": 1
        },
    ]
    
    # Add all items to database
    for item_data in menu_items:
        menu_item = MenuItem(**item_data)
        db.add(menu_item)
    
    db.commit()
    print(f"✓ Added {len(menu_items)} menu items to database")
    
    # Print summary by category
    categories = {}
    for item in menu_items:
        cat = item['category']
        if cat not in categories:
            categories[cat] = 0
        categories[cat] += 1
    
    print("\n📊 Menu Summary:")
    for cat, count in categories.items():
        print(f"   • {cat}: {count} items")
    print()


def main():
    """Main seeding function."""
    print("🌱 Starting menu database seeding...\n")
    
    db = SessionLocal()
    try:
        clear_existing_menu(db)
        seed_menu_items(db)
        print("✅ Menu seeding completed successfully!")
    except Exception as e:
        print(f"❌ Error during seeding: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
