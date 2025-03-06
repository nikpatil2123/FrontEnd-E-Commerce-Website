import axios from 'axios';
import { API_BASE_URL } from './env';

// Create an instance of axios with the base URL from environment
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for auth tokens (if needed)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors like 401 (unauthorized)
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized, redirecting to login');
      // Optional: Redirect to login or clear auth
      // window.location = '/login';
      localStorage.removeItem('authToken');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
