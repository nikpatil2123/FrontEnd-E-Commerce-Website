import axios from 'axios';

// Create axios instance with base URL from environment variable
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Example API functions
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  // Add other auth endpoints
};

export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  // Add other product endpoints
};

export const orderAPI = {
  create: (orderData) => api.post('/orders', orderData),
  getByUser: () => api.get('/orders/user'),
  updateStatus: (id, status) => api.put(`/orders/${id}`, { status }),
  // Add other order endpoints
};

export const bannerAPI = {
  get: () => api.get('/banner'),
  update: (formData) => api.post('/banner/update', formData),
};

// Export the axios instance as default
export default api;
