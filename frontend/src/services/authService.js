/**
 * Authentication service for API calls
 */

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

const authService = {
    /**
     * Register a new user
     */
    async register(userData) {
        const response = await axios.post(`${API_URL}/register`, userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    /**
     * Login user
     */
    async login(email, password) {
        const response = await axios.post(`${API_URL}/login/json`, {
            email,
            password
        });

        if (response.data.access_token) {
            // Save token
            localStorage.setItem('token', response.data.access_token);

            // Get user info
            const userResponse = await axios.get(`${API_URL}/me`, {
                headers: {
                    Authorization: `Bearer ${response.data.access_token}`
                }
            });

            localStorage.setItem('user', JSON.stringify(userResponse.data));
            return userResponse.data;
        }

        return response.data;
    },

    /**
     * Logout user
     */
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    /**
     * Get current user from localStorage
     */
    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        return null;
    },

    /**
     * Get access token
     */
    getToken() {
        return localStorage.getItem('token');
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return !!this.getToken();
    },

    /**
     * Get current user info from API
     */
    async getUserInfo() {
        const token = this.getToken();
        if (!token) return null;

        try {
            const response = await axios.get(`${API_URL}/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            // Token might be expired
            this.logout();
            return null;
        }
    },

    /**
     * Update user profile
     */
    async updateProfile(userData) {
        const token = this.getToken();
        const response = await axios.put(`${API_URL}/me`, userData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
    }
};

export default authService;
