import React, { useState, useEffect, useRef } from "react";
import "./Explore.css";
import { API_URL } from "../config/api";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { staggerFadeIn, fadeIn, scaleIn } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);
import kurtaImg from "../assets/Products/kurta.jpg";
import img6 from "../assets/Products/6.jpg";
import img7 from "../assets/Products/7.jpg";
import img8 from "../assets/Products/8.jpg";
import img9 from "../assets/Products/9.jpg";
import img10 from "../assets/Products/10.jpg";
import img11 from "../assets/Products/11.jpg";
import img12 from "../assets/Products/12.jpg";
import img13 from "../assets/Products/13.jpg";
import img14 from "../assets/Products/14.jpg";
import img15 from "../assets/Products/15.jpg";
import img16 from "../assets/Products/16.jpg";
import img17 from "../assets/Products/17.jpg";
import img3 from "../assets/Products/3.jpg";
import img4 from "../assets/Products/4.jpg";
import img5 from "../assets/Products/5.jpg";
import { useCart } from "./CartContext";
import Swal from "sweetalert2"

// Dummy categories
const categories = ["All", "Clothing", "Jewelry", "Decor", "Accessories"];


const dummyProducts = [
  { id: 1, name: "Handcrafted Kurtis", category: "Clothing", price: 1200, img: kurtaImg, desc: "A beautiful handcrafted kurta with traditional embroidery." },
  { id: 2, name: "Emerald Glow Face Serum - Ayurvedic Radiance Elixir", category: "Cosmetic", price: 800, img: img6, desc: "Infused with ancient Ayurvedic wisdom, this luxurious emerald-hued serum combines 100mg CBD with powerful adaptogens to deliver deep moisture and luminous glow. Like the precious emeralds adorning Maharani's crown, this botanical elixir illuminates your skin with nature's most potent healing herbs, creating an ethereal radiance worthy of royalty." },
  { id: 3, name: "Vrindavan Prosperity Planter - Royal Wave Collection", category: "Decor", price: 500, img: img3, desc: "Inspired by the sacred groves of Vrindavan, this exquisite charcoal planter features mesmerizing wave patterns reminiscent of the Ganges' eternal flow. The sophisticated ridged design symbolizes life's continuous journey, making it a perfect sanctuary for your beloved green companions. Elevate your sacred space with this meditation on nature's divine geometry.." },
  { id: 4, name: "Chandrika Hair Masque", category: "cosmetics", price: 300, img: img4, desc: "Transform your tresses with this opulent hair treatment, named after the moon goddess Chandrika. This luxurious masque delivers intensive nourishment, leaving your hair as silky and lustrous as the finest Banarasi silk. Embrace the ancient beauty rituals of Indian royalty with this deeply restorative treatment that crowns you with naturally magnificent hair.." },
  { id: 5, name: "Vanaspati Mist - Sacred Forest Essence", category: "Clothing", price: 600, img: img5, desc: "Captured within this frosted glass vessel lies the pure essence of India's sacred forests. This eco-luxury mist, presented with a noble wooden crown, embodies the tranquil spirit of ancient ashrams. Each spray delivers nature's pristine energy, connecting you to the timeless wisdom of India's mystical woodlands.." },
  { id: 6, name: "Ayurveda Alchemist Collection ", category: "Accessories", price: 950, img: img7, desc: "Curate your own royal wellness sanctuary with this magnificent collection of traditional implements. Featuring a handcrafted mortar and pestle, sacred brass vessels, and vintage botanical references, this set honors the ancient art of Ayurvedic preparation. Transform your space into a palace of healing, where every ritual becomes a ceremony of self-care fit for royalty.." },
  { id: 7, name: "Modern Sandalwood Fragnance Set", category: "Decor", price: 1500, img: img8, desc: "Contemporary wall art for a stylish home." },
  { id: 8, name: "Ethnico Hair Serum", category: "Accessories", price: 700, img: img9, desc: "Hand-painted ethnic pottery for your living room." },
  { id: 9, name: "YUNJAC Plat based Moisturizer", category: "Accessories", price: 1200, img: img10, desc: "Elegant pearl pendant for special occasions." },
  { id: 10, name: "PearlyEyes Sunscreen", category: "Accessories", price: 400, img: img11, desc: "Soft designer scarf with unique patterns." },
  { id: 11, name: "Nuebiome lotion", category: "Accessories", price: 2000, img: img12, desc: "Vintage-style clock to add character to your space." },
  { id: 12, name: "Gemstone RingEarth Set", category: "Decor", price: 1800, img: img13, desc: "Sparkling gemstone ring for a touch of luxury." },
  { id: 13, name: "HandBasket Body Oils", category: "Accessories", price: 350, img: img14, desc: "Eco-friendly handwoven basket for storage or decor." },
  { id: 14, name: "StreeDhan Incense Oils", category: "Accessories", price: 650, img: img15, desc: "Trendy sunglasses to elevate your style." },
  { id: 15, name: "Artisan Mug", category: "Decor", price: 250, img: img16, desc: "Handcrafted mug for your favorite beverages." },
  { id: 16, name: "Lealet Seedberries set", category: "Accessories", price: 900, img: img17, desc: "Premium leather wallet with multiple compartments." },
];

export default function Explore() {
  const [products, setProducts] = useState(dummyProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState({ open: false, product: null });
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { addToCart } = useCart();
  const exploreRef = useRef(null);
  const titleRef = useRef(null);
  const searchRef = useRef(null);
  const categoriesRef = useRef(null);
  const gridRef = useRef(null);

  const showToast = (title = "Added to cart!", icon = "success") => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon,
    title,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    background: "#ffffff",
    color: "#1b5e20",
    iconColor: "#2e7d32",
    didOpen: (toast) => {
      toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
      toast.style.border = "1px solid #2e7d32";
      toast.style.fontWeight = "500";
    },
  });
};

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const cloudinaryProducts = data.map((p) => ({
          id: p._id,
          name: p.name,
          category: p.category || "Misc",
          price: p.price,
          img: p.imageUrl,
          desc: p.description,
        }));
        setProducts([...dummyProducts, ...cloudinaryProducts]);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts(dummyProducts);
      }
    };
    fetchProducts();
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Filter products
  const filtered = products.filter(
    (p) =>
      (selectedCategory === "All" || p.category === selectedCategory) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase()))
  );

  // Slice for mobile
  const productsToDisplay =
    isMobile && !showAllProducts ? filtered.slice(0, 5) : filtered;

  // GSAP Animations for Explore
  useEffect(() => {
    if (!exploreRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        fadeIn(titleRef.current, 'down', 0.2);
      }

      // Search bar animation
      if (searchRef.current) {
        scaleIn(searchRef.current, 0.4);
      }

      // Categories animation
      if (categoriesRef.current) {
        const categoryButtons = categoriesRef.current.querySelectorAll('.explore-category-card');
        staggerFadeIn(categoryButtons, 'up', 0.6, 0.1);
      }

      // Product cards scroll animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.explore-card');
        ScrollTrigger.batch(cards, {
          onEnter: (elements) => {
            gsap.fromTo(
              elements,
              { opacity: 0, y: 50, scale: 0.9 },
              { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
            );
          },
          start: 'top 85%'
        });

        // Hover animations for cards
        cards.forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { scale: 1.05, y: -5, duration: 0.3, ease: 'power2.out' });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: 'power2.out' });
          });
        });
      }
    }, exploreRef);

    return () => ctx.revert();
  }, [products, selectedCategory, search, isMobile, showAllProducts]);

  // Modal animation
  useEffect(() => {
    if (modal.open) {
      const modalElement = document.querySelector('.explore-modal');
      if (modalElement) {
        gsap.fromTo(
          modalElement,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
        );
      }
    }
  }, [modal.open]);

  return (
    <div className="explore-bg" ref={exploreRef}>
      <h1 className="explore-title" ref={titleRef}>Explore Products</h1>

      {/* Search */}
      <input
        className="explore-search"
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        ref={searchRef}
      />

      {/* Categories */}
      <div className="explore-categories" ref={categoriesRef}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`explore-category-card${
              selectedCategory === cat ? " selected" : ""
            }`}
            onClick={() => {
              setSelectedCategory(cat);
              if (isMobile) {
                setShowAllProducts(false);
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="explore-grid" ref={gridRef}>
        {productsToDisplay.map((product) => (
          <div className="explore-card" key={product.id}>
            <img
              src={product.img}
              alt={product.name}
              className="explore-card-img"
            />
            <div className="explore-card-content">
              <h2 className="explore-card-title">{product.name}</h2>
              <p className="explore-card-price">₹{product.price}</p>
              <button
                className="explore-card-btn"
                onClick={() => {addToCart(product),
                   showToast(`${product.name} added to cart!`)}}
               
              >
                Add to Cart
              </button>
              <button
                className="explore-card-desc-btn"
                onClick={() => setModal({ open: true, product })}
              >
                View Description
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="explore-empty">No products found.</div>
        )}
      </div>

      {/* Explore All button for mobile */}
      {isMobile && !showAllProducts && filtered.length > 5 && (
        <button
          className="explore-explore-all-btn"
          onClick={() => setShowAllProducts(true)}
        >
          Explore All products
        </button>
      )}

      {/* Modal */}
      {modal.open && (
        <div
          className="explore-modal-overlay"
          onClick={() => setModal({ open: false, product: null })}
        >
          <div
            className="explore-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{modal.product.name}</h2>
            <img
              src={modal.product.img}
              alt={modal.product.name}
              className="explore-modal-img"
            />
            <p>{modal.product.desc}</p>
            <button
              className="explore-modal-close"
              onClick={() => setModal({ open: false, product: null })}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
