import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { playOrderSuccessSound } from '../utils/soundUtils';

const OrderSuccess = () => {
  const { user } = useAuth();
  const { showSuccessToast } = useToast();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Get the order details from localStorage
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setOrder(parsedOrder);
        
        // Play success sound when order success page loads
        playOrderSuccessSound();
      } catch (error) {
        console.error('Error parsing order data:', error);
      }
    }
  }, [showSuccessToast]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Your Order is Successfully Ordered!</h1>
        <p className="text-lg text-gray-600 mb-2">
          Thank you for shopping with ElectroStore, {user?.firstName || user?.name || 'Valued Customer'}!
        </p>
        <p className="text-md text-green-600 font-semibold mb-6">
          ✅ Your order is being processed.
        </p>

        {order && (
          <div className="mb-8 text-left bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-3 text-center">Order Details</h2>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-600">Order ID:</p>
              <p className="font-medium">#{order.id ? order.id.substring(0, 8) : 'N/A'}</p>
              
              <p className="text-gray-600">Total Amount:</p>
              <p className="font-medium">₹{order.totalAmount?.toFixed(2) || '0.00'}</p>
              
              <p className="text-gray-600">Payment Method:</p>
              <p className="font-medium">{order.paymentMethod || 'Not specified'}</p>
              
              <p className="text-gray-600">Status:</p>
              <p className="font-medium">{order.status || 'Processing'}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Continue Shopping
          </Link>
          <Link
            to="/profile"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;