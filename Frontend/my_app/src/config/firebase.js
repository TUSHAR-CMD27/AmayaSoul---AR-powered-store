import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if Firebase is configured
const isFirebaseConfigured = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== 'undefined' &&
  firebaseConfig.authDomain && 
  firebaseConfig.authDomain !== 'undefined' &&
  firebaseConfig.projectId && 
  firebaseConfig.projectId !== 'undefined';

// Initialize Firebase only if configured
let app = null;
let auth = null;
let googleProvider = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
  } catch (error) {
    console.error('Firebase initialization error:', error);
    console.warn('⚠️ Firebase failed to initialize. Google login will not work until Firebase is properly configured.');
  }
} else {
  console.warn('⚠️ Firebase is not configured. Please set up your Firebase credentials in .env file.');
  console.warn('Required environment variables:');
  console.warn('  - VITE_FIREBASE_API_KEY');
  console.warn('  - VITE_FIREBASE_AUTH_DOMAIN');
  console.warn('  - VITE_FIREBASE_PROJECT_ID');
  console.warn('  - VITE_FIREBASE_STORAGE_BUCKET');
  console.warn('  - VITE_FIREBASE_MESSAGING_SENDER_ID');
  console.warn('  - VITE_FIREBASE_APP_ID');
}

export { auth, googleProvider, isFirebaseConfigured };
export default app;

