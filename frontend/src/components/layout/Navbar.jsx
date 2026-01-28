/**
 * Navbar Component
 * Main navigation for the restaurant website
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUtensils, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setShowUserMenu(false);
    };

    const handleLogout = () => {
        logout();
        closeMenu();
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

                        {/* Auth Links - Mobile */}
                        <li className="navbar__item navbar__item--mobile">
                            {isAuthenticated ? (
                                <>
                                    <span className="navbar__user-mobile">
                                        Welcome, {user?.full_name}
                                    </span>
                                    <button onClick={handleLogout} className="navbar__link navbar__logout-mobile">
                                        <FaSignOutAlt /> Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="navbar__link" onClick={closeMenu}>
                                        <FaSignInAlt /> Login
                                    </Link>
                                    <Link to="/register" className="navbar__link" onClick={closeMenu}>
                                        <FaUserPlus /> Register
                                    </Link>
                                </>
                            )}
                        </li>
                    </ul>

                    {/* Auth Section - Desktop */}
                    <div className="navbar__auth">
                        {isAuthenticated ? (
                            <div className="navbar__user-menu">
                                <button
                                    className="navbar__user-button"
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                >
                                    <FaUser />
                                    <span>{user?.full_name}</span>
                                </button>
                                {showUserMenu && (
                                    <div className="navbar__dropdown">
                                        <Link to="/profile" className="navbar__dropdown-item" onClick={closeMenu}>
                                            My Profile
                                        </Link>
                                        <Link to="/orders" className="navbar__dropdown-item" onClick={closeMenu}>
                                            My Orders
                                        </Link>
                                        <Link to="/reservations/my" className="navbar__dropdown-item" onClick={closeMenu}>
                                            My Reservations
                                        </Link>
                                        <button onClick={handleLogout} className="navbar__dropdown-item">
                                            <FaSignOutAlt /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="navbar__auth-buttons">
                                <Link to="/login" className="navbar__auth-link">
                                    Login
                                </Link>
                                <Link to="/register" className="navbar__btn-register">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

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
