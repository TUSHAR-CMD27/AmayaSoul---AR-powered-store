import React, { useState, useEffect } from "react";
import "./Explore.css";
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

// Dummy categories
const categories = ["All", "Clothing", "Jewelry", "Decor", "Accessories"];


const dummyProducts = [
  { id: 1, name: "Handcrafted Kurtis", category: "Clothing", price: 1200, img: kurtaImg, desc: "A beautiful handcrafted kurta with traditional embroidery." },
  { id: 2, name: "Emerald Glow Face Serum - Ayurvedic Radiance Elixir", category: "Cosmetic", price: 800, img: img6, desc: "Infused with ancient Ayurvedic wisdom, this luxurious emerald-hued serum combines 100mg CBD with powerful adaptogens to deliver deep moisture and luminous glow. Like the precious emeralds adorning Maharani's crown, this botanical elixir illuminates your skin with nature's most potent healing herbs, creating an ethereal radiance worthy of royalty." },
  { id: 3, name: "Vrindavan Prosperity Planter - Royal Wave Collection", category: "Decor", price: 500, img: img3, desc: "Inspired by the sacred groves of Vrindavan, this exquisite charcoal planter features mesmerizing wave patterns reminiscent of the Ganges' eternal flow. The sophisticated ridged design symbolizes life's continuous journey, making it a perfect sanctuary for your beloved green companions. Elevate your sacred space with this meditation on nature's divine geometry.." },
  { id: 4, name: "Chandrika Hair Masque", category: "cosmetics", price: 300, img: img4, desc: "Transform your tresses with this opulent hair treatment, named after the moon goddess Chandrika. This luxurious masque delivers intensive nourishment, leaving your hair as silky and lustrous as the finest Banarasi silk. Embrace the ancient beauty rituals of Indian royalty with this deeply restorative treatment that crowns you with naturally magnificent hair.." },
  { id: 5, name: "Vanaspati Mist - Sacred Forest Essence", category: "Clothing", price: 600, img: img5, desc: "Captured within this frosted glass vessel lies the pure essence of India's sacred forests. This eco-luxury mist, presented with a noble wooden crown, embodies the tranquil spirit of ancient ashrams. Each spray delivers nature's pristine energy, connecting you to the timeless wisdom of India's mystical woodlands.." },
  { id: 6, name: "Ayurveda Alchemist Collection ", category: "Accessories", price: 950, img: img7, desc: "Curate your own royal wellness sanctuary with this magnificent collection of traditional implements. Featuring a handcrafted mortar and pestle, sacred brass vessels, and vintage botanical references, this set honors the ancient art of Ayurvedic preparation. Transform your space into a palace of healing, where every ritual becomes a ceremony of self-care fit for royalty.." },
  { id: 7, name: "Modern Wall Art", category: "Decor", price: 1500, img: img8, desc: "Contemporary wall art for a stylish home." },
  { id: 8, name: "Ethnic Pottery", category: "Decor", price: 700, img: img9, desc: "Hand-painted ethnic pottery for your living room." },
  { id: 9, name: "Pearl Pendant", category: "Jewelry", price: 1200, img: img10, desc: "Elegant pearl pendant for special occasions." },
  { id: 10, name: "Designer Scarf", category: "Accessories", price: 400, img: img11, desc: "Soft designer scarf with unique patterns." },
  { id: 11, name: "Antique Clock", category: "Decor", price: 2000, img: img12, desc: "Vintage-style clock to add character to your space." },
  { id: 12, name: "Gemstone Ring", category: "Jewelry", price: 1800, img: img13, desc: "Sparkling gemstone ring for a touch of luxury." },
  { id: 13, name: "Handwoven Basket", category: "Decor", price: 350, img: img14, desc: "Eco-friendly handwoven basket for storage or decor." },
  { id: 14, name: "Trendy Sunglasses", category: "Accessories", price: 650, img: img15, desc: "Trendy sunglasses to elevate your style." },
  { id: 15, name: "Artisan Mug", category: "Decor", price: 250, img: img16, desc: "Handcrafted mug for your favorite beverages." },
  { id: 16, name: "Leather Wallet", category: "Accessories", price: 900, img: img17, desc: "Premium leather wallet with multiple compartments." },
];

export default function Explore() {
  const [products, setProducts] = useState(dummyProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState({ open: false, product: null });
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { addToCart } = useCart();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://amayasoul-ar-powered-handcrafted-store.onrender.com/");
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

  return (
    <div className="explore-bg">
      <h1 className="explore-title">Explore Products</h1>

      {/* Search */}
      <input
        className="explore-search"
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Categories */}
      <div className="explore-categories">
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
      <div className="explore-grid">
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
                onClick={() => addToCart(product)}
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
