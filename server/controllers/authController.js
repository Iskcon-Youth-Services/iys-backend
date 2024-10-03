const passport = require('passport');

const googleCallback = passport.authenticate('google', {
    failureRedirect: '/auth/google',
    successRedirect: '/auth/google/callback',
    session: true
});

const logout = (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        req.session.destroy(() => {
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.redirect('/api/loginsignup'); // Redirect to the homepage or login page
        });
    });
    // req.logout((err) => {
    //     if (err) return next(err);
    //     res.redirect('/api/loginsignup');
    // });
};
module.exports = { googleCallback,logout};