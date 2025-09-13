import React, { useState } from 'react';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
              <p className="text-gray-600 mb-4">Please refresh the page.</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Components - Your Original Design
const Header = ({ currentPage, setCurrentPage }) => (
  <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-6">
        <h1 className="text-2xl font-bold text-gray-900">ElectroShop</h1>
        <nav className="space-x-8">
          <button 
            onClick={() => setCurrentPage('home')}
            className={`${currentPage === 'home' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 transition-colors`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('products')}
            className={`${currentPage === 'products' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 transition-colors`}
          >
            Products
          </button>
          <button 
            onClick={() => setCurrentPage('cart')}
            className={`${currentPage === 'cart' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 transition-colors`}
          >
            Cart
          </button>
          <button 
            onClick={() => setCurrentPage('login')}
            className={`${currentPage === 'login' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 transition-colors`}
          >
            Login
          </button>
        </nav>
      </div>
    </div>
  </header>
);

const Home = ({ setCurrentPage }) => (
  <div className="text-center">
    <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to ElectroShop</h2>
    <p className="text-xl text-gray-600 mb-8">Your one-stop shop for electronics</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-semibold mb-2">Phones</h3>
        <p className="text-gray-600">Latest smartphones and accessories</p>
        <button 
          onClick={() => setCurrentPage('products')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Browse Phones
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-semibold mb-2">Laptops</h3>
        <p className="text-gray-600">High-performance laptops for work and gaming</p>
        <button 
          onClick={() => setCurrentPage('products')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Browse Laptops
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-semibold mb-2">Speakers</h3>
        <p className="text-gray-600">Premium audio equipment</p>
        <button 
          onClick={() => setCurrentPage('products')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Browse Speakers
        </button>
      </div>
    </div>
  </div>
);

const Products = () => (
  <div>
    <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="bg-gray-200 h-48 rounded mb-4"></div>
          <h3 className="text-lg font-semibold mb-2">Product {item}</h3>
          <p className="text-gray-600 mb-4">High-quality electronic device with premium features</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">$299.99</span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Cart = ({ setCurrentPage }) => (
  <div className="text-center">
    <h2 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h2>
    <div className="bg-white rounded-lg shadow-md p-8">
      <p className="text-gray-600 mb-4">Your cart is empty</p>
      <button 
        onClick={() => setCurrentPage('products')}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  </div>
);

const Login = () => (
  <div className="max-w-md mx-auto">
    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Login</h2>
    <div className="bg-white rounded-lg shadow-md p-8">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input 
            type="password" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  </div>
);

const NotFound = () => (
  <div className="text-center">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
    <p className="text-gray-600">The page you're looking for doesn't exist.</p>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    try {
      switch (currentPage) {
        case 'home':
          return <Home setCurrentPage={setCurrentPage} />;
        case 'products':
          return <Products />;
        case 'cart':
          return <Cart setCurrentPage={setCurrentPage} />;
        case 'login':
          return <Login />;
        default:
          return <NotFound />;
      }
    } catch (error) {
      console.error('Page render error:', error);
      return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderCurrentPage()}
        </main>
        <footer className="bg-white border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p>&copy; 2024 ElectroShop. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
