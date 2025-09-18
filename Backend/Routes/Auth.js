//Signup Route
const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt= require('bcrypt');
const passport = require('passport');
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";


router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    
    if(!username || !email || !password){
        return res.status(400).json({message: 'All fields are required'});
    }

    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.status(400).json({message: 'User already exists'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({message: 'User created successfully'});
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({message: 'All fields are required'});
    }

    const user = await User.findOne({ email });
    if(!user){
        return res.status(400).json({message: 'Invalid credentials'});
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({message: 'Invalid credentials'});
    }

    res.status(200).json({message: 'User logged in successfully', user: {id: user._id, username: user.username, email: user.email}});
});

// Admin Login Route
router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;
    
    if(!email || !password){
        return res.status(400).json({message: 'All fields are required'});
    }

    // Check if admin credentials match (you can create an admin user in your database)
    // For now, using hardcoded admin credentials - in production, use environment variables
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if(email === adminEmail && password === adminPassword){
        res.status(200).json({
            message: 'Admin logged in successfully',
            admin: { email: adminEmail, role: 'admin' }
        });
    } else {
        res.status(400).json({message: 'Invalid admin credentials'});
    }
});

//Login with Google
router.get('google', passport.authenticate('google',{ scope: ['profile', 'email']}))
router.get('google/callback', passport.authenticate('google',{ failureRedirect : '/login'}),
(req,res)=>{
    console.log('Google OAuth callback received:', req.user);
    
    // Redirect directly to frontend with user data as URL parameters
    const userData = {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        googleId: req.user.googleId
    };
    
    console.log('User data to send:', userData);
    
    // Encode user data for URL
    const encodedUserData = encodeURIComponent(JSON.stringify(userData));
    
    console.log('Redirecting to:', `https://amayasoul-ar-powered-handcrafted-store.onrender.com/explore?user=${encodedUserData}`);
    
    // Redirect to frontend with user data
    res.redirect(`https://amayasoul-ar-powered-handcrafted-store.onrender.com/explore?user=${encodedUserData}`);
}
);

//Logout Google
router.get('/logout', (req,res)=>{
    req.logout((err)=>{
        if(err) {
            console.error('Logout error:', err);
            return res.status(500).json({message: 'Logout failed'});
        }
        res.json({message: 'Logged out successfully'});
    });
})


module.exports = router;

