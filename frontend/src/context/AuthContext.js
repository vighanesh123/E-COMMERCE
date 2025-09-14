import React, { createContext, useState, useContext, useEffect } from 'react';
import api, { API_BASE_URL } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      console.log('AuthContext - Initializing auth:', { 
        hasToken: !!savedToken, 
        hasUser: !!savedUser,
        tokenValue: savedToken ? `${savedToken.substring(0, 10)}...` : 'none'
      });

      if (savedToken && savedUser) {
        try {
          // Parse user data
          const userData = JSON.parse(savedUser);
          
          // Set token and user in state
          setToken(savedToken);
          setUser(userData);
          
          // Set default authorization header
          api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
          
          console.log('AuthContext - Auth initialized with token and user', {
            userId: userData.id,
            userEmail: userData.email,
            tokenStart: savedToken.substring(0, 10) + '...'
          });
          
          // Verify token is set in axios defaults
          console.log('Authorization header set:', api.defaults.headers.common['Authorization']);
        } catch (error) {
            console.error('AuthContext - Error parsing saved user:', error);
            console.error('Error details:', {
              message: error.message,
              stack: error.stack
            });
          // Clear invalid data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
          delete api.defaults.headers.common['Authorization'];
        }
      } else {
        console.log('AuthContext - No saved auth data found');
        // Ensure headers are cleared if no token
        delete api.defaults.headers.common['Authorization'];
        setToken(null);
        setUser(null);
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      console.log('AuthContext - Attempting login with:', { email, password: '***' });
      console.log('API base URL:', API_BASE_URL);
      
      // Test network connectivity
      try {
        const pingResponse = await fetch(API_BASE_URL, { method: 'GET' });
        console.log('Ping response status:', pingResponse.status);
      } catch (pingError) {
        console.error('Network connectivity test failed:', pingError);
        return {
          success: false,
          error: 'Network Error: Cannot connect to the server. Please check your internet connection.'
        };
      }
      
      const response = await api.post('/auth/signin', { email, password });
      console.log('AuthContext - Login response:', response.data);
      const { token: newToken, id, firstName, lastName, email: userEmail } = response.data;

      const userData = { id, firstName, lastName, email: userEmail };

      console.log('AuthContext - Login successful, received token and user data');
      
      // Store in localStorage
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      console.log('AuthContext - Saved token and user to localStorage');
      
      // Update context state
      setToken(newToken);
      setUser(userData);

      // Set default authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      console.log('AuthContext - Set Authorization header:', 
        `Bearer ${newToken.substring(0, 10)}...`);
      
      // Verify the token was set correctly
      setTimeout(() => {
        const currentHeader = api.defaults.headers.common['Authorization'];
        console.log('AuthContext - Verification: Authorization header is set:', 
          !!currentHeader, 
          currentHeader ? `${currentHeader.substring(0, 15)}...` : 'none');
      }, 100);

      return { success: true };
    } catch (error) {
      console.error('AuthContext - Login error:', error.response?.data || error.message);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
      let errorMessage = 'Login failed';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Network Error: Cannot connect to the server. Please check your internet connection.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage
      };
    }
  };

    const signup = async (userData) => {
    try {
      console.log('Attempting signup with:', { ...userData, password: '***' });
      const response = await api.post('/auth/signup', userData);
      console.log('Signup response:', response.data);
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Signup error:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
      let errorMessage = 'Signup failed';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        errorMessage = 'Invalid data provided';
      } else if (error.response?.status === 409) {
        errorMessage = 'Email already exists';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Remove authorization header
    delete api.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};