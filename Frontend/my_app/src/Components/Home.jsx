import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Product3DViewer from '../Components/Product3DViewer';

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

  return (<>
    <section id="home" className="home-section">
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
            <h1 className='happy'>ANAYA</h1>
            <h1 className='happy2'>SOUL</h1>
            <h2 className='para'>The AR - Virtual Handcrafted Bazaar</h2>
          </>
        )}
        <div className="description">
          <h2>TRY BEFORE YOU BUY — IN YOUR SPACE.</h2>
          <h2>SEE IT. SPIN IT. SHOP IT.</h2>
          </div>
        <div className='btn'>
          <Link to='/login'>
            <button className='btn1'>START SHOPPING</button>
          </Link>
        </div>
      </div>

      {/* 3D Product Viewer Section */}
     
    </section>
     <div className="home-3d-products">
        <h2>Featured 3D Product</h2>
        <h1>6ft Palm Plant- by THE PLANTIES</h1>
        <p>Bring instant tropical vibes home with THE PLANTIES’ lush 6ft Palm Plant — your statement piece for fresh, green energy.</p>
        <Product3DViewer
          modelSrc="/models/Plant/scene.gltf"
          altText="Plant 3D Model"
        />
      </div>
    </>
  );
}