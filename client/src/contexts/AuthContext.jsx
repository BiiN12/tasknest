import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api.js';

// Create the context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Current user data
  const [loading, setLoading] = useState(true);  // Loading state
  const navigate = useNavigate();

  // Check if user is logged in when app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    
    setLoading(false);
  }, []);

  // Register function
  const register = async (userData) => {
    try {
      const response = await api.register(userData);
      
      // Save token and user to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Update state
      setUser(response.data.user);
      
      // Redirect to todos
      navigate('/todos');
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, error: message };
    }
  };

  // Login function
  const login = async (userData) => {
    try {
      const response = await api.login(userData);
      
      // Save token and user to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Update state
      setUser(response.data.user);
      
      // Redirect to todos
      navigate('/todos');
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, error: message };
    }
  };

  // Logout function
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear state
    setUser(null);
    
    // Redirect to login
    navigate('/login');
  };

  // Values available to all components
  const value = {
    user,        // Current user object
    loading,     // Is auth state loading?
    register,    // Register function
    login,       // Login function
    logout,      // Logout function
    isAuthenticated: !!user  // Boolean: is user logged in?
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};