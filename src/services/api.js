import { API_ENDPOINTS } from '../config/api';

class ApiService {
  async get(endpoint, options = {}) {
    try {
      const response = await fetch(endpoint, {
        ...options,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  }

  async post(endpoint, data, options = {}) {
    try {
      const response = await fetch(endpoint, {
        ...options,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  }

  // Portfolio data
  async getPortfolio() {
    return this.get(API_ENDPOINTS.PORTFOLIO);
  }

  // Contact form
  async sendContact(data) {
    return this.post(API_ENDPOINTS.CONTACT, data);
  }

  // Analytics
  async logAnalytics(event, data) {
    return this.post(API_ENDPOINTS.ANALYTICS, { event, data });
  }

  // Health check
  async checkHealth() {
    return this.get(API_ENDPOINTS.HEALTH);
  }
}

export default new ApiService();

