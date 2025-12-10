// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.fr0strated.me';

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/api/health`,
  PORTFOLIO: `${API_BASE_URL}/api/portfolio`,
  CONTACT: `${API_BASE_URL}/api/contact`,
  ANALYTICS: `${API_BASE_URL}/api/analytics`,
};

export default API_BASE_URL;

