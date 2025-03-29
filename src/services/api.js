import axios from 'axios';

const API_BASE_URL = 'https://isxb7e9919.execute-api.ca-central-1.amazonaws.com/development';
const API_KEY = import.meta.env.VITE_API_KEY; // Using Vite's environment variable syntax

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json'
  }
});

export const api = {
  async login(credentials) {
    // Since we're using API key authentication, we'll just validate locally
    // You can modify this based on your requirements
    if (credentials.username && credentials.password) {
      return Promise.resolve({ success: true, username: credentials.username });
    }
    return Promise.reject(new Error('Invalid credentials'));
  },

  async getItems() {
    try {
      const response = await axiosInstance.get('/fetch_items');
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  async getRecommendations(userId) {
    try {
      const response = await axiosInstance.get('/get_recommendations', {
        params: {
          user_id: userId
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  },

  async recordInteraction(userId, eventType, itemId) {
    try {
      const response = await axiosInstance.post('/interactions', {
        user_id: userId,
        event_type: eventType,
        item_id: itemId
      });
      return response.data;
    } catch (error) {
      console.error('Error recording interaction:', error);
      throw error;
    }
  }
}; 