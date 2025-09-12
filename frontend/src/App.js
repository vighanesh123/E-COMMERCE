import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Help from './pages/Help';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderSuccess from './pages/OrderSuccess';
import ProtectedRoute from './components/ProtectedRoute';

// Add error boundary for routes
class RouteErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Route Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Page Error</h2>
            <p className="text-gray-700 mb-4">Sorry, there was a problem loading this page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading component for Suspense
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  // Log app initialization
  console.log('App initializing...');
  
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <Suspense fallback={<LoadingFallback />}>
                <AppContent />
              </Suspense>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Log route changes for debugging
  React.useEffect(() => {
    console.log('Route changed to:', location.pathname);
  }, [location]);

  // Show Navbar on specific routes
  const shouldShowNavbar =
    location.pathname === '/' || 
    location.pathname.startsWith('/products') ||
    location.pathname === '/cart' ||
    location.pathname === '/profile' ||
    location.pathname === '/orders' ||
    location.pathname === '/help' ||
    location.pathname === '/checkout';

  // Show Footer only on home page
  const shouldShowFooter = location.pathname === '/';

  // Handle navigation errors
  const handleNavigationError = (error) => {
    console.error('Navigation error:', error);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {shouldShowNavbar && <Navbar />}
      <main className="pt-16">
        <Suspense fallback={<LoadingFallback />}>
          <Routes onError={handleNavigationError}>
            <Route path="/" element={
              <RouteErrorBoundary>
                <Home />
              </RouteErrorBoundary>
            } />
            <Route path="/products" element={
              <RouteErrorBoundary>
                <Products />
              </RouteErrorBoundary>
            } />
            <Route path="/products/category/:category" element={
              <RouteErrorBoundary>
                <Products />
              </RouteErrorBoundary>
            } />
            <Route path="/products/:id" element={
              <RouteErrorBoundary>
                <ProductDetail />
              </RouteErrorBoundary>
            } />
            <Route path="/login" element={
              <RouteErrorBoundary>
                <Login />
              </RouteErrorBoundary>
            } />
            <Route path="/signup" element={
              <RouteErrorBoundary>
                <Signup />
              </RouteErrorBoundary>
            } />
            <Route
              path="/cart"
              element={
                <RouteErrorBoundary>
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                </RouteErrorBoundary>
              }
            />
            <Route
              path="/profile"
              element={
                <RouteErrorBoundary>
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                </RouteErrorBoundary>
              }
            />
            <Route
              path="/orders"
              element={
                <RouteErrorBoundary>
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                </RouteErrorBoundary>
              }
            />
            <Route path="/help" element={
              <RouteErrorBoundary>
                <Help />
              </RouteErrorBoundary>
            } />
            <Route
              path="/checkout"
              element={
                <RouteErrorBoundary>
                  <ProtectedRoute redirectTo="/login">
                    <Checkout />
                  </ProtectedRoute>
                </RouteErrorBoundary>
              }
            />
            <Route
              path="/order-confirmation/:orderId"
              element={
                <RouteErrorBoundary>
                  <ProtectedRoute>
                    <OrderConfirmation />
                  </ProtectedRoute>
                </RouteErrorBoundary>
              }
            />
            <Route
              path="/order-success"
              element={
                <RouteErrorBoundary>
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                </RouteErrorBoundary>
              }
            />
          </Routes>
        </Suspense>
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
}

export default App;
