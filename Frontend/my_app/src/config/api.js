const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

// CRITICAL: Set VITE_BACKEND_URL in your Render/Vercel Dashboard to your actual Backend URL
// Example: https://amayasoul-backend.onrender.com
export const API_URL = isLocal 
  ? "http://localhost:5000" 
  : (import.meta.env.VITE_BACKEND_URL || "YOUR_BACKEND_URL_NOT_SET");

console.log("Derived API_URL:", API_URL); 
if (API_URL.includes("YOUR_BACKEND_URL")) {
  console.error("CRITICAL: VITE_BACKEND_URL is missing. API calls will fail.");
}
