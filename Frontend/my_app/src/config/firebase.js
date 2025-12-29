import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
// You can either use environment variables (.env file) OR hardcode values directly here
// Option 1: Use environment variables (recommended for production)
// Option 2: Hardcode values directly below (replace the || '' with your actual values)

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBBOXdlzrnFpMHO83dcLXIQx_AwOZJn0xA', // Add your API key here if not using .env
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'amayasoul-52292.firebaseapp.com', // Add your auth domain here
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'amayasoul-52292', // Add your project ID here
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'amayasoul-52292.firebasestorage.app', // Add your storage bucket here
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '87471088708', // Add your sender ID here
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:87471088708:web:c0c6e9fd669fcf42edc811' // Add your app ID here
};

// Check if Firebase is configured (checking for actual values, not just truthy)
const isFirebaseConfigured = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== 'undefined' &&
  firebaseConfig.apiKey !== '' &&
  firebaseConfig.authDomain && 
  firebaseConfig.authDomain !== 'undefined' &&
  firebaseConfig.authDomain !== '' &&
  firebaseConfig.projectId && 
  firebaseConfig.projectId !== 'undefined' &&
  firebaseConfig.projectId !== '';

// Debug: Log configuration status (remove in production)
if (!isFirebaseConfigured) {
  console.log('🔍 Firebase Config Debug:', {
    apiKey: firebaseConfig.apiKey ? '✅ Set' : '❌ Missing',
    authDomain: firebaseConfig.authDomain ? '✅ Set' : '❌ Missing',
    projectId: firebaseConfig.projectId ? '✅ Set' : '❌ Missing',
    storageBucket: firebaseConfig.storageBucket ? '✅ Set' : '❌ Missing',
    messagingSenderId: firebaseConfig.messagingSenderId ? '✅ Set' : '❌ Missing',
    appId: firebaseConfig.appId ? '✅ Set' : '❌ Missing'
  });
}

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
    console.log('✅ Firebase initialized successfully!');
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    console.warn('⚠️ Firebase failed to initialize. Google login will not work until Firebase is properly configured.');
  }
} else {
  console.warn('⚠️ Firebase is not configured.');
  console.warn('📝 To fix this, you have two options:');
  console.warn('   1. Create a .env file in Frontend/my_app/ with your Firebase credentials');
  console.warn('   2. OR hardcode your credentials directly in this file (replace the || \'\' with your values)');
  console.warn('');
  console.warn('Required values:');
  console.warn('  - apiKey');
  console.warn('  - authDomain');
  console.warn('  - projectId');
  console.warn('  - storageBucket');
  console.warn('  - messagingSenderId');
  console.warn('  - appId');
}

export { auth, googleProvider, isFirebaseConfigured };
export default app;

