import React from 'react';
import './CartItem.css';
import { useCart } from './CartContext';

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  // Handle quantity change
  const handleQuantity = (type) => {
    if (type === 'inc' && (!item.stock || item.quantity < item.stock)) {
      updateQuantity(item.id, item.quantity + 1);
    }
    if (type === 'dec' && item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-img" />
      <div className="cart-item-details">
        <div className="cart-item-name">{item.name}</div>
        <div className="cart-item-desc">{item.description}</div>
        <div className="cart-item-price">₹{item.price}</div>
        <div className="cart-item-qty">
          <button onClick={() => handleQuantity('dec')}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => handleQuantity('inc')}>+</button>
        </div>
        <div className="cart-item-subtotal">Subtotal: ₹{item.price * item.quantity}</div>
        <button 
          className="cart-item-remove" 
          title="Remove from cart"
          onClick={() => removeFromCart(item.id)}
        >🗑️</button>
        {item.stock <= 2 && <div className="cart-item-stock-warning">Only {item.stock} left in stock!</div>}
      </div>
    </div>
  );
}

export default CartItem;
