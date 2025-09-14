import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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

function App() {
  const location = useLocation();

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

  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <div className="min-h-screen bg-gray-50">
              {shouldShowNavbar && <Navbar />}
              <main>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/category/:category" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route path="/help" element={<Help />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute redirectTo="/login">
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-confirmation/:orderId"
                element={
                  <ProtectedRoute>
                    <OrderConfirmation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-success"
                element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                }
              />
            </Routes>
            </main>
            {shouldShowFooter && <Footer />}
            </div>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
