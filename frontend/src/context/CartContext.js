import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();

  // Fetch cart when user logs in
  useEffect(() => {
    if (user && token) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [user, token]);

  const fetchCart = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await api.get('/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!token) {
      throw new Error('Please login to add items to cart');
    }

    // Check if the product ID is from sample data (starts with 'kb' or 'sw')
    if (productId.startsWith('kb') || productId.startsWith('sw')) {
      console.log('Adding sample product to cart:', productId);
      
      // Handle sample products locally without API call
      try {
        // Get the sample product data
        let sampleProduct;
        
        // Import the sample products directly
        const { sampleKeyboardProducts, sampleSmartwatchProducts } = await import('../pages/Products');
        
        if (productId.startsWith('kb')) {
          sampleProduct = sampleKeyboardProducts.find(p => p.id === productId);
          console.log('Found keyboard product:', sampleProduct);
        } else {
          sampleProduct = sampleSmartwatchProducts.find(p => p.id === productId);
          console.log('Found smartwatch product:', sampleProduct);
        }
        
        if (!sampleProduct) {
          return {
            success: false,
            error: 'Sample product not found'
          };
        }
        
        // Update cart locally
        const updatedCart = cart ? { ...cart } : { items: [] };
        
        // Ensure items array exists
        if (!updatedCart.items) {
          updatedCart.items = [];
        }
        
        // Check if item already exists in cart
        const existingItemIndex = updatedCart.items.findIndex(item => 
          item.product && item.product.id === productId
        );
        
        if (existingItemIndex >= 0) {
          // Update quantity if item exists
          updatedCart.items[existingItemIndex].quantity += quantity;
        } else {
          // Add new item if it doesn't exist
          updatedCart.items.push({
            product: sampleProduct,
            quantity: quantity
          });
        }
        
        setCart(updatedCart);
        return { success: true };
      } catch (error) {
        console.error('Error adding sample product to cart:', error);
        console.error('Error details:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          config: error.config
        });
        return {
          success: false,
          error: 'Failed to add sample product to cart'
        };
      }
    } else {
      // Regular API call for non-sample products
      try {
        const response = await api.post('/cart/add', { productId, quantity });
        setCart(response.data);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error.response?.data?.message || 'Failed to add item to cart'
        };
      }
    }
  };

  const updateCartItem = async (productId, quantity) => {
    if (!token) {
      throw new Error('Please login to update cart');
    }

    // Check if the product ID is from sample data (starts with 'kb' or 'sw')
    if (productId.startsWith('kb') || productId.startsWith('sw')) {
      // Handle sample products locally without API call
      try {
        // Update cart locally
        const updatedCart = cart ? { ...cart } : { items: [] };
        
        // Ensure items array exists
        if (!updatedCart.items) {
          updatedCart.items = [];
        }
        
        // Find the item
        const existingItemIndex = updatedCart.items.findIndex(item => 
          item.product && item.product.id === productId
        );
        
        if (existingItemIndex >= 0) {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            updatedCart.items.splice(existingItemIndex, 1);
          } else {
            // Update quantity
            updatedCart.items[existingItemIndex].quantity = quantity;
          }
          
          setCart(updatedCart);
          return { success: true };
        } else {
          return {
            success: false,
            error: 'Item not found in cart'
          };
        }
      } catch (error) {
        console.error('Error updating sample product in cart:', error);
        console.error('Error details:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          config: error.config
        });
        return {
          success: false,
          error: 'Failed to update sample product in cart'
        };
      }
    } else {
      // Regular API call for non-sample products
      try {
        const response = await api.put('/cart/update', { productId, quantity });
        setCart(response.data);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error.response?.data?.message || 'Failed to update item in cart'
        };
      }
    }
  };

  const removeFromCart = async (productId) => {
    if (!token) {
      throw new Error('Please login to remove items from cart');
    }

    // Check if the product ID is from sample data (starts with 'kb' or 'sw')
    if (productId.startsWith('kb') || productId.startsWith('sw')) {
      // Handle sample products locally without API call
      try {
        // Update cart locally
        const updatedCart = cart ? { ...cart } : { items: [] };
        
        // Ensure items array exists
        if (!updatedCart.items) {
          updatedCart.items = [];
        }
        
        // Find and remove the item
        updatedCart.items = updatedCart.items.filter(item => 
          item.product && item.product.id !== productId
        );
        
        setCart(updatedCart);
        return { success: true };
      } catch (error) {
        console.error('Error removing sample product from cart:', error);
        return {
          success: false,
          error: 'Failed to remove sample product from cart'
        };
      }
    } else {
      // Regular API call for non-sample products
      try {
        const response = await api.delete(`/cart/remove/${productId}`);
        setCart(response.data);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error.response?.data?.message || 'Failed to remove item from cart'
        };
      }
    }
  };

  const clearCart = async () => {
    if (!token) {
      throw new Error('Please login to clear cart');
    }

    // Check if there are any sample products in the cart
    const hasSampleProducts = cart?.items?.some(item => 
      item.product && (item.product.id.startsWith('kb') || item.product.id.startsWith('sw'))
    );

    if (hasSampleProducts) {
      try {
        // Create a new cart with only non-sample products
        const nonSampleItems = cart?.items?.filter(item => 
          item.product && !item.product.id.startsWith('kb') && !item.product.id.startsWith('sw')
        ) || [];

        if (nonSampleItems.length > 0) {
          // If there are non-sample items, clear them via API
          try {
            await api.delete('/cart/clear');
          } catch (error) {
            console.error('Error clearing non-sample products from cart:', error);
          }
        }

        // Set cart with empty items
        setCart({ ...cart, items: [] });
        return { success: true };
      } catch (error) {
        console.error('Error clearing cart with sample products:', error);
        return {
          success: false,
          error: 'Failed to clear cart'
        };
      }
    } else {
      // No sample products, use regular API call
      try {
        const response = await api.delete('/cart/clear');
        setCart(response.data);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error.response?.data?.message || 'Failed to clear cart'
        };
      }
    }
  };

  const getCartTotal = () => {
    if (!cart?.items) return 0;
    const total = cart.items.reduce((total, item) => {
      const price = item.product?.price || item.price || 0;
      const quantity = item.quantity || 0;
      console.log('Cart item calculation:', { 
        itemId: item.product?.id || item.productId,
        price, 
        quantity, 
        subtotal: price * quantity 
      });
      return total + (price * quantity);
    }, 0);
    console.log('Total cart value:', total);
    return total;
  };

  const getCartItemCount = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};