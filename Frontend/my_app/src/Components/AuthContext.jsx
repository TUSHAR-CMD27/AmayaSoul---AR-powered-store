import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          photoURL: firebaseUser.photoURL,
          provider: firebaseUser.providerData[0]?.providerId || 'firebase'
        };
        setUser(userData);
        
        // Save to localStorage for persistence
        try {
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error('Error saving user to localStorage:', error);
        }
      } else {
        // User is signed out
        setUser(null);
        try {
          localStorage.removeItem('user');
        } catch (error) {
          console.error('Error removing user from localStorage:', error);
        }
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Login function (for email/password login - handled in Login component)
  const login = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Sign out from Firebase
      await firebaseSignOut(auth);
      
      // Also call backend logout if needed
      try {
        await fetch('https://amayasoul-ar-powered-handcrafted-store.onrender.com/logout', {
          method: 'GET',
          credentials: 'include'
        });
      } catch (error) {
        console.error('Backend logout error:', error);
      }
      
      // Clear local state
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if Firebase logout fails
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  // Check if user is logged in
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoggedIn,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}
