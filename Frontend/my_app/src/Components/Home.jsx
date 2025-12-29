import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Product3DViewer from '../Components/Product3DViewer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeIn, textReveal, scaleIn, staggerFadeIn } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

import img5 from '../assets/Products/5.jpg';
import img6 from '../assets/Products/6.png';
import img3 from '../assets/Products/3.jpg';
import img4 from '../assets/Products/4.jpg';

const images = [
  img5,
  img6,
  img3,
  img4
];

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const productSectionRef = useRef(null);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkDevice();

    // Add event listener for resize
    window.addEventListener('resize', checkDevice);

    // Cleanup
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    // Dynamically import CSS based on device type
    const loadCSS = async () => {
      if (isMobile) {
        await import('./Home-mobile.css');
      } else {
        await import('./Home.css');
      }
    };

    loadCSS();
  }, [isMobile]);

  // GSAP Animations - Simplified to not break layout
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Hero section animations - subtle fade only
      if (isMobile) {
        // Mobile animations - just fade in
        const mobileTitle = heroRef.current.querySelector('.mobile-anayasoul');
        const mobileSubtitle = heroRef.current.querySelector('.mobile-subtitle');
        
        if (mobileTitle) {
          gsap.fromTo(mobileTitle, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.2, ease: 'power2.out' });
        }
        if (mobileSubtitle) {
          gsap.fromTo(mobileSubtitle, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.4, ease: 'power2.out' });
        }
      } else {
        // Desktop animations - subtle fade
        if (title1Ref.current) {
          gsap.fromTo(title1Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.2, ease: 'power2.out' });
        }
        if (title2Ref.current) {
          gsap.fromTo(title2Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.4, ease: 'power2.out' });
        }
        if (subtitleRef.current) {
          gsap.fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.6, ease: 'power2.out' });
        }
      }

      // Description and button animations - fade only
      if (descriptionRef.current) {
        const descriptionItems = descriptionRef.current.querySelectorAll('h2');
        gsap.fromTo(
          descriptionItems,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, stagger: 0.2, delay: 0.8, ease: 'power2.out' }
        );
      }
      
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, delay: 1.2, ease: 'power2.out' }
        );
      }

      // Product section scroll animation - only when scrolling
      if (productSectionRef.current) {
        ScrollTrigger.create({
          trigger: productSectionRef.current,
          start: 'top 85%',
          animation: gsap.fromTo(
            productSectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: 'power2.out' }
          )
        });
      }
    }, heroRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars?.trigger === productSectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [isMobile]);

  return (<>
    <section id="home" className="home-section" ref={heroRef}>
      <div className="home-hero">
        {/* Mobile-specific content */}
        {isMobile && (
          <>
            <h1 className='mobile-anayasoul'>ANAYASOUL</h1>
            <p className='mobile-subtitle'>The AR - Virtual Handcrafted Bazaar</p>
          </>
        )}
        
        {/* Desktop-specific content */}
        {!isMobile && (
          <>
            <h1 className='happy' ref={title1Ref}>ANAYA</h1>
            <h1 className='happy2' ref={title2Ref}>SOUL</h1>
            <h2 className='para' ref={subtitleRef}>The AR - Virtual Handcrafted Bazaar</h2>
          </>
        )}
        <div className="description" ref={descriptionRef}>
          <h2>TRY BEFORE YOU BUY — IN YOUR SPACE.</h2>
          <h2>SEE IT. SPIN IT. SHOP IT.</h2>
          </div>
        <div className='btn' ref={buttonRef}>
          <Link to='/login'>
            <button className='btn1'>START SHOPPING</button>
          </Link>
        </div>
      </div>

      {/* 3D Product Viewer Section */}
     
    </section>
     <div className="home-3d-products" ref={productSectionRef}>
        <h2>Featured 3D Product</h2>
        <h1>6ft Palm Plant- by THE PLANTIES</h1>
        <p>Bring instant tropical vibes home with THE PLANTIES' lush 6ft Palm Plant — your statement piece for fresh, green energy.</p>
        <Product3DViewer
          modelSrc="/models/Plant/scene.gltf"
          altText="Plant 3D Model"
        />
      </div>
    </>
  );
}