// src/Components/Homemobile.jsx
import React from "react";
import "./Home-mobile-new.css"; // import the custom CSS file
import { Link } from "react-router-dom";

export default function Homemobile() {
  return (
    <div className="homemobile-container">

      {/* Hero Section */}
      <main className="hero">
        <div className="hero-box">
          <h2 className="hero-title">
            Discover <span className="highlight">AUTHENTIC</span> Indian
            Heritage
          </h2>
          <p className="hero-text">
            Experience the richness of traditional Indian craftsmanship with our
            curated collection of authentic products. Now with AR technology.
          </p>

          {/* Buttons */}
          <div className="hero-buttons">
           <Link to="/explore" className="btn-primary"><button className="btn-primary">Explore Products</button></Link>

            <Link to="/explore3d" className="btn-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="btn-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.575 3.01 9.963 7.182.02.062.02.126 0 .188A10.01 10.01 0 0112 19.5c-4.638 0-8.575-3.01-9.963-7.182z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Try AR View
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="stat-box">
            <h3>500+</h3>
            <p>Products</p>
          </div>
          <div className="stat-box">
            <h3>100%</h3>
            <p>Authentic</p>
          </div>
          <div className="stat-box">
            <h3>AR</h3>
            <p>Experience</p>
          </div>
          <div className="stat-box">
            <h3>24/7</h3>
            <p>Support</p>
          </div>
        </div>
      </main>
    </div>
  );
}