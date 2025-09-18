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
app.use(cors({
    origin: 'https://amayasoul-ar-powered-handcrafted-store.onrender.com',
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