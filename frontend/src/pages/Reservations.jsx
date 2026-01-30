/**
 * Reservations Page
 * Book a table at the restaurant
 */

import React, { useState, useEffect } from 'react';
import { FaCalendar, FaClock, FaUser, FaUsers, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import reservationService from '../services/reservationService';
import './Reservations.css';

const Reservations = () => {
    const [formData, setFormData] = useState({
        guest_name: '',
        email: '',
        phone: '',
        reservation_date: '',
        reservation_time: '',
        party_size: 2,
        special_requests: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
    const [submitMessage, setSubmitMessage] = useState('');

    // Restaurant hours for time selection
    const timeSlots = [
        '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
        '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
        '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
        '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
        '9:00 PM', '9:30 PM', '10:00 PM'
    ];

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Validate form fields
    const validateForm = () => {
        const newErrors = {};

        // Guest name validation
        if (!formData.guest_name.trim()) {
            newErrors.guest_name = 'Name is required';
        } else if (formData.guest_name.trim().length < 2) {
            newErrors.guest_name = 'Name must be at least 2 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        const phoneRegex = /^[\d\s\-\+\(\)]{10,20}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number (10-20 digits)';
        }

        // Date validation
        if (!formData.reservation_date) {
            newErrors.reservation_date = 'Date is required';
        } else {
            const selectedDate = new Date(formData.reservation_date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                newErrors.reservation_date = 'Please select a future date';
            }
        }

        // Time validation
        if (!formData.reservation_time) {
            newErrors.reservation_time = 'Time is required';
        }

        // Party size validation
        if (!formData.party_size || formData.party_size < 1 || formData.party_size > 20) {
            newErrors.party_size = 'Party size must be between 1 and 20';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Combine date and time into ISO format
            const [datePart] = formData.reservation_date.split('T');
            const timePart = convertTo24Hour(formData.reservation_time);
            const reservation_date = `${datePart}T${timePart}:00`;

            const reservationData = {
                guest_name: formData.guest_name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                reservation_date: reservation_date,
                party_size: parseInt(formData.party_size),
                special_requests: formData.special_requests.trim() || null
            };

            await reservationService.createReservation(reservationData);

            setSubmitStatus('success');
            setSubmitMessage('Your reservation has been successfully submitted! We will send you a confirmation email shortly.');

            // Reset form
            setFormData({
                guest_name: '',
                email: '',
                phone: '',
                reservation_date: '',
                reservation_time: '',
                party_size: 2,
                special_requests: ''
            });

            // Scroll to top to show success message
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            setSubmitStatus('error');
            setSubmitMessage(error.detail || 'An error occurred while submitting your reservation. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Convert 12-hour time to 24-hour format
    const convertTo24Hour = (time12h) => {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }

        return `${hours.toString().padStart(2, '0')}:${minutes}`;
    };

    // Get minimum date (today)
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    return (
        <div className="reservations">
            {/* Hero Section */}
            <section className="reservations-hero">
                <div className="container">
                    <div className="reservations-hero__content">
                        <h1 className="reservations-hero__title slide-up">
                            Reserve Your Table
                        </h1>
                        <p className="reservations-hero__subtitle slide-up">
                            Book your dining experience at our restaurant. We look forward to serving you!
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="reservations-content section">
                <div className="container">
                    <div className="reservations__grid">
                        {/* Reservation Form */}
                        <div className="reservations-form-container">
                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <div className="alert alert--success">
                                    <FaCheckCircle className="alert__icon" />
                                    <p>{submitMessage}</p>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="alert alert--error">
                                    <FaExclamationCircle className="alert__icon" />
                                    <p>{submitMessage}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="reservations-form">
                                <h2 className="reservations-form__title">Reservation Details</h2>

                                {/* Guest Name */}
                                <div className="form-group">
                                    <label htmlFor="guest_name" className="form-label">
                                        <FaUser className="form-label__icon" />
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="guest_name"
                                        name="guest_name"
                                        value={formData.guest_name}
                                        onChange={handleChange}
                                        className={`form-input ${errors.guest_name ? 'form-input--error' : ''}`}
                                        placeholder="Enter your full name"
                                        disabled={isSubmitting}
                                    />
                                    {errors.guest_name && (
                                        <span className="form-error">{errors.guest_name}</span>
                                    )}
                                </div>

                                {/* Email & Phone Row */}
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">
                                            <FaEnvelope className="form-label__icon" />
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                                            placeholder="your.email@example.com"
                                            disabled={isSubmitting}
                                        />
                                        {errors.email && (
                                            <span className="form-error">{errors.email}</span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone" className="form-label">
                                            <FaPhone className="form-label__icon" />
                                            Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                                            placeholder="+1 (555) 123-4567"
                                            disabled={isSubmitting}
                                        />
                                        {errors.phone && (
                                            <span className="form-error">{errors.phone}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Date & Time Row */}
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="reservation_date" className="form-label">
                                            <FaCalendar className="form-label__icon" />
                                            Date *
                                        </label>
                                        <input
                                            type="date"
                                            id="reservation_date"
                                            name="reservation_date"
                                            value={formData.reservation_date}
                                            onChange={handleChange}
                                            min={getMinDate()}
                                            className={`form-input ${errors.reservation_date ? 'form-input--error' : ''}`}
                                            disabled={isSubmitting}
                                        />
                                        {errors.reservation_date && (
                                            <span className="form-error">{errors.reservation_date}</span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="reservation_time" className="form-label">
                                            <FaClock className="form-label__icon" />
                                            Time *
                                        </label>
                                        <select
                                            id="reservation_time"
                                            name="reservation_time"
                                            value={formData.reservation_time}
                                            onChange={handleChange}
                                            className={`form-input ${errors.reservation_time ? 'form-input--error' : ''}`}
                                            disabled={isSubmitting}
                                        >
                                            <option value="">Select a time</option>
                                            {timeSlots.map(time => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                        </select>
                                        {errors.reservation_time && (
                                            <span className="form-error">{errors.reservation_time}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Party Size */}
                                <div className="form-group">
                                    <label htmlFor="party_size" className="form-label">
                                        <FaUsers className="form-label__icon" />
                                        Party Size *
                                    </label>
                                    <input
                                        type="number"
                                        id="party_size"
                                        name="party_size"
                                        value={formData.party_size}
                                        onChange={handleChange}
                                        min="1"
                                        max="20"
                                        className={`form-input ${errors.party_size ? 'form-input--error' : ''}`}
                                        disabled={isSubmitting}
                                    />
                                    {errors.party_size && (
                                        <span className="form-error">{errors.party_size}</span>
                                    )}
                                </div>

                                {/* Special Requests */}
                                <div className="form-group">
                                    <label htmlFor="special_requests" className="form-label">
                                        Special Requests (Optional)
                                    </label>
                                    <textarea
                                        id="special_requests"
                                        name="special_requests"
                                        value={formData.special_requests}
                                        onChange={handleChange}
                                        className="form-input form-textarea"
                                        placeholder="Any dietary restrictions, allergies, or special occasions?"
                                        rows="4"
                                        disabled={isSubmitting}
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="form-actions">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="large"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Reserve Table'}
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Info Sidebar */}
                        <div className="reservations-info">
                            <div className="info-card">
                                <h3 className="info-card__title">Restaurant Information</h3>

                                <div className="info-item">
                                    <FaMapMarkerAlt className="info-item__icon" />
                                    <div className="info-item__content">
                                        <h4>Location</h4>
                                        <p>Flat GF 1 Block C9 PHA Apartments<br />G11/3 Islamabad</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <FaClock className="info-item__icon" />
                                    <div className="info-item__content">
                                        <h4>Hours</h4>
                                        <p>
                                            <strong>Lunch:</strong> 11:00 AM - 3:00 PM<br />
                                            <strong>Dinner:</strong> 5:00 PM - 10:00 PM
                                        </p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <FaPhone className="info-item__icon" />
                                    <div className="info-item__content">
                                        <h4>Contact</h4>
                                        <p>
                                            Phone: 0302-0000973<br />
                                            Email: hamza@bytecraftsoft.com
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="info-card info-card--tips">
                                <h3 className="info-card__title">Reservation Tips</h3>
                                <ul className="tips-list">
                                    <li>Reservations are recommended, especially on weekends</li>
                                    <li>Please arrive within 15 minutes of your reservation time</li>
                                    <li>For parties larger than 10, please call us directly</li>
                                    <li>We'll send a confirmation email within 24 hours</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Reservations;
