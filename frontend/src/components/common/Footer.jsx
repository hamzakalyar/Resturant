/**
 * Footer Component
 * Reusable footer for all pages
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaUtensils,
    FaClock
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    {/* About Section */}
                    <div className="footer__section">
                        <h3 className="footer__title">
                            <FaUtensils className="footer__icon" />
                            About Us
                        </h3>
                        <p className="footer__text">
                            Experience fine dining at its best. We serve exquisite dishes crafted with passion
                            and the finest ingredients, creating unforgettable culinary experiences.
                        </p>
                        <div className="footer__social">
                            <a href="https://facebook.com" className="social-link" aria-label="Facebook">
                                <FaFacebookF />
                            </a>
                            <a href="https://instagram.com" className="social-link" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="https://twitter.com" className="social-link" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                            <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer__section">
                        <h3 className="footer__title">Quick Links</h3>
                        <ul className="footer__links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/menu">Menu</Link></li>
                            <li><Link to="/reservations">Reservations</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div className="footer__section">
                        <h3 className="footer__title">
                            <FaClock className="footer__icon" />
                            Opening Hours
                        </h3>
                        <ul className="footer__hours">
                            <li>
                                <span className="hours__day">Monday - Friday</span>
                                <span className="hours__time">11:00 AM - 10:00 PM</span>
                            </li>
                            <li>
                                <span className="hours__day">Saturday - Sunday</span>
                                <span className="hours__time">10:00 AM - 11:00 PM</span>
                            </li>
                            <li>
                                <span className="hours__day">Holidays</span>
                                <span className="hours__time">10:00 AM - 09:00 PM</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer__section">
                        <h3 className="footer__title">Contact Us</h3>
                        <ul className="footer__contact">
                            <li>
                                <FaMapMarkerAlt className="contact__icon" />
                                <span>123 Culinary Street, Food City, FC 12345</span>
                            </li>
                            <li>
                                <FaPhone className="contact__icon" />
                                <a href="tel:+1234567890">+1 (234) 567-890</a>
                            </li>
                            <li>
                                <FaEnvelope className="contact__icon" />
                                <a href="mailto:info@restaurant.com">info@restaurant.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © {currentYear} Restaurant. All rights reserved.
                    </p>
                    <div className="footer__legal">
                        <Link to="/privacy">Privacy Policy</Link>
                        <span className="separator">|</span>
                        <Link to="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
