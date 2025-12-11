// API Configuration
// In development, use localhost if VITE_API_URL is not set
// In production, use the production API URL
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Check if we're in development mode
  if (import.meta.env.DEV || import.meta.env.MODE === 'development') {
    return 'http://localhost:3000';
  }
  
  // Production default
  return 'https://api.fr0strated.me';
};

const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/api/health`,
  PORTFOLIO: `${API_BASE_URL}/api/portfolio`,
  CONTACT: `${API_BASE_URL}/api/contact`,
  ANALYTICS: `${API_BASE_URL}/api/analytics`,
};

export default API_BASE_URL;

