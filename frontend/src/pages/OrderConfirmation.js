import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { currentOrder, getOrderDetails, loading, error } = useOrder();

  // Local loading state to handle initial data fetch
  const [localLoading, setLocalLoading] = useState(true);
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!orderId) {
        setLocalError('No order ID provided');
        setLocalLoading(false);
        return;
      }

      try {
        console.log('Fetching order details for ID:', orderId);
        const orderData = await getOrderDetails(orderId);
        console.log('Order details fetched:', orderData);
        if (!orderData) {
          setLocalError('Could not retrieve order details');
        }
      } catch (err) {
        console.error('Error in OrderConfirmation useEffect:', err);
        setLocalError('Failed to load order details');
      } finally {
        setLocalLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId, getOrderDetails]);

  if (loading || localLoading) {
    return <LoadingSpinner />;
  }

  if (error || localError) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || localError}
        </div>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Order not found. Please check your order history.
        </div>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-2" />
          <h1 className="text-2xl font-bold">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>

        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Order Details</h2>
          <p className="text-gray-600">Order ID: {currentOrder?.id || 'N/A'}</p>
          <p className="text-gray-600">Date: {currentOrder?.orderDate ? new Date(currentOrder.orderDate).toLocaleDateString() : 'N/A'}</p>
          <p className="text-gray-600">Status: {currentOrder?.status || 'Processing'}</p>
          <p className="text-gray-600">Payment Method: {currentOrder?.paymentMethod || 'N/A'}</p>
          <p className="text-gray-600">Payment Status: {currentOrder?.paymentStatus || 'Pending'}</p>
        </div>

        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
          {currentOrder?.shippingAddress ? (
            <>
              <p className="text-gray-600">{currentOrder.shippingAddress.street}</p>
              <p className="text-gray-600">
                {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} {currentOrder.shippingAddress.zipCode}
              </p>
              <p className="text-gray-600">{currentOrder.shippingAddress.country}</p>
            </>
          ) : (
            <p className="text-gray-600">Address information not available</p>
          )}
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <div className="space-y-2">
            {currentOrder?.items?.length > 0 ? (
              currentOrder.items.map((item) => (
                <div key={item.product?.id || `item-${Math.random()}`} className="flex justify-between">
                  <span>{item.product?.name || 'Unknown Product'} x {item.quantity}</span>
                  <span>₹{((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No items in this order</p>
            )}
          </div>
          <div className="border-t mt-4 pt-4 font-bold flex justify-between">
            <span>Total:</span>
            <span>₹{currentOrder?.totalAmount?.toFixed(2) || '0.00'}</span>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Link to="/" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;