import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Toast from './Toast';

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  // Add error boundary for missing product data
  if (!product || !product.id) {
    console.error('ProductCard: Invalid product data:', product);
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-red-500">Invalid product data</p>
      </div>
    );
  }

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const result = await addToCart(product.id, 1);
      if (result.success) {
        setShowToast(true);
      } else {
        alert(result.error || 'Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-w-1 aspect-h-1">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-32 sm:h-40 lg:h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-3 sm:p-4">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>

          <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-1 sm:px-2 py-1 rounded">
              {product.category}
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-600">
              {product.brand}
            </span>
          </div>

          <div className="flex items-center mb-2 sm:mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 sm:h-4 sm:w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2">(4.0)</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg sm:text-2xl font-bold text-blue-600">
              ₹{product.price.toLocaleString('en-IN')}
            </span>

            {user && (
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white p-1 sm:p-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-1"
              >
                <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">Add</span>
              </button>
            )}
          </div>

          {product.stockQuantity && (
            <div className="mt-1 sm:mt-2">
              <span className={`text-xs px-1 sm:px-2 py-1 rounded ${product.stockQuantity > 10
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
                }`}>
                {product.stockQuantity > 10 ? 'In Stock' : `Only ${product.stockQuantity} left`}
              </span>
            </div>
          )}
        </div>
      </Link>
      
      {/* Toast Notification */}
      {showToast && (
        <Toast
          type="cart"
          productName={product.name}
          productImage={product.imageUrl}
          message="Product successfully added to your cart"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default ProductCard;