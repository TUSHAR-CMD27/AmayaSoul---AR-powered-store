const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoconnect = require('./config/db');
const authRoutes = require('./Routes/Auth');
const passport = require('passport');
const Productupload = require('./Routes/productupload');
require('dotenv').config();
require('./config/passport');


const app = express();
// Allow multiple origins for CORS (frontend URLs)
const allowedOrigins = [
    'https://amayasoul-ar-powered-handcrafted-store.onrender.com',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // In development, allow all localhost origins
        if (process.env.NODE_ENV === 'development' || origin.includes('localhost') || origin.includes('127.0.0.1')) {
            return callback(null, true);
        }
        
        // Check if origin is in allowed list
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            // For now, allow all origins (restrict in production)
            callback(null, true);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
})
)

app.use(passport.initialize());
app.use(passport.session());
app.use('/products', Productupload);


// Serve static files from Frontend build (if available)
const path = require('path');
const fs = require('fs');
const frontendDist = path.join(__dirname, '../Frontend/my_app/dist');

if (fs.existsSync(frontendDist)) {
  console.log("Serving Frontend from:", frontendDist);
  app.use(express.static(frontendDist));
  
  // SPA Fallback for Frontend routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
} else {
    // If no frontend build is found (typical for separate Backend deployment)
    console.log("Frontend build not found. Running in API-only mode.");
    
    app.get('/', (req, res) => {
        res.send('<h1>API is running</h1><p>This is the Backend Server. Please visit the Frontend URL to view the website.</p>');
    });

    // Global 404 for unknown API routes or missing frontend
    app.use((req, res) => {
        res.status(404).send(`
            <h1>404 Not Found</h1>
            <p>The path <code>${req.path}</code> does not exist on this API server.</p>
            <p>If you are trying to view the website, please ensure you are visiting the <strong>Frontend URL</strong>.</p>
        `);
    });
}

mongoconnect();
app.use('/',authRoutes);

app.listen(5000, () => {

    console.log('Server is running on port 5000');
});