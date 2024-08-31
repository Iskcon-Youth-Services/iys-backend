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
        let user = await findUserByGoogleId(profile.id);
        if (!user) {
            // Signup the user if they don't exist
            user = await upsertUser(profile.id, profile.displayName, profile.emails[0].value, profile.photos[0].value);
        }
        // If the user exists, they are logged in
        done(null, user);
    } catch (err) {
        done(err, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await findUserByGoogleId(id);
        done(null, user);
    } catch (err) {
        done(err, false);
    }
});
