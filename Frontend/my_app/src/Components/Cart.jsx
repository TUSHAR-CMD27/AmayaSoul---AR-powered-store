import React from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { useCart } from './CartContext';
import './Cart.css';

function Cart() {
  const { cartItems, subtotal } = useCart();

  return (
    <div className="cart-main">
      <div className="cart-items-section">
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CartSummary
        itemCount={cartItems.length}
        subtotal={subtotal}
      />
    </div>
  );
}

export default Cart;