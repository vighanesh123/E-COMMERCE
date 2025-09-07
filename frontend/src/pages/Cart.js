import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    loading,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal
  } = useCart();

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateCartItem(productId, newQuantity);
  };

  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await clearCart();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const cartItems = cart?.items || [];
  
  // Use manual calculation instead of getCartTotal to fix the issue
  const total = cartItems.reduce((sum, item) => {
    const price = item.product?.price || item.price || 0;
    const quantity = item.quantity || 0;
    return sum + (price * quantity);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Shopping Cart
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <p className="text-sm sm:text-base text-gray-600">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Link
            to="/products"
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft size={18} className="mr-2 sm:w-5 sm:h-5" />
            Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-8 sm:py-12 px-4">
            <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4 sm:w-16 sm:h-16" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/products"
              className="btn-primary inline-flex items-center text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
            >
              <ShoppingBag size={18} className="mr-2 sm:w-5 sm:h-5" />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 sm:p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                      Cart Items
                    </h2>
                    {cartItems.length > 0 && (
                      <button
                        onClick={handleClearCart}
                        className="text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium"
                      >
                        Clear Cart
                      </button>
                    )}
                  </div>
                </div>

                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.productId || item.product?.id} className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <img
                          src={item.productImage || item.product?.imageUrl}
                          alt={item.productName || item.product?.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">
                            {item.productName || item.product?.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500">
                            ₹{(item.price || item.product?.price)?.toLocaleString('en-IN')} each
                          </p>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.productId || item.product?.id, item.quantity - 1)}
                              className="p-1 rounded-md hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} className="sm:w-4 sm:h-4" />
                            </button>
                            <span className="w-8 sm:w-12 text-center font-medium text-sm sm:text-base">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.productId || item.product?.id, item.quantity + 1)}
                              className="p-1 rounded-md hover:bg-gray-100"
                            >
                              <Plus size={14} className="sm:w-4 sm:h-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-base sm:text-lg font-semibold text-gray-900">
                              ₹{((item.price || item.product?.price) * item.quantity).toLocaleString('en-IN')}
                            </p>
                            <button
                              onClick={() => handleRemoveItem(item.productId || item.product?.id)}
                              className="text-red-600 hover:text-red-700 mt-1"
                            >
                              <Trash2 size={14} className="sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-8">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm sm:text-base text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{total > 0 ? total.toLocaleString('en-IN') : '0'}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base text-gray-600">
                    <span>Shipping</span>
                    <span>₹{total >= 1000 ? '0' : '99'}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-base sm:text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span>
                        ₹{total > 0 ? (total + (total >= 1000 ? 0 : 99)).toLocaleString('en-IN') : '99'}
                      </span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/checkout')} 
                  className="w-full btn-primary py-2 sm:py-3 text-sm sm:text-lg mb-3 sm:mb-4"
                >
                  Proceed to Checkout
                </button>

                {total < 1000 && (
                  <div className="text-center text-xs sm:text-sm text-gray-600 mb-4">
                    Add ₹{(1000 - total).toLocaleString('en-IN')} more for free shipping
                  </div>
                )}

                <div className="mt-4 sm:mt-6 text-center">
                  <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-500">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;