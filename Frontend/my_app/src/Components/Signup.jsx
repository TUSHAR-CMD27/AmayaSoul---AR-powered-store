import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "../config/firebase";

const Signup = () => {
  const nav = useNavigate();
  const [Formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    const loadCSS = async () => {
      if (isMobile) {
        await import("./signup-mobile.css");
      } else {
        await import("./Signup.css");
      }
    };
    loadCSS();

    return () => window.removeEventListener("resize", checkDevice);
  }, [isMobile]);

  const handleChange = (e) => {
    setFormdata({
      ...Formdata,
      [e.target.name]: e.target.value,
    });
  };

  // Toast helper (green + white theme, no pop animation)
  const showToast = (icon, title) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      background: "#ffffff", // white background
      color: "#1b5e20", // dark green text
      iconColor: "#2e7d32", // medium green icons
      customClass: {
        popup: "no-animation-toast",
      },
      didOpen: (toast) => {
        toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
        toast.style.border = "1px solid #2e7d32"; // green border
        toast.style.fontWeight = "500";
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Formdata.password.length <= 6) {
      showToast("warning", "Password must be greater than 6 characters ⚠️");
      return;
    }

    if (!Formdata.username || !Formdata.email || !Formdata.password) {
      showToast("error", "Please fill in all the fields ❌");
      return;
    }

    try {
      const res = await axios.post("https://amayasoul-ar-powered-handcrafted-store.onrender.com/signup", Formdata);
      console.log(res.data.message);

      showToast("success", "Signup Successful");
      setTimeout(() => nav("/login"), 1500);
    } catch (err) {
      console.log(err);
      showToast("error", "Signup Failed, Please try again");
    }

    setFormdata({
      username: "",
      email: "",
      password: "",
    });
  };

  // Firebase Google Signup
  const handleGoogleSignup = async () => {
    if (!isFirebaseConfigured) {
      showToast("error", "Firebase is not configured. Please set up Firebase credentials in .env file.");
      return;
    }

    if (!auth || !googleProvider) {
      showToast("error", "Firebase authentication is not available. Please check your configuration.");
      return;
    }

    try {
      showToast("info", "Signing up with Google...");
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      // User data is automatically set by AuthContext via onAuthStateChanged
      showToast("success", "Signup Successful 🎉");
      setTimeout(() => nav("/explore"), 1500);
    } catch (error) {
      console.error("Google signup error:", error);
      // Don't show error if user cancelled
      if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
        showToast("error", error.message || "Google signup failed 😢");
      }
    }
  };

  return (
    <div className="signup-container">
      {/* Left image section */}
      <div className="signup-image">
        <h1 className="image-text">KURTIS - 30% OFF🌲</h1>
      </div>

      {/* Right signup form section */}
      <div className="signup-form-wrapper">
        <div className="signup-card">
          <h2 className="signup-title">Create an account</h2>

          {/* Google login */}
          <button
            className="google-btn"
            onClick={handleGoogleSignup}
          >
            <FcGoogle size={20} style={{ marginRight: "8px" }} />
            Sign up with Google
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          {/* Signup form */}
          <form onSubmit={handleSubmit}>
            <input
              name="username"
              value={Formdata.username || ""}
              onChange={handleChange}
              type="text"
              placeholder="Full Name"
            />
            <input
              type="email"
              name="email"
              value={Formdata.email || ""}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={Formdata.password || ""}
              onChange={handleChange}
              placeholder="Password"
            />
            <button type="submit" className="submit-btn">
              Sign Up
            </button>
          </form>

          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
