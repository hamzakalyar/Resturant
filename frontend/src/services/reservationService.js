/**
 * Reservation Service
 * API calls for reservation operations
 */

import apiClient from './api';

const reservationService = {
    /**
     * Create a new reservation
     */
    createReservation: async (reservationData) => {
        try {
            const response = await apiClient.post('/api/reservations', reservationData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get reservation by ID
     */
    getReservation: async (id) => {
        try {
            const response = await apiClient.get(`/api/reservations/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Cancel reservation
     */
    cancelReservation: async (id) => {
        try {
            const response = await apiClient.delete(`/api/reservations/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default reservationService;
