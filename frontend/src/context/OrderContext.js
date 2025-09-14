import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import { useToast } from './ToastContext';
import api from '../services/api';

const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  const { cart, fetchCart } = useCart();
  const { showSuccessToast, showErrorToast } = useToast();

  // Create a new order
  const createOrder = async (shippingAddress, paymentMethod) => {
    console.log('OrderContext - Creating order...');
    
    // Get authentication from localStorage (more reliable)
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!storedToken || !storedUser) {
      const errorMessage = 'Please log in to place an order';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }

    if (!cart || !cart.items || cart.items.length === 0) {
      const errorMessage = 'Your cart is empty';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }

    try {
      setLoading(true);
      setError('');

      // Transform cart items to include product details with image URLs
      const transformedItems = cart.items.map(item => {
        // Universal image override system
        const getProductImage = (productName) => {
          if (!productName) return item.product?.imageUrl;
          
          const name = productName.toLowerCase();
          
          // Specific product overrides
          const imageMap = {
            'google pixel 8 pro': 'https://cdn.neowin.com/news/images/uploaded/2023/10/1696431529_pixel-8.jpg',
            'nothing phone 2': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'samsung galaxy s24 ultra': 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'oneplus 12': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'asus zenbook 14': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'dell xps 13': 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'asus rog zephyrus g14': 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'jbl charge 5': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'sony xm4': 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'compact 60% keyboard': 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'mechanical numpad': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'nintendo switch oled': 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'sony a7 iv': 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'gopro hero 11': 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          };
          
          // Check for exact matches first
          for (const [key, url] of Object.entries(imageMap)) {
            if (name.includes(key)) {
              return url;
            }
          }
          
          // Category-based fallback images
          if (name.includes('phone') || name.includes('mobile') || name.includes('smartphone') || 
              name.includes('galaxy') || name.includes('iphone') || name.includes('pixel') || 
              name.includes('oneplus') || name.includes('xiaomi') || name.includes('samsung')) {
            return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }
          
          if (name.includes('laptop') || name.includes('notebook') || name.includes('macbook') || 
              name.includes('thinkpad') || name.includes('zenbook') || name.includes('xps') || 
              name.includes('asus') || name.includes('dell') || name.includes('hp') || name.includes('lenovo')) {
            return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }
          
          if (name.includes('headphone') || name.includes('earphone') || name.includes('earbud') || 
              name.includes('airpod') || name.includes('sony') || name.includes('bose') || name.includes('audio')) {
            return 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }
          
          if (name.includes('speaker') || name.includes('jbl') || name.includes('bluetooth') || name.includes('sound')) {
            return 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }
          
          if (name.includes('keyboard') || name.includes('mouse') || name.includes('gaming') || name.includes('mechanical')) {
            return 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }
          
          if (name.includes('camera') || name.includes('canon') || name.includes('nikon') || 
              name.includes('sony') || name.includes('gopro') || name.includes('photography')) {
            return 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }
          
          if (name.includes('watch') || name.includes('smartwatch') || name.includes('apple watch') || 
              name.includes('fitness') || name.includes('wearable')) {
            return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }
          
          if (name.includes('tablet') || name.includes('ipad') || name.includes('surface')) {
            return 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }
          
          if (name.includes('console') || name.includes('nintendo') || name.includes('playstation') || 
              name.includes('xbox') || name.includes('switch') || name.includes('gaming')) {
            return 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }
          
          // Default electronics image
          return 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
        };
        
        const imageUrl = getProductImage(item.product?.name);

        return {
          productId: item.product?.id,
          productName: item.product?.name,
          price: item.product?.price,
          quantity: item.quantity,
          imageUrl: imageUrl
        };
      });

      const orderData = {
        items: transformedItems,
        shippingAddress,
        paymentMethod,
        totalAmount: cart.totalAmount
      };

      console.log('Creating order with data:', orderData);
      console.log('Using token:', storedToken.substring(0, 20) + '...');
      
      // Create a fresh axios instance to avoid interceptor issues
      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Order creation failed:', response.status, errorData);
        throw new Error(`HTTP ${response.status}: ${errorData}`);
      }
      
      const orderResult = await response.json();
      console.log('Order created successfully:', orderResult);
      
      // Set the current order in state
      setCurrentOrder(orderResult);
      
      // Order placed successfully - no toast notification needed
      
      // Refresh the cart after order is created
      try {
        await fetchCart();
        console.log('Cart refreshed successfully');
      } catch (cartError) {
        console.warn('Cart refresh failed, but order was successful:', cartError);
        // Continue with order success even if cart refresh fails
      }
      
      return { success: true, order: orderResult };
    } catch (error) {
      console.error('Error creating order:', error);
      
      let errorMessage = 'Failed to create order. Please try again.';
      
      if (error.message.includes('401') || error.message.includes('403')) {
        errorMessage = 'Session expired. Please log in again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      showErrorToast(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Get order history
  const getOrderHistory = async () => {
    if (!user) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await api.get('/orders');
      
      // Check if response data is valid
      if (response.data) {
        // Ensure it's an array
        const orders = Array.isArray(response.data) ? response.data : [];
        setOrderHistory(orders);
      } else {
        setOrderHistory([]);
      }
    } catch (error) {
      console.error('Error fetching order history:', error);
      
      let errorMessage = 'Failed to fetch order history';
      
      if (error.response?.status === 401) {
        errorMessage = 'Session expired. Please log in again.';
      } else if (error.response?.status === 404) {
        errorMessage = 'Orders not found';
        setOrderHistory([]);
      } else if (error.message?.includes('JSON')) {
        errorMessage = 'Failed to parse order data';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setError(errorMessage);
      setOrderHistory([]);
    } finally {
      setLoading(false);
    }
  };

  // Get order details
  const getOrderDetails = async (orderId) => {
    try {
      setLoading(true);
      const response = await api.get(`/orders/${orderId}`);
      setCurrentOrder(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching order details:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
      setError('Failed to fetch order details');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Clear current order
  const clearCurrentOrder = () => {
    setCurrentOrder(null);
  };

  const value = {
    currentOrder,
    orderHistory,
    loading,
    error,
    createOrder,
    getOrderHistory,
    getOrderDetails,
    clearCurrentOrder
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};