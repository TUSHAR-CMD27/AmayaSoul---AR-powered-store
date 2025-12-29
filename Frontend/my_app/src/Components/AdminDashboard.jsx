// src/pages/AdminDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // handle text input change
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Dropzone config
  const onDrop = (acceptedFiles) => {
    setNewProduct({ ...newProduct, image: acceptedFiles[0] });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // add new product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("description", newProduct.description);
    formData.append("image", newProduct.image);

    try {
      const res = await axios.post("http://localhost:5000/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProducts([...products, res.data]);
      setNewProduct({ name: "", price: "", description: "", image: null });
      alert("Product added successfully!");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product");
    }
  };

  // delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* Add Product Form */}
      <div className="add-product-section">
        <h3>Add New Product</h3>
        <form className="product-form" onSubmit={handleAddProduct}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={newProduct.description}
            onChange={handleChange}
            required
          />

          {/* Drag & Drop Upload */}
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? "active" : ""}`}
          >
            <input {...getInputProps()} />
            {newProduct.image ? (
              <p>✅ {newProduct.image.name}</p>
            ) : isDragActive ? (
              <p>Drop the image here...</p>
            ) : (
              <p>Drag & drop an image here, or click to select</p>
            )}
          </div>

          <button type="submit">Add Product</button>
        </form>
      </div>

      {/* Products List */}
      <div className="products-section">
        <h3>Products List</h3>
        <ul className="products-list">
          {products.map((p) => (
            <li key={p._id} className="product-item">
              <img src={p.imageUrl} alt={p.name} className="product-image" />
              <div className="product-info">
                <h4>{p.name}</h4>
                <p>₹{p.price}</p>
                {p.description && (
                  <p style={{ fontSize: "0.9rem", fontWeight: "normal" }}>
                    {p.description}
                  </p>
                )}
              </div>
              <button
                className="delete-button"
                onClick={() => handleDelete(p._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
