/**
 * Home Page
 * Main landing page for the restaurant
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaClock, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import Button from '../components/common/Button';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
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
