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
    'http://localhost:3000',
    process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(null, true); // Allow all origins for now - restrict in production
        }
    },
    credentials: true
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


app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

mongoconnect();
app.use('/',authRoutes);

app.listen(5000, () => {

    console.log('Server is running on port 5000');
});