import api from './api';

// Import sample products from Home.js
import { sampleKeyboardProducts, sampleSmartwatchProducts } from '../pages/Products';

export const productService = {
  getAllProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getProductById: async (id) => {
    // Check if the ID matches any sample keyboard product
    const keyboardProduct = sampleKeyboardProducts.find(product => product.id === id);
    if (keyboardProduct) {
      console.log('Found sample keyboard product:', keyboardProduct);
      return keyboardProduct;
    }
    
    // Check if the ID matches any sample smartwatch product
    const smartwatchProduct = sampleSmartwatchProducts.find(product => product.id === id);
    if (smartwatchProduct) {
      console.log('Found sample smartwatch product:', smartwatchProduct);
      return smartwatchProduct;
    }
    
    // If not a sample product, fetch from API
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getProductsByCategory: async (category) => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },

  searchProducts: async (query, category = null) => {
    const params = { query: query };
    if (category) params.category = category;

    const response = await api.get('/products/search', { params });
    return response.data;
  },

  getAvailableProducts: async () => {
    const response = await api.get('/products/available');
    return response.data;
  }
};