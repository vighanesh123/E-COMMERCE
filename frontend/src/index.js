import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

// Log environment for debugging
console.log('Environment:', process.env.NODE_ENV);
console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);

// Error boundary for the entire app
class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Root Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <p className="text-gray-700 mb-4">Please refresh the page or try again later.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Initialize the app
const container = document.getElementById('root');
const root = createRoot(container);

try {
  root.render(
    <React.StrictMode>
      <RootErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RootErrorBoundary>
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  
  // Fallback rendering in case of critical errors
  const fallbackRoot = document.createElement('div');
  fallbackRoot.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
      <h1 style="color: #dc2626; font-size: 24px; margin-bottom: 16px;">Application Error</h1>
      <p style="margin-bottom: 16px;">The application failed to load. Please refresh the page or contact support if the issue persists.</p>
      <button 
        onclick="window.location.reload()" 
        style="background: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;"
      >
        Refresh Page
      </button>
    </div>
  `;
  
  document.body.innerHTML = '';
  document.body.appendChild(fallbackRoot);
}