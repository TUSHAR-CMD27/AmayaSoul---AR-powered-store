const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    imageUrl: {type: String, required: true}, // Cloudinary URL
    publicId: {type: String, required: true}, // Cloudinary public ID for deletion
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Product', productSchema);