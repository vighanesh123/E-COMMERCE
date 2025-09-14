import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import api from '../services/api';

const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const { user, token, loading } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [forceReload, setForceReload] = useState(false);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();
  
  // Direct check for token in localStorage
  const hasValidToken = () => {
    const storedToken = localStorage.getItem('token');
    return !!storedToken;
  };
  
  useEffect(() => {
    // Check if token exists in localStorage
    const checkAuth = () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      console.log('ProtectedRoute - Auth check:', { 
        hasToken: !!storedToken, 
        hasUser: !!storedUser,
        contextUser: !!user,
        contextToken: !!token,
        authLoading: loading,
        tokenValue: storedToken ? `${storedToken.substring(0, 10)}...` : 'none',
        path: window.location.pathname
      });
      
      // If we have token and user in localStorage but not in context,
      // try to parse and set them directly
      if (storedToken && storedUser) {
        try {
          // Always ensure the token is set in API headers
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          console.log('ProtectedRoute - Set Authorization header:', api.defaults.headers.common['Authorization']);
          
          // If we have token in localStorage but not in context, force reload
          if (!user || !token) {
            console.log('ProtectedRoute - Found token in localStorage but no user in context');
            
            // Force a page reload to reinitialize auth context, but only once
            if (!forceReload) {
              setForceReload(true);
              console.log('ProtectedRoute - Forcing page reload to reinitialize auth');
              window.location.reload();
              return;
            }
          }
        } catch (error) {
          console.error('ProtectedRoute - Error handling stored auth data:', error);
          setAuthError('Error verifying authentication');
        }
      } else {
        // No token or user in localStorage
        console.log('ProtectedRoute - No valid auth data in localStorage, redirecting to', redirectTo);
      }
      
      setIsChecking(false);
    };
    
    // Only run the check if the auth context has finished loading
    if (!loading) {
      checkAuth();
    }
  }, [user, token, loading, forceReload, redirectTo]);
  
  // Show loading spinner while checking authentication
  if (loading || isChecking) {
    return <LoadingSpinner />;
  }
  
  // Redirect to login if no user is found
  if (!user) {
    console.log(`ProtectedRoute - No user found, redirecting to ${redirectTo}`);
    return <Navigate to={redirectTo} replace />;
  }
  
  return children;
};

export default ProtectedRoute;