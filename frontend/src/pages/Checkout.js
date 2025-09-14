import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../services/api';
import { playOrderSuccessSound } from '../utils/soundUtils';

const Checkout = () => {
  const { user, token, loading: authLoading } = useAuth();
  const { cart, loading: cartLoading } = useCart();
  const { createOrder, loading: orderLoading, error: orderError } = useOrder();
  const { showSuccessToast, showErrorToast } = useToast();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);
  
  // Debug authentication state and ensure API headers are set
  useEffect(() => {
    console.log('Checkout - Auth state:', { 
      user: user ? `${user.firstName} ${user.lastName}` : null, 
      userId: user?.id,
      hasToken: !!token,
      tokenStart: token ? `${token.substring(0, 10)}...` : null,
      authLoading,
      cartLoading,
      orderLoading
    });
    
    // Check localStorage directly
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    let parsedUser = null;
    
    try {
      if (storedUser) {
        parsedUser = JSON.parse(storedUser);
      }
    } catch (e) {
      console.error('Checkout - Error parsing stored user:', e);
    }
    
    console.log('Checkout - LocalStorage:', { 
      hasToken: !!storedToken, 
      hasUser: !!storedUser,
      userId: parsedUser?.id,
      tokenStart: storedToken ? `${storedToken.substring(0, 10)}...` : null
    });
    
    // Ensure API headers are set with the token
    if (storedToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      console.log('Checkout - Set Authorization header:', `Bearer ${storedToken.substring(0, 10)}...`);
      
      // Verify the header was set correctly
      setTimeout(() => {
        const currentHeader = api.defaults.headers.common['Authorization'];
        console.log('Checkout - Verification: Authorization header is set:', 
          !!currentHeader, 
          currentHeader ? `${currentHeader.substring(0, 15)}...` : 'none');
      }, 100);
    }
    
    // Check if we have authentication
    if ((!user && !parsedUser) || (!token && !storedToken)) {
      console.error('Checkout - Authentication issue detected');
      setAuthError('Authentication required to access checkout');
    } else {
      setAuthError(null);
    }
  }, [user, token, authLoading, cartLoading, orderLoading]);

  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    paymentMethod: 'COD' // Default to Cash on Delivery
  });

  // Add validation for zipCode format
  const validateZipCode = (zipCode) => {
    // Indian postal code format: 6 digits
    const zipRegex = /^\d{6}$/;
    return zipRegex.test(zipCode);
  };

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Redirect if cart is empty
    if (!cartLoading && (!cart || !cart.items || cart.items.length === 0)) {
      navigate('/cart');
    }
  }, [cart, cartLoading, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    else if (!validateZipCode(formData.zipCode)) newErrors.zipCode = 'Zip code must be 6 digits';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      // Prepare shipping address
      const shippingAddress = {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      };
      
      console.log('Placing order with:', {
        shippingAddress,
        paymentMethod: formData.paymentMethod
      });
      
      const result = await createOrder(shippingAddress, formData.paymentMethod);
      
      if (result.success && result.order) {
        console.log('Order placed successfully:', result.order.id);
        
        // Play payment success sound
        await playOrderSuccessSound();
        
        // Store order details for confirmation page
        localStorage.setItem('lastOrder', JSON.stringify(result.order));
        
        // Navigate to order success page
        navigate('/order-success');
      } else {
        console.error('Order creation failed:', result.error);
        setErrors({ submit: result.error || 'Failed to create order. Please try again.' });
      }
    } catch (error) {
      console.error('Error in checkout:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartLoading || orderLoading) {
    return <LoadingSpinner />;
  }
  
  // Handle authentication errors
  if (authError || (!user && !localStorage.getItem('user'))) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Authentication Error</p>
          <p>{authError || 'You need to be logged in to access this page. Please log in and try again.'}</p>
        </div>
        <button 
          onClick={() => navigate('/login')} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      {/* Loading indicator */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Processing your order...</p>
            <p className="text-sm text-gray-600 mt-2">Please do not refresh the page.</p>
          </div>
        </div>
      )}
      
      {/* Error display */}
      {errors.submit && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errors.submit}
        </div>
      )}
      
      {orderError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {orderError}
        </div>
      )}
      
      {/* Order Summary */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          {cart?.items?.map((item) => (
            <div key={item.product?.id || `item-${Math.random()}`} className="flex justify-between">
              <span>{item.product?.name || 'Unknown Product'} x {item.quantity}</span>
              <span>₹{((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t mt-4 pt-4 font-bold flex justify-between">
          <span>Total:</span>
          <span>₹{cart?.totalAmount?.toFixed(2) || '0.00'}</span>
        </div>
      </div>
      
      {/* Shipping Address Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        
        {orderError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {orderError}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.street ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>
          
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
          </div>
          
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
          </div>
          
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="CREDIT_CARD">Credit Card</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;