/**
 * NotFound (404) Page
 * Custom 404 error page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUtensils, FaExclamationTriangle } from 'react-icons/fa';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found">
            <div className="not-found__content">
                <div className="container">
                    <div className="not-found__inner">
                        <div className="not-found__icon">
                            <FaExclamationTriangle />
                        </div>
                        <h1 className="not-found__title">404</h1>
                        <h2 className="not-found__subtitle">Page Not Found</h2>
                        <p className="not-found__text">
                            Oops! The page you're looking for seems to have wandered off the menu.
                            Let's get you back to something delicious!
                        </p>
                        <div className="not-found__actions">
                            <Link to="/">
                                <Button variant="primary" size="large" icon={<FaHome />}>
                                    Back to Home
                                </Button>
                            </Link>
                            <Link to="/menu">
                                <Button variant="secondary" size="large" icon={<FaUtensils />}>
                                    View Menu
                                </Button>
                            </Link>
                        </div>
                        <div className="not-found__suggestions">
                            <h3>Popular Pages</h3>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/menu">Menu</Link></li>
                                <li><Link to="/reservations">Reservations</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NotFound;
