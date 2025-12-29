import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import { gsap } from 'gsap';
import { slideIn, fadeIn, hoverScale } from '../utils/animations';

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const { cartItems, subtotal, updateQuantity, removeFromCart } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const cartDrawerRef = useRef(null);

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

  // GSAP Animations for Navbar - Very subtle, opacity only
  useEffect(() => {
    if (!navbarRef.current || isMobile) return; // Skip animations on mobile

    const ctx = gsap.context(() => {
      // Only subtle fade for logo - no transforms
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, delay: 0.1, ease: 'power2.out' }
        );
      }

      // Subtle nav links fade - only on desktop, no transforms
      if (menuRef.current) {
        const links = menuRef.current.querySelectorAll('.navbar-link, .navbar-cart-btn');
        gsap.fromTo(
          links,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            stagger: 0.03,
            delay: 0.15,
            ease: 'power2.out'
          }
        );

        // Hover animations - only scale, preserve layout
        links.forEach(link => {
          const handleEnter = () => {
            gsap.to(link, { scale: 1.05, duration: 0.2, ease: 'power2.out' });
          };
          const handleLeave = () => {
            gsap.to(link, { scale: 1, duration: 0.2, ease: 'power2.out' });
          };
          link.addEventListener('mouseenter', handleEnter);
          link.addEventListener('mouseleave', handleLeave);
        });
      }
    }, navbarRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Cart drawer animation
  useEffect(() => {
    if (cartOpen && cartDrawerRef.current) {
      const drawer = cartDrawerRef.current.querySelector('.cart-drawer');
      if (drawer) {
        gsap.fromTo(
          drawer,
          { x: '100%' },
          { x: 0, duration: 0.4, ease: 'power3.out' }
        );
      }
    }
  }, [cartOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar" ref={navbarRef}>
        {/* Logo */}
        <div className="navbar-logo" ref={logoRef}>
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
        <ul className={`navbar-list ${menuOpen ? "active" : ""}`} ref={menuRef}>
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
        <div className="cart-drawer-overlay" onClick={() => setCartOpen(false)} ref={cartDrawerRef}>
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
