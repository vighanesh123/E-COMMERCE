import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="bg-gray-800 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            
            {/* Get to Know Us */}
            <div>
              <h3 className="text-white font-semibold text-sm sm:text-base mb-3 sm:mb-4">Get to Know Us</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li><Link to="/" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">About TechMart</Link></li>
                <li><Link to="/help" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Our Story</Link></li>
                <li><Link to="/help" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Why Choose Us</Link></li>
                <li><Link to="/help" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Quality Promise</Link></li>
              </ul>
            </div>

            {/* Connect with Us */}
            <div>
              <h3 className="text-white font-semibold text-sm sm:text-base mb-3 sm:mb-4">Connect with Us</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li><a href="#" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Instagram</a></li>
                <li><a href="mailto:vighneshdabare26@gmail.com" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Email Us</a></li>
              </ul>
            </div>

            {/* Shop Categories */}
            <div>
              <h3 className="text-white font-semibold text-sm sm:text-base mb-3 sm:mb-4">Shop Categories</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li><Link to="/products/category/smartphones" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Smartphones</Link></li>
                <li><Link to="/products/category/laptops" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Laptops</Link></li>
                <li><Link to="/products/category/headphones" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Headphones</Link></li>
                <li><Link to="/products/category/smartwatches" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Smart Watches</Link></li>
                <li><Link to="/products/category/tablets" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Tablets</Link></li>
                <li><Link to="/products/category/cameras" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Cameras</Link></li>
                <li><Link to="/products" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">All Products</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-white font-semibold text-sm sm:text-base mb-3 sm:mb-4">Customer Service</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li><Link to="/profile" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Your Account</Link></li>
                <li><Link to="/orders" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Order History</Link></li>
                <li><Link to="/help" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Shipping Info</Link></li>
                <li><Link to="/help" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Returns & Exchanges</Link></li>
                <li><Link to="/help" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Track Your Order</Link></li>
                <li><Link to="/help" className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors">Help Center</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="bg-gray-900 py-4 sm:py-6 border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <Link to="/" className="flex items-center space-x-2 mb-3 sm:mb-4">
              <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              <span className="text-xl sm:text-2xl font-bold text-white">TechMart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-black py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center sm:text-left">
            
            {/* TechMart Electronics */}
            <div>
              <h4 className="text-white font-medium text-xs sm:text-sm mb-1 sm:mb-2">TechMart Electronics</h4>
              <p className="text-gray-300 text-xs">Premium gadgets & accessories</p>
            </div>

            {/* Fast Delivery */}
            <div>
              <h4 className="text-white font-medium text-xs sm:text-sm mb-1 sm:mb-2">Fast Delivery</h4>
              <p className="text-gray-300 text-xs">Quick & secure shipping</p>
            </div>

            {/* Developer Info */}
            <div>
              <h4 className="text-white font-medium text-xs sm:text-sm mb-1 sm:mb-2">Developer</h4>
              <p className="text-gray-300 text-xs">Vighnesh Dabare</p>
              <p className="text-gray-300 text-xs">+91 9359942986</p>
            </div>

            {/* Customer Support */}
            <div>
              <h4 className="text-white font-medium text-xs sm:text-sm mb-1 sm:mb-2">24/7 Support</h4>
              <p className="text-gray-300 text-xs">Always here to help you</p>
            </div>

          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-700 mt-4 sm:mt-6 pt-4 sm:pt-6 text-center">
            <p className="text-gray-300 text-xs">
              © {new Date().getFullYear()} TechMart. Developed by Vighnesh Dabare. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;