import React, { useState } from "react";
import "@google/model-viewer"; 
import "./Explore3d.css";
import { useCart } from "./CartContext";

// Dummy 3D product list
const threeDProducts = [
  {
    id: 1,
    name: "Soap Dispensor",
    category: "Decor",
    price: 1200,
    model: "/models/scene.gltf",
    desc: "A beautifully designed perfume bottle 3D model."
  },
  {
    id: 2,
    name: "Kulhad Cups (Set of 6)",
  category: "Essentials",
  price: 900,
  model: "/models/kulhad_filled_with_tea/scene.gltf",
  desc: "Handcrafted kulhad cups that bring the earthy charm of traditional chai to your modern table."

  },
  {
    id: 3,
    name: "Puja Thali Set",
    category: "Accessories",
    price: 3500,
    model: "/models/puja_thali_set/scene.gltf",
    desc: "Trendy sneaker model with detailed textures."
  },
  {
    id: 4,
    name: "Authentic Brass Indian Lamp",
    category: "Decor",
    price: 600,
    model: "/models/golden_ritual_lamp/scene.gltf",
    desc: "Handcrafted vase 3D model with AR experience."
  },
  {
    id: 5,
    name: "6ft Palm Plant",
    category: "Decor",
    price: 1800,
    model: "/models/house_palm_plant/scene.gltf",
    desc: "Stylish table lamp model."
  },
  {
  id: 6,
  name: "Shivling Statue",
  category: "Spiritual",
  price: 2500,
  model: "/models/mahadev_shivalinga/scene.gltf",
  desc: "A finely detailed Shivling statue symbolizing strength and devotion, perfect for home temples or spiritual decor."
}
,
{
  id: 7,
  name: "Clay Water Pot",
  category: "Essentials",
  price: 700,
  model: "/models/indian_clay_matka_-_water_clay_pot/scene.gltf",
  desc: "Traditional clay water pot that naturally cools water, combining healthy living with rustic charm."
}
,
{
  id: 8,
  name: "Golden Vase",
  category: "Decor",
  price: 3200,
  model: "/models/golden_and_obsidian_vases_free_version/scene.gltf",
  desc: "Elegant golden vase with a luxurious finish, designed to enhance modern interiors with a royal touch."
}
,{
  id: 9,
  name: "5ft Indoor Plant",
     category: "Decor",
     price: 2500,
     model: "/models/Plant/scene.gltf",
     desc: "Modern 3D chair design with AR view."
 },{
  id: 10,
  name : "Indoor Plant - Palm"
  ,   category: "Decor",
     price: 2200,
     model: "/models/majesty_palm_plant/scene.gltf",
     desc: "Lush indoor palm plant that brings a touch of nature and tranquility to any living space."
 },{
  id: 11,
  name: "Aglaonqema Plant - 4ft",
      category: "Decor",
      price: 2000,
      model: "/models/aglaonema_plant/scene.gltf",
      desc: "Vibrant Aglaonema plant known for its striking foliage, perfect for adding color and life to your home or office."
 }
];

export default function Explore3d() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState({ open: false, product: null });
  const { addToCart } = useCart();

  const categories = ["All", ...new Set(threeDProducts.map((p) => p.category))];

  // Filtering logic
  const filtered = threeDProducts.filter(
    (p) =>
      (selectedCategory === "All" || p.category === selectedCategory) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="explore-bg">
      <h1 className="explore-title">Explore 3D Models</h1>

      {/* Search */}
      <input
        className="explore-search"
        type="text"
        placeholder="Search 3D products..."
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
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="explore-grid">
        {filtered.map((product) => (
          <div className="explore-card" key={product.id}>
            {/* 3D model-viewer */}
            <model-viewer
              src={product.model}
              alt={product.name}
              camera-controls
              auto-rotate
              shadow-intensity="1"
              ar
              ar-modes="webxr scene-viewer quick-look"
              class="explore-card-model"
            ></model-viewer>

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
          <div className="explore-empty">No 3D models found.</div>
        )}
      </div>

      {/* Description Modal */}
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
            <model-viewer
              src={modal.product.model}
              alt={modal.product.name}
              camera-controls
              auto-rotate
              shadow-intensity="1"
              ar
              ar-modes="webxr scene-viewer quick-look"
              class="explore-modal-model"
            ></model-viewer>
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
