import React, { useState, useEffect } from 'react';
import { ShoppingCart, CheckCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', duration = 4000, onClose, productName, productImage }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  };

  // Enhanced styling for cart addition
  if (type === 'cart') {
    return (
      <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${isExiting ? 'animate-fade-out-up' : 'animate-fade-in-down'}`}>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow-2xl border border-green-400/30 backdrop-blur-sm max-w-sm">
          <div className="flex items-start space-x-3">
            {/* Success Icon */}
            <div className="flex-shrink-0 mt-1">
              <div className="bg-white/20 rounded-full p-2">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-grow">
              <div className="flex items-center space-x-2 mb-2">
                <ShoppingCart className="h-4 w-4 text-white" />
                <span className="font-semibold text-sm">Added to Cart!</span>
              </div>
              
              {productImage && (
                <div className="flex items-center space-x-3 mb-2">
                  <img 
                    src={productImage} 
                    alt={productName}
                    className="w-10 h-10 rounded-lg object-cover border border-white/20"
                  />
                  <div>
                    <p className="text-sm font-medium text-white/90 line-clamp-1">
                      {productName}
                    </p>
                  </div>
                </div>
              )}
              
              <p className="text-xs text-white/80">
                {message || 'Product successfully added to your cart'}
              </p>
            </div>
            
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="flex-shrink-0 hover:bg-white/20 rounded-full p-1.5 transition-colors duration-200"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Original toast for other types
  const bgColor = type === 'success' ? 'bg-green-500' : 
                 type === 'error' ? 'bg-red-500' : 
                 type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500';

  const icon = type === 'success' ? (
    <CheckCircle className="h-5 w-5 text-white" />
  ) : type === 'error' ? (
    <X className="h-5 w-5 text-white" />
  ) : (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  );

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${isExiting ? 'animate-fade-out-up' : 'animate-fade-in-down'}`}>
      <div className={`${bgColor} text-white px-4 py-3 sm:px-5 sm:py-4 rounded-lg shadow-xl flex items-center space-x-3 min-w-[280px] sm:min-w-[350px] border border-white/20`}>
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="flex-grow font-medium text-sm sm:text-base">
          {message}
        </div>
        <button 
          onClick={handleClose}
          className="flex-shrink-0 ml-auto hover:bg-white/20 rounded-full p-1 transition-colors duration-200"
        >
          <X className="h-4 w-4 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Toast;