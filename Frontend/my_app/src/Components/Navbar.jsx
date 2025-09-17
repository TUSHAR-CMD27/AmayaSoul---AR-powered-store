import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const { cartItems, subtotal, updateQuantity, removeFromCart } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Load CSS dynamically
  useEffect(() => {
    const loadCSS = async () => {
      if (isMobile) {
        await import("./Navbar-mobile.css");
      } else {
        await import("./Navbar.css");
      }
    };
    loadCSS();
  }, [isMobile]);

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar-logo">
          <Link className="navbar-logo-link" to="/" onClick={closeMobileMenu}>
            🌲 AnayaSoul
          </Link>
        </div>

        {/* Hamburger Button */}
        {isMobile && (
          <button
            className={`navbar-hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}

        {/* Overlay */}
        {menuOpen && (
          <div className="navbar-overlay" onClick={closeMobileMenu}></div>
        )}

        {/* Nav Links */}
        <ul className={`navbar-list ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" className="navbar-link" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/explore" className="navbar-link" onClick={closeMobileMenu}>
              Explore
            </Link>
          </li>
          <li>
            <HashLink
              smooth
              to="/#abb"
              className="navbar-link"
              onClick={closeMobileMenu}
            >
              About
            </HashLink>
          </li>
          <li>
            <Link to="/armodel" className="navbar-link" onClick={closeMobileMenu}>
            3D AR products 🆕
            </Link>
          </li>
          <li>
            <Link to="/contact" className="navbar-link" onClick={closeMobileMenu}>
              Contact
            </Link>
          </li>

          {/* Cart Icon */}
          <li className="navbar-cart-icon-wrapper">
            <button
              className="navbar-cart-btn"
              onClick={() => setCartOpen(true)}
            >
              🛒
              {cartItems.length > 0 && (
                <span className="navbar-cart-count">{cartItems.length}</span>
              )}
            </button>
          </li>

          {/* Auth */}
          {isLoggedIn ? (
            <>
              <li className="navbar-welcome">
                <span className="navbar-welcome-text">
                  Hello, {user.username || user.email?.split("@")[0] || "User"}!
                </span>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="navbar-link navbar-logout"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="navbar-link"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="navbar-link navbar-signup"
                  onClick={closeMobileMenu}
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="cart-drawer-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-drawer-header">
              Your Cart
              <button
                className="cart-drawer-close"
                onClick={() => setCartOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="cart-drawer-items">
              {cartItems.length === 0 ? (
                <div className="cart-drawer-empty">Your cart is empty</div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-drawer-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-drawer-item-img"
                    />
                    <div className="cart-drawer-item-info">
                      <div className="cart-drawer-item-name">{item.name}</div>
                      <div className="cart-drawer-item-price">₹{item.price}</div>
                      <div className="cart-drawer-item-qty">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <div className="cart-drawer-item-subtotal">
                        ₹{item.price * item.quantity}
                      </div>
                      <button
                        className="cart-drawer-item-remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="cart-drawer-footer">
              <div className="cart-drawer-total">₹{subtotal}</div>
              <Link to="/checkout" className="cart-drawer-checkout">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
