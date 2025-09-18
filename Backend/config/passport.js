const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Models/User');
require('dotenv').config();

passport.serializeUser((user, done)=>{
    done(null, user.id);
})

passport.deserializeUser(async (id, done)=>{
    const user = await User.findById(id);
    done(null, user);
})

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"https://amayasoul-ar-powered-handcrafted-store.onrender.com/google/callback"},
async(accessToken, refreshToken, profile, done)=>{
   try{
    let user =await User.findOne({googleId: profile.id})
    if(!user){
        user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value
        });
        await user.save();
    }
     done(null, user);
    }
    catch(err){
        done(err, null);
    }
})
);