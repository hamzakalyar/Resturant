/**
 * Contact Service
 * API calls for contact form operations
 */

import apiClient from './api';

const contactService = {
    /**
     * Submit a contact form message
     */
    submitContactForm: async (formData) => {
        try {
            const response = await apiClient.post('/api/contact', formData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get all contact messages (admin only)
     */
    getContactMessages: async () => {
        try {
            const response = await apiClient.get('/api/contact');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default contactService;
