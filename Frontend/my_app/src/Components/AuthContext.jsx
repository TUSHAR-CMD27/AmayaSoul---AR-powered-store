import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Load user from localStorage on component mount, or null if not logged in
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      return null;
    }
  });

  // Check for Google OAuth user data in URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get('user');
    
    console.log('Checking URL params:', { userParam, currentUser: user, url: window.location.href });
    
    if (userParam && !user) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam));
        console.log('Google login successful from URL:', userData);
        setUser(userData);
        
        // Clean up URL by removing the user parameter
        const newUrl = new URL(window.location);
        newUrl.searchParams.delete('user');
        window.history.replaceState({}, '', newUrl);
        console.log('URL cleaned up, user set:', userData);
      } catch (error) {
        console.error('Error parsing user data from URL:', error);
      }
    }
  }, [user]);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  }, [user]);

  // Login function
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function
  const logout = async () => {
    try {
      // Call backend logout to clear session
      await fetch('https://amayasoul-ar-powered-handcrafted-store.onrender.com//logout', {
        method: 'GET',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear frontend state
      setUser(null);
    }
  };

  // Check if user is logged in
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoggedIn
    }}>
      {children}
    </AuthContext.Provider>
  );
}
