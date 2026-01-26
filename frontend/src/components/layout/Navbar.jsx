/**
 * Navbar Component
 * Main navigation for the restaurant website
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUtensils } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar__content">
                    {/* Logo */}
                    <Link to="/" className="navbar__logo" onClick={closeMenu}>
                        <FaUtensils className="navbar__logo-icon" />
                        <span className="navbar__logo-text">Delicious</span>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className={`navbar__menu ${isOpen ? 'navbar__menu--open' : ''}`}>
                        <li className="navbar__item">
                            <Link to="/" className="navbar__link" onClick={closeMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="navbar__item">
                            <Link to="/menu" className="navbar__link" onClick={closeMenu}>
                                Menu
                            </Link>
                        </li>
                        <li className="navbar__item">
                            <Link to="/reservations" className="navbar__link" onClick={closeMenu}>
                                Reservations
                            </Link>
                        </li>
                        <li className="navbar__item">
                            <Link to="/about" className="navbar__link" onClick={closeMenu}>
                                About
                            </Link>
                        </li>
                        <li className="navbar__item">
                            <Link to="/contact" className="navbar__link" onClick={closeMenu}>
                                Contact
                            </Link>
                        </li>
                    </ul>

                    {/* Mobile Toggle */}
                    <button
                        className="navbar__toggle"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
