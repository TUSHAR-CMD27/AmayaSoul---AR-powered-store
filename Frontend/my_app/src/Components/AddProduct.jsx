
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

const AddProduct = () => {
  const nav = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [formData, setFormData] = useState({ name: "", description: "", price: "", category: "" });
  const [image, setImage] = useState(null);

  if (!admin) {
    return <h2 className="access-denied">🚫 Access Denied: Only admins can add products</h2>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("image", image); // Changed from "images" to "image"

    try {
      await axios.post("https://amayasoul-ar-powered-handcrafted-store.onrender.com/products", data, { // Changed endpoint
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Product added successfully!");
      nav("/explore");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product");
    }
  };

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
