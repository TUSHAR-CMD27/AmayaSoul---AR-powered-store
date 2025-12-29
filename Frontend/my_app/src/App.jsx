import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import About from "./Components/About";
import Signup from "./Components/Signup";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Explore from "./Components/Explore";
import Explore3D from "./Components/Explore3d"; // ✅ new import
import AdminLogin from "./Components/AdminLogin";
import Checkout from "./Components/Checkout";
import Homemobile from "./Components/Home-mobile";
import AddProduct from "./Components/AddProduct";
import AdminDashboard from "./Components/AdminDashboard";
import Cart from "./Components/Cart";
import { CartProvider } from "./Components/CartContext";
import { AuthProvider } from "./Components/AuthContext";
import { Toaster } from "react-hot-toast";  
import { gsap } from 'gsap';
import { pageTransition } from './utils/animations';

import { useState, useEffect, useRef } from "react";
// Page transition wrapper component
function PageTransition({ children }) {
  const location = useLocation();
  const pageRef = useRef(null);

  useEffect(() => {
    if (pageRef.current) {
      // Fade in on route change
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [location.pathname]);

  return <div ref={pageRef}>{children}</div>;
}

function App() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkDevice = ()=>{
      setIsMobile(window.innerWidth < 768);
    }
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
 


  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
            <Navbar />
            <PageTransition>
              <Routes>
            <Route
              path="/"
              element={
                <>
                {
                  isMobile ? <Homemobile/> : <Home/>
                }
                   <About /> <Explore />
                  <Explore3D/>
                  <Contact />
                  <Footer />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/explore3d" element={<Explore3D />} /> {/* ✅ new route */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/armodel" element={<Explore3D />} />
            <Route path="/checkout" element={<Checkout />} />
        
            </Routes>

          </PageTransition>
          <Toaster
              position="bottom-left"
              reverseOrder={false}
              containerStyle={{
                top: 'auto',
                bottom: 40,
                left: 20,
                zIndex: 99999,
              }}
              toastOptions={{
                className: '',
                style: {
                  background: 'rgba(10, 10, 10, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(88, 129, 87, 0.3)',
                  color: '#e0f6ec',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  animation: 'toastEnter 0.4s ease forwards',
                },
                success: {
                  iconTheme: {
                    primary: '#588157',
                    secondary: '#fff',
                  },
                },
              }}
            />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
