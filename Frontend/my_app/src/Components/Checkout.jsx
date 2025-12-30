import './Checkout.css';
import React, { useState, useEffect } from 'react';
import { useCart } from '../Components/CartContext';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

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

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signup');
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
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
      name: "AMAYA SOUL",
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
      theme: {
        color: "#000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="checkout-page-container">
      <div className="checkout-container">
        <h1>Checkout</h1>

        <div className="checkout-columns">
          {/* Left Column: Shipping & Payment */}
          <div className="shipping-payment-column">
            <div className="details-box">
              <h2>Shipping Details</h2>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
              <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="details-box">
              <h2>Payment Details</h2>
              <input type="text" name="cardName" placeholder="Name on Card" />
              <input type="text" name="cardNumber" placeholder="Card Number" />
              <div className="card-fields">
                <input type="text" name="cardExpiry" placeholder="Valid Thru" />
                <input type="text" name="cardCVC" placeholder="CVC Code" />
              </div>
              <button className="checkout-btn" onClick={handlePayment}>
                Pay ₹{subtotal}
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="order-summary-column">
            <div className="details-box">
              <h2>Your Order</h2>

              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul className="cart-list">
                  {cartItems.map((item) => (
                    <li key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} className="product-image" />
                      <div className="item-details">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">x{item.quantity}</span>
                      </div>
                      <span className="item-price">₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="summary-line">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span>₹0</span>
              </div>
              <div className="summary-line total-line">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
