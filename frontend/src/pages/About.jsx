/**
 * About Page
 * Restaurant story, values, and team
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FaAward,
    FaHeart,
    FaStar,
    FaLeaf,
    FaUtensils,
    FaUsers,
    FaHandshake,
    FaTrophy,
    FaMedal
} from 'react-icons/fa';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import './About.css';

const About = () => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero__overlay"></div>
                <div className="container">
                    <div className="about-hero__content">
                        <h1 className="about-hero__title slide-up">About Us</h1>
                        <p className="about-hero__subtitle slide-up">
                            A culinary journey crafted with passion, dedication, and excellence
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="our-story section">
                <div className="container">
                    <div className="our-story__grid">
                        <div className="our-story__content">
                            <h2 className="section-title">Our Story</h2>
                            <p className="our-story__text">
                                For over a decade, we've been serving the finest culinary creations in the heart
                                of the city. What started as a small family dream in 2012 has blossomed into a
                                beloved dining destination that brings people together over exceptional food and
                                warm hospitality.
                            </p>
                            <p className="our-story__text">
                                Our passion for food, commitment to quality, and dedication to exceptional service
                                have made us a cornerstone of the community. Every dish tells a story of
                                craftsmanship, creativity, and care. From farm-fresh ingredients to innovative
                                cooking techniques, we create memorable dining experiences that keep our guests
                                coming back.
                            </p>
                            <p className="our-story__text">
                                Led by our award-winning chef and supported by a team of culinary artisans, we
                                believe that great food has the power to bring joy, create memories, and connect
                                people. Each plate that leaves our kitchen is a testament to our unwavering
                                commitment to excellence.
                            </p>
                        </div>
                        <div className="our-story__image">
                            <img src="/signature-dishes.png" alt="Our restaurant" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="our-values section">
                <div className="container">
                    <h2 className="section-title">Our Core Values</h2>
                    <p className="section-subtitle">The principles that guide everything we do</p>

                    <div className="values__grid">
                        <div className="value-card">
                            <div className="value-card__icon">
                                <FaLeaf />
                            </div>
                            <h3 className="value-card__title">Quality Ingredients</h3>
                            <p className="value-card__description">
                                We source only the freshest, locally-grown ingredients from trusted farmers
                                and suppliers. Our commitment to quality starts with what we put on your plate.
                            </p>
                        </div>

                        <div className="value-card">
                            <div className="value-card__icon">
                                <FaUtensils />
                            </div>
                            <h3 className="value-card__title">Culinary Excellence</h3>
                            <p className="value-card__description">
                                Our award-winning chefs bring years of experience and innovation to every dish.
                                We never stop perfecting our craft and exploring new flavors.
                            </p>
                        </div>

                        <div className="value-card">
                            <div className="value-card__icon">
                                <FaHandshake />
                            </div>
                            <h3 className="value-card__title">Exceptional Service</h3>
                            <p className="value-card__description">
                                From the moment you walk in, our team is dedicated to making your experience
                                unforgettable. Warm hospitality is at the heart of what we do.
                            </p>
                        </div>

                        <div className="value-card">
                            <div className="value-card__icon">
                                <FaHeart />
                            </div>
                            <h3 className="value-card__title">Sustainability</h3>
                            <p className="value-card__description">
                                We're committed to sustainable practices, from reducing waste to supporting
                                local farmers. Good food should be good for the planet too.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="statistics section">
                <div className="container">
                    <div className="statistics__grid">
                        <div className="stat-card">
                            <div className="stat-card__icon">
                                <FaAward />
                            </div>
                            <div className="stat-card__value">12+</div>
                            <div className="stat-card__label">Years of Excellence</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card__icon">
                                <FaUsers />
                            </div>
                            <div className="stat-card__value">50k+</div>
                            <div className="stat-card__label">Happy Customers</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card__icon">
                                <FaStar />
                            </div>
                            <div className="stat-card__value">4.9</div>
                            <div className="stat-card__label">Average Rating</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card__icon">
                                <FaTrophy />
                            </div>
                            <div className="stat-card__value">15+</div>
                            <div className="stat-card__label">Awards Won</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chef Section */}
            <section className="chef-section section">
                <div className="container">
                    <div className="chef__grid">
                        <div className="chef__image">
                            <img src="/hero-dining.png" alt="Our Head Chef" />
                            <div className="chef__badge">
                                <FaMedal />
                                <span>Award Winning</span>
                            </div>
                        </div>
                        <div className="chef__content">
                            <h2 className="chef__title">Meet Our Head Chef</h2>
                            <p className="chef__quote">
                                "Cooking is not just about combining ingredients. It's about creating experiences,
                                telling stories, and bringing people together. Every dish we serve is crafted with
                                passion and precision to create moments of pure joy."
                            </p>
                            <p className="chef__bio">
                                With over 20 years of international culinary experience, our head chef has trained
                                in some of the world's most prestigious kitchens. Their innovative approach to
                                traditional flavors has earned numerous accolades and a loyal following of food
                                enthusiasts.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta section">
                <div className="container">
                    <div className="about-cta__content">
                        <h2 className="about-cta__title">Experience Our Story</h2>
                        <p className="about-cta__text">
                            Join us for an unforgettable dining experience. Reserve your table today
                            and become part of our story.
                        </p>
                        <div className="about-cta__actions">
                            <Link to="/reservations">
                                <Button variant="primary" size="large">
                                    Reserve a Table
                                </Button>
                            </Link>
                            <Link to="/menu">
                                <Button variant="secondary" size="large">
                                    View Our Menu
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default About;
