const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: function() { return !this.googleId; } 
    },
    googleId: {
        type: String, // store Google user ID
        unique: true,
        sparse: true // allows multiple docs without googleId
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);