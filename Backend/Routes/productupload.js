const express = require("express");
const router = express.Router();
const Product = require("../Models/Product");
const multer = require("multer");
const upload = require("../config/multer+cloudinary");

// Test endpoint to check if the route is working
router.get("/test", (req, res) => {
  res.json({ message: "Product upload route is working", timestamp: new Date() });
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ error: err.message });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

// ✅ Add product (Admin Only)
router.post("/", upload.single("image"), handleMulterError, async (req, res) => {
  try {
    console.log("Product upload request received");
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    const { name, price, description } = req.body;

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const product = new Product({
      name,
      price: parseFloat(price),
      description: description || "",
      imageUrl: req.file.path, // Cloudinary URL
      publicId: req.file.filename // Cloudinary public ID
    });

    console.log("Saving product:", product);
    await product.save();
    console.log("Product saved successfully");
    
    res.status(201).json(product);
  } catch (err) {
    console.error("Error in product upload:", err);
    
    // Handle specific error types
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: "Validation error", details: err.message });
    }
    
    if (err.code === 11000) {
      return res.status(400).json({ error: "Product with this name already exists" });
    }
    
    res.status(500).json({ error: "Failed to add product", details: err.message });
  }
});

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ Delete product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
