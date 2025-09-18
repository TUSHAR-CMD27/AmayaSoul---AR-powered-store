import { BrowserRouter, Routes, Route } from "react-router-dom";
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

import { useState, useEffect } from "react";
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
           <Toaster position="top-center" reverseOrder={false} />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
