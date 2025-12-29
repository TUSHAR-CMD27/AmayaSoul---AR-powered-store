import React, { useState, useEffect, useRef } from "react";
// We no longer import Login.css directly here
import img2 from "../assets/Products/2.jpg";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Swal from "sweetalert2";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "../config/firebase";
import { gsap } from 'gsap';
import { slideIn, fadeIn, scaleIn } from '../utils/animations';

const Login = () => {
  const nav = useNavigate();
  const { login } = useAuth();
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const loginRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    const loadCSS = async () => {
      if (isMobile) {
        await import("./login-mobile.css");
      } else {
        await import("./Login.css");
      }
    };
    loadCSS();

    return () => window.removeEventListener("resize", checkDevice);
  }, [isMobile]);

  // GSAP Animations for Login
  useEffect(() => {
    if (!loginRef.current) return;

    const ctx = gsap.context(() => {
      // Left section slide in
      if (leftSectionRef.current) {
        slideIn(leftSectionRef.current, 'left', 0.2);
      }

      // Right section slide in
      if (rightSectionRef.current) {
        slideIn(rightSectionRef.current, 'right', 0.4);
        
        // Form elements stagger
        const formElements = rightSectionRef.current.querySelectorAll('input, button');
        gsap.fromTo(
          formElements,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.6, ease: 'power2.out' }
        );
      }
    }, loginRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  };

  // Toast helper (same green-white theme as Signup)
  const showToast = (icon, title) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      background: "#ffffff", // white
      color: "#1b5e20", // dark green text
      iconColor: "#2e7d32", // medium green icon
      customClass: {
        popup: "no-animation-toast",
      },
      didOpen: (toast) => {
        toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
        toast.style.border = "1px solid #2e7d32";
        toast.style.fontWeight = "500";
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!FormData.email || !FormData.password) {
      showToast("error", "Please fill in all fields ❌");
      return;
    }

    axios
      .post("https://amayasoul-ar-powered-handcrafted-store.onrender.com/login", FormData)
      .then((res) => {
        console.log(res.data.message);

        const userData = {
          email: FormData.email,
          username: FormData.email.split("@")[0],
          id: Date.now(),
        };
        login(userData);

        showToast("success", "Login Successful 🎉");
        setTimeout(() => nav("/explore"), 1500);
      })
      .catch((err) => {
        console.log(err);
        showToast("error", err.response?.data?.message || "Login failed 😢");
      });
  };

  // Firebase Google Login
  const handleGoogleLogin = async () => {
    if (!isFirebaseConfigured) {
      showToast("error", "Firebase is not configured. Please set up Firebase credentials in .env file.");
      return;
    }

    if (!auth || !googleProvider) {
      showToast("error", "Firebase authentication is not available. Please check your configuration.");
      return;
    }

    try {
      showToast("info", "Signing in with Google...");
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      // User data is automatically set by AuthContext via onAuthStateChanged
      showToast("success", "Login Successful 🎉");
      setTimeout(() => nav("/explore"), 1500);
    } catch (error) {
      console.error("Google login error:", error);
      // Don't show error if user cancelled
      if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
        showToast("error", error.message || "Google login failed 😢");
      }
    }
  };

  return (
    <div className="login-page-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: isMobile ? '60px' : '9vh', paddingBottom: '2rem' }}>
      <div className="main-card" ref={loginRef}>
      {/* Left Section */}
      <div className="left-section" style={{ backgroundImage: `url(${img2})` }} ref={leftSectionRef}>
        <div className="overlay"></div>
        <div className="logo" style={{ color: "darkgreen" }}>
          AKC CERAMICS
        </div>
        <div className="image-text-content">
          <h1 className="tt">CERAMIC POTS - ₹99</h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section" ref={rightSectionRef}>
        <div className="form-heading">
          <h1>Log into your account</h1>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="form-link-button">
              Sign up
            </Link>
          </p>
        </div>

        <form className="form-container" onSubmit={handleSubmit}>
          <input
            id="email"
            type="email"
            name="email"
            value={FormData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={FormData.password}
            onChange={handleChange}
          />

          <div className="form-link-button-purple">
            <Link
              to="/forgot-password"
              style={{ color: "white", textDecoration: "none" }}
            >
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="submit-button">
            Log In
          </button>
        </form>

        {/* Divider + Social Login */}
        <OrDivider />
        <div className="social-buttons-container">
          <button
            className="google-btn"
            style={{ border: "1px solid #000000ff" }}
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={20} style={{ marginRight: "8px" }} />
            Continue with Google
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

// Divider
const OrDivider = () => (
  <div className="or-divider">
    <span>OR</span>
  </div>
);

export default Login;
