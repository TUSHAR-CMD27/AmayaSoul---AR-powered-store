import React, { useState } from 'react';
import './CartSummary.css';
import { useNavigate } from 'react-router-dom';

function CartSummary({ itemCount, subtotal }) {
  const [promo, setPromo] = useState('');
  const shipping = subtotal > 1000 ? 0 : 50; // Free shipping over ₹1000
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const discount = promo === 'SAVE10' ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping + tax - discount;

  const nav = useNavigate();  

  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      <div className="cart-summary-row">
        <span>Items:</span>
        <span>{itemCount}</span>
      </div>
      <div className="cart-summary-row">
        <span>Subtotal:</span>
        <span>₹{subtotal}</span>
      </div>
      <div className="cart-summary-row">
        <span>Shipping:</span>
        <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
      </div>
      <div className="cart-summary-row">
        <span>Tax (5% GST):</span>
        <span>₹{tax}</span>
      </div>
      <div className="cart-summary-row">
        <span>Discount:</span>
        <span>-₹{discount}</span>
      </div>
      <div className="cart-summary-row cart-summary-total">
        <span>Total:</span>
        <span>₹{total}</span>
      </div>
      <input
        type="text"
        placeholder="Promo code"
        value={promo}
        onChange={e => setPromo(e.target.value)}
        className="cart-summary-promo"
      />
      <button className="cart-summary-btn" onClick={nav("/checkout")}>Checkout</button>
      <button className="cart-summary-btn secondary">Continue Shopping</button>
    </div>
  );
}

export default CartSummary;
