/**
 * Contact Page
 * Get in touch with the restaurant
 */

import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaCheckCircle, FaExclamationCircle, FaPaperPlane } from 'react-icons/fa';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import contactService from '../services/contactService';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
    const [submitMessage, setSubmitMessage] = useState('');

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Validate form fields
    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation (optional)
        if (formData.phone.trim()) {
            const phoneRegex = /^[\d\s\-\+\(\)]{10,20}$/;
            if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
                newErrors.phone = 'Please enter a valid phone number';
            }
        }

        // Subject validation
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        } else if (formData.subject.trim().length > 200) {
            newErrors.subject = 'Subject must be less than 200 characters';
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
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
            const submitData = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim() || null,
                subject: formData.subject.trim(),
                message: formData.message.trim()
            };

            await contactService.submitContactForm(submitData);

            setSubmitStatus('success');
            setSubmitMessage('Thank you for contacting us! We\'ll get back to you as soon as possible.');

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });

            // Scroll to top to show success message
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            setSubmitStatus('error');
            setSubmitMessage(error.response?.data?.detail || 'An error occurred while sending your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact">
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="container">
                    <div className="contact-hero__content">
                        <h1 className="contact-hero__title slide-up">Get In Touch</h1>
                        <p className="contact-hero__subtitle slide-up">
                            Have a question or want to make a reservation? We'd love to hear from you!
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="contact-content section">
                <div className="container">
                    <div className="contact__grid">
                        {/* Contact Form */}
                        <div className="contact-form-container">
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

                            <form onSubmit={handleSubmit} className="contact-form">
                                <h2 className="contact-form__title">Send Us a Message</h2>

                                {/* Name */}
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                                        placeholder="Enter your full name"
                                        disabled={isSubmitting}
                                    />
                                    {errors.name && (
                                        <span className="form-error">{errors.name}</span>
                                    )}
                                </div>

                                {/* Email & Phone Row */}
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">
                                            Email Address *
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
                                            Phone Number
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

                                {/* Subject */}
                                <div className="form-group">
                                    <label htmlFor="subject" className="form-label">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`form-input ${errors.subject ? 'form-input--error' : ''}`}
                                        placeholder="What is this regarding?"
                                        disabled={isSubmitting}
                                    />
                                    {errors.subject && (
                                        <span className="form-error">{errors.subject}</span>
                                    )}
                                </div>

                                {/* Message */}
                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`form-input form-textarea ${errors.message ? 'form-input--error' : ''}`}
                                        placeholder="Tell us more about your inquiry..."
                                        rows="6"
                                        disabled={isSubmitting}
                                    />
                                    {errors.message && (
                                        <span className="form-error">{errors.message}</span>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="form-actions">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="large"
                                        icon={<FaPaperPlane />}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Contact Info Sidebar */}
                        <div className="contact-info">
                            <div className="info-card">
                                <h3 className="info-card__title">Contact Information</h3>

                                <div className="info-item">
                                    <FaMapMarkerAlt className="info-item__icon" />
                                    <div className="info-item__content">
                                        <h4>Visit Us</h4>
                                        <p>Flat GF 1 Block C9 PHA Apartments<br />G11/3 Islamabad</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <FaPhone className="info-item__icon" />
                                    <div className="info-item__content">
                                        <h4>Call Us</h4>
                                        <p>
                                            <a href="tel:+923020000973">0302-0000973</a>
                                        </p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <FaEnvelope className="info-item__icon" />
                                    <div className="info-item__content">
                                        <h4>Email Us</h4>
                                        <p>
                                            <a href="mailto:hamza@bytecraftsoft.com">hamza@bytecraftsoft.com</a>
                                        </p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <FaClock className="info-item__icon" />
                                    <div className="info-item__content">
                                        <h4>Business Hours</h4>
                                        <p>
                                            <strong>Lunch:</strong> 11:00 AM - 3:00 PM<br />
                                            <strong>Dinner:</strong> 5:00 PM - 10:00 PM<br />
                                            <strong>Closed:</strong> Mondays
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="info-card info-card--response">
                                <h3 className="info-card__title">Quick Response</h3>
                                <p>
                                    We aim to respond to all inquiries within 24 hours during business days.
                                    For immediate assistance, please call us during business hours.
                                </p>
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

export default Contact;
