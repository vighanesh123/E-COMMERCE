import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { Package, Calendar, CreditCard, MapPin, Eye } from 'lucide-react';

const Orders = () => {
  const { user } = useAuth();
  const { orderHistory, getOrderHistory, loading, error } = useOrder();
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (user) {
      getOrderHistory();
    }
  }, [user]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
          <p className="text-gray-600">You need to be logged in to view your orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {orderHistory && orderHistory.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start shopping to see your orders here!</p>
          <a
            href="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orderHistory?.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.id?.substring(0, 8)}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(order.orderDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status || 'Pending'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus || 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Order Items */}
                  <div className="lg:col-span-2">
                    <h4 className="font-semibold text-gray-900 mb-3">Items Ordered</h4>
                    <div className="space-y-3">
                      {order.items?.map((item, index) => {
                        // Universal image override system
                        const getProductImage = (productName) => {
                          if (!productName) return null;
                          
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
                        
                        const productImage = getProductImage(item.productName) || item.imageUrl;

                        return (
                          <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                              {productImage ? (
                                <img
                                  src={productImage}
                                  alt={item.productName || 'Product'}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                              ) : null}
                              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center" style={{ display: productImage ? 'none' : 'flex' }}>
                                <Package className="h-8 w-8 text-gray-400" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900">
                                {item.productName || 'Product'}
                              </h5>
                              <p className="text-sm text-gray-600">
                                Quantity: {item.quantity} × ₹{item.price?.toFixed(2)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">
                                ₹{(item.quantity * item.price)?.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-semibold text-lg text-gray-900">
                          ₹{order.totalAmount?.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <CreditCard className="h-4 w-4" />
                        <span>{order.paymentMethod || 'COD'}</span>
                      </div>

                      {order.shippingAddress && (
                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex items-start space-x-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-900">Shipping Address:</p>
                              <p>{order.shippingAddress.street}</p>
                              <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                              <p>{order.shippingAddress.zipCode}, {order.shippingAddress.country}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
