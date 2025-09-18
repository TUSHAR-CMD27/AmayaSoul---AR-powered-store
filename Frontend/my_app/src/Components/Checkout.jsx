import './Checkout.css';
import React, { useState, useEffect } from 'react';
import { useCart } from '../Components/CartContext';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Checkout() {
  const { cartItems, clearCart, subtotal } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  // ✅ Guard route: redirect if not logged in
useEffect(() => {
  if (!isLoggedIn) {
    toast.warning("Log in to continue shopping", {
      toastId: "login-warning", // prevents duplicate toasts
    });
    navigate("/signup");
  }
}, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.email || !formData.address || !formData.phone) {
      alert("Please fill in all details!");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    const options = {
      key: "rzp_test_RIkvVdg7DK7DML",
      amount: subtotal * 100,
      currency: "INR",
      name: "ANAYA SOUL",
      description: "Checkout Payment",
      handler: function (response) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
        clearCart();
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: "#000" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ✅ Prevent rendering if not logged in (UI won’t flash)
  if (!isLoggedIn) return null;

  return (
    <div className="checkout-page-container">
      {/* ... your existing checkout UI ... */}
    </div>
  );
}
