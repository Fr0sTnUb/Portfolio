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

      // Try to parse JSON, but handle cases where response might not be JSON
      let responseData;
      const contentType = response.headers.get('content-type');
      
      try {
        if (contentType && contentType.includes('application/json')) {
          responseData = await response.json();
        } else {
          const text = await response.text();
          responseData = { message: text || `Server error: ${response.status}` };
        }
      } catch (parseError) {
        // If JSON parsing fails, create a default error response
        responseData = { 
          error: `Server error: ${response.status}`,
          message: `Unable to parse server response. Status: ${response.status}`
        };
      }

      if (!response.ok) {
        const error = new Error(responseData.message || responseData.error || `HTTP error! status: ${response.status}`);
        error.response = response;
        error.responseData = responseData;
        error.status = response.status;
        throw error;
      }

      return responseData;
    } catch (error) {
      console.error('API POST Error:', error);
      
      // If it's already our custom error, re-throw it
      if (error.response || error.responseData) {
        throw error;
      }
      
      // Handle network errors (no response at all)
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        const networkError = new Error('Unable to connect to server. Please check your internet connection and try again.');
        networkError.isNetworkError = true;
        networkError.originalError = error;
        throw networkError;
      }
      
      // Otherwise, wrap it
      const wrappedError = new Error(error.message || 'Network error occurred');
      wrappedError.originalError = error;
      throw wrappedError;
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

