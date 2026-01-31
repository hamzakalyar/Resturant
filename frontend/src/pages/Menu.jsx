/**
 * Menu Page
 * Browse and order from the restaurant menu
 */

import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaTimes, FaFilter, FaLeaf, FaCarrot, FaBreadSlice } from 'react-icons/fa';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import './Menu.css';

// Mock menu data (will be replaced with API when backend is deployed)
const MOCK_MENU_ITEMS = [
    {
        id: 1,
        name: 'Grilled Salmon',
        description: 'Fresh Atlantic salmon grilled to perfection, served with asparagus and lemon butter sauce',
        price: 24.99,
        category: 'Main Course',
        image_url: '/images/grilled-salmon.png',
        dietary_tags: ['gluten-free'],
        ingredients: 'Salmon, asparagus, lemon, butter, herbs'
    },
    {
        id: 2,
        name: 'Ribeye Steak',
        description: 'Premium ribeye steak with roasted vegetables and creamy mashed potatoes',
        price: 32.99,
        category: 'Main Course',
        image_url: '/images/beef-steak.png',
        dietary_tags: ['gluten-free'],
        ingredients: 'Beef ribeye, potatoes, carrots, asparagus, rosemary'
    },
    {
        id: 3,
        name: 'Pasta Carbonara',
        description: 'Classic Italian pasta with bacon, parmesan, and creamy egg sauce',
        price: 18.99,
        category: 'Pasta',
        image_url: '/images/pasta-carbonara.png',
        dietary_tags: [],
        ingredients: 'Spaghetti, bacon, eggs, parmesan cheese, black pepper'
    },
    {
        id: 4,
        name: 'Caesar Salad',
        description: 'Crispy romaine lettuce with parmesan, croutons, and classic Caesar dressing',
        price: 12.99,
        category: 'Salads',
        image_url: '/images/caesar-salad.png',
        dietary_tags: ['vegetarian'],
        ingredients: 'Romaine lettuce, parmesan, croutons, Caesar dressing, lemon'
    },
    {
        id: 5,
        name: 'Chicken Parmesan',
        description: 'Breaded chicken breast with marinara sauce, melted mozzarella, served with spaghetti',
        price: 21.99,
        category: 'Main Course',
        image_url: '/images/chicken-parmesan.png',
        dietary_tags: [],
        ingredients: 'Chicken breast, mozzarella, marinara sauce, spaghetti, basil'
    },
    {
        id: 6,
        name: 'Vegetable Stir Fry',
        description: 'Colorful mix of fresh vegetables stir-fried in savory Asian sauce',
        price: 15.99,
        category: 'Main Course',
        image_url: '/images/vegetable-stirfry.png',
        dietary_tags: ['vegetarian', 'vegan'],
        ingredients: 'Broccoli, bell peppers, carrots, snap peas, soy sauce, garlic'
    },
    {
        id: 7,
        name: 'Chocolate Lava Cake',
        description: 'Decadent chocolate cake with molten center, served with vanilla ice cream',
        price: 9.99,
        category: 'Desserts',
        image_url: '/images/chocolate-lava-cake.png',
        dietary_tags: ['vegetarian'],
        ingredients: 'Chocolate, eggs, butter, flour, vanilla ice cream, raspberries'
    },
    {
        id: 8,
        name: 'Margherita Pizza',
        description: 'Authentic Italian pizza with fresh mozzarella, basil, and tomato sauce',
        price: 16.99,
        category: 'Pizza',
        image_url: '/images/margherita-pizza.png',
        dietary_tags: ['vegetarian'],
        ingredients: 'Pizza dough, mozzarella, tomato sauce, fresh basil, olive oil'
    }
];

const MOCK_CATEGORIES = ['All', 'Main Course', 'Pasta', 'Pizza', 'Salads', 'Desserts'];

const Menu = () => {
    // State management
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [dietaryFilters, setDietaryFilters] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [sortBy, setSortBy] = useState('name');

    // Modal
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Load menu data on component mount
    useEffect(() => {
        // Scroll to top
        window.scrollTo(0, 0);

        // Simulate loading delay (like an API call)
        setTimeout(() => {
            setMenuItems(MOCK_MENU_ITEMS);
            setCategories(MOCK_CATEGORIES);

            // Calculate max price for range slider
            const maxPrice = Math.max(...MOCK_MENU_ITEMS.map(item => item.price));
            setPriceRange([0, Math.ceil(maxPrice)]);

            setLoading(false);
        }, 500);
    }, []);

    // Filter and sort menu items
    const getFilteredItems = () => {
        let filtered = [...menuItems];

        // Category filter
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
            );
        }

        // Dietary filters
        if (dietaryFilters.length > 0) {
            filtered = filtered.filter(item =>
                dietaryFilters.every(filter =>
                    item.dietary_tags && item.dietary_tags.includes(filter)
                )
            );
        }

        // Price range filter
        filtered = filtered.filter(item =>
            item.price >= priceRange[0] && item.price <= priceRange[1]
        );

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        return filtered;
    };

    const toggleDietaryFilter = (filter) => {
        setDietaryFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };

    const openItemModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
        setQuantity(1);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedItem(null);
        setQuantity(1);
    };

    const handleAddToCart = (item) => {
        // TODO: Implement cart functionality
        alert(`Added ${quantity}x ${item.name} to cart!`);
        closeModal();
    };

    const filteredItems = getFilteredItems();

    if (loading) {
        return (
            <div className="menu-loading">
                <div className="spinner"></div>
                <p>Loading delicious dishes...</p>
            </div>
        );
    }

    return (
        <div className="menu-page">
            {/* Hero Section */}
            <section className="menu-hero">
                <div className="container">
                    <h1 className="menu-hero__title">Our Menu</h1>
                    <p className="menu-hero__subtitle">
                        Discover our exquisite selection of dishes, crafted with the finest ingredients
                    </p>
                </div>
            </section>

            <div className="container">
                {/* Category Tabs */}
                <div className="menu-categories">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Filters and Sort */}
                <div className="menu-controls">
                    {/* Search Bar */}
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search dishes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        {searchQuery && (
                            <button
                                className="search-clear"
                                onClick={() => setSearchQuery('')}
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>

                    {/* Dietary Filters */}
                    <div className="dietary-filters">
                        <span className="filter-label">
                            <FaFilter /> Dietary:
                        </span>
                        <button
                            className={`dietary-btn ${dietaryFilters.includes('vegetarian') ? 'active' : ''}`}
                            onClick={() => toggleDietaryFilter('vegetarian')}
                        >
                            <FaLeaf /> Vegetarian
                        </button>
                        <button
                            className={`dietary-btn ${dietaryFilters.includes('vegan') ? 'active' : ''}`}
                            onClick={() => toggleDietaryFilter('vegan')}
                        >
                            <FaCarrot /> Vegan
                        </button>
                        <button
                            className={`dietary-btn ${dietaryFilters.includes('gluten-free') ? 'active' : ''}`}
                            onClick={() => toggleDietaryFilter('gluten-free')}
                        >
                            <FaBreadSlice /> Gluten-Free
                        </button>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="sort-control">
                        <label htmlFor="sort-select">Sort by:</label>
                        <select
                            id="sort-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="name">Name (A-Z)</option>
                            <option value="price-low">Price (Low to High)</option>
                            <option value="price-high">Price (High to Low)</option>
                        </select>
                    </div>
                </div>

                {/* Results Count */}
                <div className="menu-results">
                    <p>{filteredItems.length} {filteredItems.length === 1 ? 'dish' : 'dishes'} found</p>
                </div>

                {/* Menu Grid */}
                <div className="menu-grid">
                    {filteredItems.length === 0 ? (
                        <div className="no-results">
                            <p>No dishes match your criteria</p>
                            <Button onClick={() => {
                                setSearchQuery('');
                                setDietaryFilters([]);
                                setSelectedCategory('All');
                            }}>
                                Clear Filters
                            </Button>
                        </div>
                    ) : (
                        filteredItems.map(item => (
                            <div
                                key={item.id}
                                className="menu-card"
                                onClick={() => openItemModal(item)}
                            >
                                <div className="menu-card__image">
                                    <img
                                        src={item.image_url}
                                        alt={item.name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/signature-dishes.png';
                                        }}
                                    />
                                    {item.dietary_tags && item.dietary_tags.length > 0 && (
                                        <div className="menu-card__badges">
                                            {item.dietary_tags.includes('vegan') && (
                                                <span className="badge badge-vegan">🌱 Vegan</span>
                                            )}
                                            {item.dietary_tags.includes('vegetarian') && (
                                                <span className="badge badge-vegetarian">🥬 Vegetarian</span>
                                            )}
                                            {item.dietary_tags.includes('gluten-free') && (
                                                <span className="badge badge-gf">GF</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="menu-card__content">
                                    <h3 className="menu-card__title">{item.name}</h3>
                                    <p className="menu-card__description">
                                        {item.description.length > 100
                                            ? `${item.description.substring(0, 100)}...`
                                            : item.description}
                                    </p>
                                    <div className="menu-card__footer">
                                        <span className="menu-card__price">${item.price.toFixed(2)}</span>
                                        <Button
                                            variant="primary"
                                            size="small"
                                            icon={<FaShoppingCart />}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddToCart(item);
                                            }}
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Item Details Modal */}
            {showModal && selectedItem && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            <FaTimes />
                        </button>
                        <div className="modal-body">
                            <div className="modal-image">
                                <img
                                    src={selectedItem.image_url}
                                    alt={selectedItem.name}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/signature-dishes.png';
                                    }}
                                />
                            </div>
                            <div className="modal-details">
                                <h2 className="modal-title">{selectedItem.name}</h2>
                                <p className="modal-price">${selectedItem.price.toFixed(2)}</p>
                                <p className="modal-description">{selectedItem.description}</p>

                                {selectedItem.ingredients && (
                                    <div className="modal-ingredients">
                                        <h4>Ingredients:</h4>
                                        <p>{selectedItem.ingredients}</p>
                                    </div>
                                )}

                                {selectedItem.dietary_tags && selectedItem.dietary_tags.length > 0 && (
                                    <div className="modal-dietary">
                                        <h4>Dietary Information:</h4>
                                        <div className="modal-badges">
                                            {selectedItem.dietary_tags.map(tag => (
                                                <span key={tag} className="badge">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="modal-quantity">
                                    <label>Quantity:</label>
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="quantity-btn"
                                        >
                                            -
                                        </button>
                                        <span className="quantity-value">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="quantity-btn"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <Button
                                    variant="primary"
                                    size="large"
                                    icon={<FaShoppingCart />}
                                    onClick={() => handleAddToCart(selectedItem)}
                                >
                                    Add to Cart - ${(selectedItem.price * quantity).toFixed(2)}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Menu;
