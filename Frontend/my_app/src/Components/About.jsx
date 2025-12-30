import React, { useEffect, useState, useRef } from "react";
import "./About.css"; // default desktop/tablet styles
import AOS from "aos";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeIn, staggerFadeIn } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

import img5 from "../assets/Products/5.jpg";
import img7 from "../assets/Products/new7.jpg";
import img8 from "../assets/Products/new3.jpg";
import img4 from "../assets/Products/new4.jpg";

export default function About() {
  const [isMobile, setIsMobile] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });

    // Detect screen width
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP Animations for About
  useEffect(() => {
    if (!aboutRef.current) return;

    const ctx = gsap.context(() => {
      const rows = aboutRef.current.querySelectorAll('.about-row');
      
      rows.forEach((row, index) => {
        ScrollTrigger.create({
          trigger: row,
          start: 'top 80%',
          animation: gsap.fromTo(
            row,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
          )
        });

        // Image and text stagger
        const image = row.querySelector('.about-image');
        const text = row.querySelector('.about-text');
        
        if (image) {
          gsap.fromTo(
            image,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.8, delay: 0.2, ease: 'power2.out' }
          );
        }
        
        if (text) {
          const textElements = text.querySelectorAll('h2, p');
          staggerFadeIn(textElements, 'up', 0.4, 0.2);
        }
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);



  return (
    <section id="abb" className="about-section" ref={aboutRef}>
      {/* Row 1 */}
      <div className="about-row">
        <div className="about-image">
          <img className="img1" src={img4} alt="Clay Pots" />
        </div>
        <div className="about-text">
          <h2>About Us</h2>
          <p>
            At <span className="highlight">Amaya Soul</span>, we’re blending{" "}
            <b>ancient Indian traditions</b> with <b>modern AR shopping</b>. Discover handcrafted <b>clay pots</b>, nourishing <b>herbal facewashes</b>, soothing <b>natural soaps</b>, and more — all rooted in wellness, sustainability, and culture.
          </p>
        </div>
      </div>

      {/* Row 2 */}
      <div className="about-row reverse">
        <div className="about-image">
          <img className="img2" src={img8} alt="Soap" />
        </div>
        <div className="about-text">
          <h2>Why Trust Us?</h2>
          <p>
            Every product we offer is carefully <b>sourced from trusted artisans</b> who use natural, authentic methods. No chemicals, no shortcuts — only the purity of <b>traditional Indian wellness</b>.
          </p>
        </div>
      </div>

      {/* Row 3 */}
      <div className="about-row">
        <div className="about-image">
          <img className="img3" src={img7} alt="Facewash" />
        </div>
        <div className="about-text">
          <h2>Empowering Local Artisans</h2>
          <p>
            We partner directly with <b>local artisans and small communities</b>, giving them a digital platform to share their craft. By shopping with us, you’re not just buying products — you’re <b>supporting families, preserving traditions, and helping rural India grow</b>.
          </p>
        </div>
      </div>

      {/* Row 4 */}
      <div className="about-row reverse">
        <div className="about-image">
          <img className="img4" src={img5} alt="Herbal Oils" />
        </div>
        <div className="about-text">
          <h2>Natural & Sustainable</h2>
          <p>
            From herbal oils to handmade skincare, every product is <b>eco-friendly, cruelty-free</b>, and made to bring you closer to nature — while respecting Mother Earth 🌱.
          </p>
        </div>
      </div>
    </section>
  );
}
