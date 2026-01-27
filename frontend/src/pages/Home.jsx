/**
 * Home Page
 * Main landing page for the restaurant
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaClock, FaStar, FaMapMarkerAlt, FaQuoteLeft, FaHeart, FaAward } from 'react-icons/fa';
import Button from '../components/common/Button';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero__grid">
                        <div className="hero__content">
                            <h1 className="hero__title slide-up">
                                Experience Fine Dining
                                <br />
                                <span className="hero__title--accent">At Its Best</span>
                            </h1>
                            <p className="hero__subtitle slide-up">
                                Indulge in exquisite flavors crafted with passion and precision.
                                Join us for an unforgettable culinary journey.
                            </p>
                            <div className="hero__actions slide-up">
                                <Link to="/menu">
                                    <Button variant="primary" size="large" icon={<FaUtensils />}>
                                        View Menu
                                    </Button>
                                </Link>
                                <Link to="/reservations">
                                    <Button variant="secondary" size="large">
                                        Reserve a Table
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="hero__image">
                            <img src="/hero-dining.png" alt="Fine dining experience" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features section">
                <div className="container">
                    <h2 className="section-title">Why Choose Us</h2>
                    <div className="features__grid">
                        <div className="feature-card">
                            <div className="feature-card__icon">
                                <FaUtensils />
                            </div>
                            <h3 className="feature-card__title">Fresh Ingredients</h3>
                            <p className="feature-card__description">
                                We use only the freshest, locally-sourced ingredients to create
                                our delicious dishes.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-card__icon">
                                <FaStar />
                            </div>
                            <h3 className="feature-card__title">Expert Chefs</h3>
                            <p className="feature-card__description">
                                Our award-winning chefs bring years of culinary expertise to
                                every plate.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-card__icon">
                                <FaClock />
                            </div>
                            <h3 className="feature-card__title">Fast Service</h3>
                            <p className="feature-card__description">
                                Enjoy quick and efficient service without compromising on
                                quality.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-card__icon">
                                <FaMapMarkerAlt />
                            </div>
                            <h3 className="feature-card__title">Great Location</h3>
                            <p className="feature-card__description">
                                Conveniently located in the heart of the city with ample
                                parking.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Dishes Section */}
            <section className="popular-dishes section">
                <div className="container">
                    <h2 className="section-title">Our Signature Dishes</h2>
                    <p className="section-subtitle">Crafted with love, served with excellence</p>
                    <div className="dishes__grid">
                        <div className="dish-card">
                            <div className="dish-card__image">
                                <img src="/signature-dishes.png" alt="Signature dishes" />
                                <div className="dish-card__badge">Chef's Special</div>
                            </div>
                            <div className="dish-card__content">
                                <h3 className="dish-card__title">Grilled Prime Ribeye</h3>
                                <p className="dish-card__description">
                                    12oz premium ribeye, expertly grilled to perfection with seasonal vegetables and our signature sauce.
                                </p>
                                <div className="dish-card__footer">
                                    <span className="dish-card__price">$45.99</span>
                                    <Link to="/menu">
                                        <Button variant="primary" size="small">Order Now</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="dish-card">
                            <div className="dish-card__image">
                                <img src="/signature-dishes.png" alt="Truffle pasta" />
                                <div className="dish-card__badge">Popular</div>
                            </div>
                            <div className="dish-card__content">
                                <h3 className="dish-card__title">Truffle Mushroom Pasta</h3>
                                <p className="dish-card__description">
                                    Handmade fettuccine with wild mushrooms, truffle oil, parmesan, and fresh basil.
                                </p>
                                <div className="dish-card__footer">
                                    <span className="dish-card__price">$32.99</span>
                                    <Link to="/menu">
                                        <Button variant="primary" size="small">Order Now</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="dish-card">
                            <div className="dish-card__image">
                                <img src="/signature-dishes.png" alt="Chocolate tart" />
                                <div className="dish-card__badge">Best Seller</div>
                            </div>
                            <div className="dish-card__content">
                                <h3 className="dish-card__title">Chocolate Ganache Tart</h3>
                                <p className="dish-card__description">
                                    Decadent dark chocolate tart with fresh berries, gold leaf, and vanilla ice cream.
                                </p>
                                <div className="dish-card__footer">
                                    <span className="dish-card__price">$14.99</span>
                                    <Link to="/menu">
                                        <Button variant="primary" size="small">Order Now</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials section">
                <div className="container">
                    <h2 className="section-title">What Our Customers Say</h2>
                    <p className="section-subtitle">Real experiences from real food lovers</p>
                    <div className="testimonials__grid">
                        <div className="testimonial-card">
                            <FaQuoteLeft className="testimonial-card__quote" />
                            <div className="testimonial-card__rating">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                            </div>
                            <p className="testimonial-card__text">
                                "Absolutely outstanding! The ribeye was cooked to perfection and the ambiance was incredible.
                                This is now our go-to spot for special occasions."
                            </p>
                            <div className="testimonial-card__author">
                                <strong>Sarah Johnson</strong>
                                <span>Food Blogger</span>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <FaQuoteLeft className="testimonial-card__quote" />
                            <div className="testimonial-card__rating">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                            </div>
                            <p className="testimonial-card__text">
                                "The best pasta I've ever had! The truffle mushroom fettuccine was divine.
                                Outstanding service and beautiful presentation."
                            </p>
                            <div className="testimonial-card__author">
                                <strong>Michael Chen</strong>
                                <span>Regular Customer</span>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <FaQuoteLeft className="testimonial-card__quote" />
                            <div className="testimonial-card__rating">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                            </div>
                            <p className="testimonial-card__text">
                                "From appetizers to dessert, everything was exceptional. The chocolate tart is a must-try!
                                Highly recommend for date nights."
                            </p>
                            <div className="testimonial-card__author">
                                <strong>Emily Rodriguez</strong>
                                <span>Verified Diner</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Snippet Section */}
            <section className="about-snippet section">
                <div className="container">
                    <div className="about-snippet__grid">
                        <div className="about-snippet__content">
                            <h2 className="about-snippet__title">Our Story</h2>
                            <p className="about-snippet__text">
                                For over a decade, we've been serving the finest culinary creations in the heart of the city.
                                Our passion for food, commitment to quality, and dedication to exceptional service have made us
                                a beloved dining destination.
                            </p>
                            <p className="about-snippet__text">
                                Every dish tells a story of craftsmanship, creativity, and care. From farm-fresh ingredients
                                to innovative cooking techniques, we create memorable dining experiences that keep our guests
                                coming back.
                            </p>
                            <Link to="/about">
                                <Button variant="secondary" size="medium">Learn More About Us</Button>
                            </Link>
                        </div>
                        <div className="about-snippet__stats">
                            <div className="stat-item">
                                <div className="stat-item__icon"><FaAward /></div>
                                <div className="stat-item__value">12+</div>
                                <div className="stat-item__label">Years of Excellence</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-item__icon"><FaHeart /></div>
                                <div className="stat-item__value">50k+</div>
                                <div className="stat-item__label">Happy Customers</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-item__icon"><FaStar /></div>
                                <div className="stat-item__value">4.9</div>
                                <div className="stat-item__label">Average Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <div className="cta__content">
                        <h2 className="cta__title">Ready to Experience Excellence?</h2>
                        <p className="cta__text">
                            Book your table now and discover why we're the city's favorite
                            dining destination.
                        </p>
                        <Link to="/reservations">
                            <Button variant="primary" size="large">
                                Make a Reservation
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
