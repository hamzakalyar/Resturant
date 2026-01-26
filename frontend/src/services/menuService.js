/**
 * Menu Service
 * API calls for menu-related operations
 */

import apiClient from './api';

const menuService = {
    /**
     * Get all menu items with optional filters
     */
    getMenuItems: async (filters = {}) => {
        try {
            const params = {};
            if (filters.category) params.category = filters.category;
            if (filters.dietary_tag) params.dietary_tag = filters.dietary_tag;
            if (filters.available_only !== undefined) params.available_only = filters.available_only;

            const response = await apiClient.get('/api/menu', { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get single menu item by ID
     */
    getMenuItem: async (id) => {
        try {
            const response = await apiClient.get(`/api/menu/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get all menu categories
     */
    getCategories: async () => {
        try {
            const response = await apiClient.get('/api/menu/categories/list');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Create new menu item (admin)
     */
    createMenuItem: async (itemData) => {
        try {
            const response = await apiClient.post('/api/menu', itemData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Update menu item (admin)
     */
    updateMenuItem: async (id, itemData) => {
        try {
            const response = await apiClient.put(`/api/menu/${id}`, itemData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default menuService;
