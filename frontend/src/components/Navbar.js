import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, Search, Package, UserCircle, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
    setIsSidebarOpen(false);
  };

  const handleSidebarItemClick = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let url = '/products';
    const params = [];
    if (searchQuery.trim()) params.push(`search=${encodeURIComponent(searchQuery.trim())}`);
    if (params.length) url += `?${params.join('&')}`;
    navigate(url);
    setSearchQuery('');
  };

  const cartItemsCount = cart?.items?.length || 0;

  return (
    <nav className="bg-white text-blue-700 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 p-1.5 sm:p-2 rounded-md shadow-md">
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <span className="text-base sm:text-lg font-bold hover:text-blue-500 transition-colors duration-300">
              TechMart
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-xl mx-4 lg:mx-6">
            <div className="flex w-full rounded-full bg-gray-100 border border-blue-400 hover:border-blue-500 focus-within:border-blue-600 focus-within:bg-white transition-all duration-300 shadow-sm hover:shadow-md focus-within:shadow-lg">
              <div className="flex items-center pl-3 sm:pl-4">
                <Search className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search electronics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-700 placeholder-gray-500 outline-none bg-transparent rounded-l-full"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-1.5 rounded-r-full transition-colors duration-200 flex items-center justify-center min-w-[50px] sm:min-w-[70px]"
              >
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">Search</span>
                <Search className="h-3 w-3 sm:hidden" />
              </button>
            </div>
          </form>

          {/* Right Side */}
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
            {!user ? (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md transition-colors duration-300 flex items-center space-x-1 sm:space-x-2 shadow-md hover:shadow-lg flex-shrink-0"
              >
                <User className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-medium">Login</span>
              </Link>
            ) : null}

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden hover:text-blue-500 transition-colors duration-300 p-1 flex-shrink-0"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Spacer to push cart and menu to the right */}
            <div className="flex-1"></div>

            {/* Cart and Menu buttons - At the extreme right */}
            {user && (
              <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                {/* Cart */}
                <Link to="/cart" className="relative hover:text-blue-500 transition-colors duration-300 flex-shrink-0">
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center shadow-md">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
                
                {/* Sidebar Menu Button - Extreme right */}
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="hover:text-blue-500 transition-colors duration-300 p-1 sm:p-2 hover:bg-blue-50 rounded-md flex-shrink-0"
                >
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Mobile Search Bar */}
        {isMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 bg-white px-4 py-3">
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex w-full rounded-full bg-gray-100 border border-blue-400 focus-within:border-blue-600 focus-within:bg-white transition-all duration-300">
                <div className="flex items-center pl-3">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search electronics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm text-gray-700 placeholder-gray-500 outline-none bg-transparent rounded-l-full"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-full transition-colors duration-200 flex items-center justify-center"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Sliding Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          
          {/* Sidebar */}
          <div className="absolute right-0 top-0 h-full w-72 sm:w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-white">
                  <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
                  <p className="text-blue-100 text-sm">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="py-4">
              {/* My Orders */}
              <button
                onClick={() => handleSidebarItemClick('/orders')}
                className="flex items-center w-full px-6 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
              >
                <Package className="h-5 w-5 mr-4 text-blue-500" />
                <span className="font-medium">My Orders</span>
              </button>

              {/* Cart */}
              <button
                onClick={() => handleSidebarItemClick('/cart')}
                className="flex items-center w-full px-6 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
              >
                <ShoppingCart className="h-5 w-5 mr-4 text-green-500" />
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">Cart</span>
                  {cartItemsCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
              </button>

              {/* Your Account */}
              <button
                onClick={() => handleSidebarItemClick('/profile')}
                className="flex items-center w-full px-6 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
              >
                <UserCircle className="h-5 w-5 mr-4 text-purple-500" />
                <span className="font-medium">Your Account</span>
              </button>

              {/* Customer Help */}
              <button
                onClick={() => handleSidebarItemClick('/help')}
                className="flex items-center w-full px-6 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
              >
                <HelpCircle className="h-5 w-5 mr-4 text-orange-500" />
                <span className="font-medium">Customer Help</span>
              </button>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Sign Out */}
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-6 py-4 text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <LogOut className="h-5 w-5 mr-4" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-center text-sm text-gray-500">
                <p className="font-medium text-gray-700">ElectroStore</p>
                <p>Developed by Vighnesh Dabare</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
