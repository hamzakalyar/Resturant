/**
 * Authentication Context
 * Global state management for user authentication
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on mount
    useEffect(() => {
        const initAuth = async () => {
            const currentUser = authService.getCurrentUser();
            if (currentUser) {
                // Verify token is still valid
                const validUser = await authService.getUserInfo();
                setUser(validUser);
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const userData = await authService.login(email, password);
            setUser(userData);
            return { success: true, user: userData };
        } catch (error) {
            console.error('Login error:', error);

            // Extract detailed error message
            let errorMessage = 'Login failed';

            if (error.response) {
                if (error.response.data?.detail) {
                    errorMessage = error.response.data.detail;
                } else if (error.response.data?.message) {
                    errorMessage = error.response.data.message;
                } else if (typeof error.response.data === 'string') {
                    errorMessage = error.response.data;
                } else {
                    errorMessage = `Login failed: ${error.response.status} ${error.response.statusText}`;
                }
            } else if (error.request) {
                errorMessage = 'Cannot connect to server. Please check if the backend is running at http://localhost:8000';
            } else if (error.message) {
                errorMessage = error.message;
            }

            return {
                success: false,
                error: errorMessage
            };
        }
    };

    const register = async (userData) => {
        try {
            const newUser = await authService.register(userData);
            // Don't auto-login, redirect to login page
            return { success: true, user: newUser };
        } catch (error) {
            console.error('Registration error:', error);

            // Extract detailed error message
            let errorMessage = 'Registration failed';

            if (error.response) {
                // Server responded with error
                if (error.response.data?.detail) {
                    errorMessage = error.response.data.detail;
                } else if (error.response.data?.message) {
                    errorMessage = error.response.data.message;
                } else if (typeof error.response.data === 'string') {
                    errorMessage = error.response.data;
                } else {
                    errorMessage = `Registration failed: ${error.response.status} ${error.response.statusText}`;
                }
            } else if (error.request) {
                // Request made but no response
                errorMessage = 'Cannot connect to server. Please check if the backend is running at http://localhost:8000';
            } else if (error.message) {
                // Error in request setup
                errorMessage = error.message;
            }

            return {
                success: false,
                error: errorMessage
            };
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const updateUser = async (userData) => {
        try {
            const updatedUser = await authService.updateProfile(userData);
            setUser(updatedUser);
            return { success: true, user: updatedUser };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || 'Update failed'
            };
        }
    };

    const value = {
        user,
        loading,
        login,
        logout,
        register,
        updateUser,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
