const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { upsertUser, findUserByGoogleId } = require('../models/googleAuthUser');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Upsert user based on Google profile information
        let user = await findUserByGoogleId(profile.id);
        if (!user) {
            user = await upsertUser(profile.id, profile.displayName, profile.emails[0].value, profile.photos[0].value);
        }
        console.log(user);
        // Pass the user object to serializeUser
        done(null, user);
    } catch (err) {
        done(err, false);
    }
}));

// Store the user ID in the session
passport.serializeUser((user, done) => {
    done(null, user.googleid);  // Ensure googleId is correctly set in the user object
});

// Retrieve the user based on the ID stored in the session
passport.deserializeUser(async (googleId, done) => {
    try {
        const user = await findUserByGoogleId(googleId);
        if (!user) {
            return done(new Error('User not found'));
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
