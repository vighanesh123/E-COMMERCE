import axios from 'axios';

// Environment-based API URL configuration
const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_URL || 'https://your-render-app.onrender.com/api';
  }
  return 'http://localhost:8080/api';
};

export const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Add auth token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log(`API Request to ${config.url} - Adding auth token`);
      // Ensure the token is properly formatted and applied
      config.headers.Authorization = `Bearer ${token}`;
      // Log the full authorization header for debugging
      console.log('Authorization header:', config.headers.Authorization);
      
      // Force set the token in the default headers as well
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      console.log(`API Request to ${config.url} - No auth token available`);
      // Check if we should try to reload the page to reinitialize auth
      const storedUser = localStorage.getItem('user');
      
      // Special handling for order-related endpoints - never redirect
      const isOrderRelated = config.url && (
        config.url.includes('order') || 
        config.url.includes('checkout') || 
        config.url.includes('cart')
      );
      
      if (storedUser && config.url && !config.url.includes('/auth/') && !isOrderRelated) {
        console.log('Token missing but user exists in localStorage - possible auth state mismatch');
        
        // Try to recover by forcing a page reload
        if (!window.location.pathname.includes('/login')) {
          console.log('Redirecting to login due to missing token');
          window.location.href = '/login';
        }
      } else if (isOrderRelated) {
        console.log('Order-related request detected - not redirecting to login even without token');
      }
    }
    return config;
  },
  (error) => {
    console.error('API Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => {
    // Log successful responses for debugging
    console.log(`API Response from ${response.config.url} - Status: ${response.status}`);
    return response;
  },
  (error) => {
    // Enhanced error logging
    console.log('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response?.status === 401) {
      console.log('401 Unauthorized error detected');
      
      const url = error.config?.url || '';
      const method = error.config?.method || '';
      
      // Special handling for order-related endpoints - never redirect or logout
      const isOrderRelated = url.includes('order') || 
                            url.includes('checkout') || 
                            url.includes('cart');
      
      // Expanded list of paths to skip logout for
      const skipLogoutPaths = [
        '/api/orders', // Add the full API path
        '/orders', 
        'orders',  // Add without leading slash to catch all order-related paths
        '/checkout',
        'checkout',
        '/cart',
        '/products',
        '/api/products',
        '.js',
        '.css',
        '.json',
        '.png',
        '.jpg',
        '.svg'
      ];
      
      // Special handling for POST requests to order endpoints
      const isOrderCreation = (method.toLowerCase() === 'post' && 
                              (url.includes('order') || url.includes('checkout')));
      
      // Check if any of the paths match the current URL
      const shouldSkipLogout = skipLogoutPaths.some(path => url.includes(path)) || isOrderCreation;
      
      // Debug log for logout decision
      console.log(`URL: ${url}, Method: ${method}, isOrderRelated: ${isOrderRelated}, shouldSkipLogout: ${shouldSkipLogout}`);
      
      // For order creation specifically, never logout or redirect
      if (isOrderCreation) {
        console.log('Order creation detected - never logout or redirect for this operation');
        
        // Try to refresh the token from localStorage
        const token = localStorage.getItem('token');
        if (token) {
          console.log('Attempting to refresh auth headers with stored token');
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        
        // Return the error without redirecting
        return Promise.reject(error);
      }
      
      if (!shouldSkipLogout) {
        console.log('Unauthorized access detected. Logging out user.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else {
        console.log(`401 error for ${url} - Not logging out user.`);
        
        // Try to refresh the token from localStorage
        const token = localStorage.getItem('token');
        if (token) {
          console.log('Attempting to refresh auth headers with stored token');
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;