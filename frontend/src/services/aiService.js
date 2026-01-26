/**
 * AI Service
 * API calls for AI-powered features
 */

import apiClient from './api';

const aiService = {
    /**
     * Get AI-powered menu recommendations
     */
    getRecommendations: async (preferences, budget = null, dietaryRestrictions = []) => {
        try {
            const response = await apiClient.post('/api/ai/recommendations', {
                preferences,
                budget,
                dietary_restrictions: dietaryRestrictions,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Chat with AI assistant
     */
    chat: async (message, conversationHistory = []) => {
        try {
            const response = await apiClient.post('/api/ai/chat', {
                message,
                conversation_history: conversationHistory,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Natural language search
     */
    search: async (query) => {
        try {
            const response = await apiClient.post('/api/ai/search', { query });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default aiService;
