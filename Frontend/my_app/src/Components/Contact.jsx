import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Background image */}
      <div className="contact-background">
        <h1 className="contact-heading">Get in Touch</h1>
          <p className="form-subtitle">Your thoughts matter! Connect with us, share your feedback, or ask anything — we’re here to listen and respond with care</p>
      </div>

      {/* Translucent form card */}
      <div className="contact-form-wrapper">
        <div className="contact-card">
          <h2 className="form-title">Contact Us</h2>
        
          <form>
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email" />
            <textarea style={{fontFamily:"sans-serif"}} placeholder="Your Message"></textarea>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
          <p className="contact-info">
            Or email us directly at <a href="mailto:tushargadhari3@gmail.com">tushargadhari3@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
