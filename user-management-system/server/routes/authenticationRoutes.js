const router = require('express').Router()

const userController = require('../controllers/userController');


const passport = require('passport');
const authController = require('../controllers/authController');


router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));


router.get('/auth/google/callback', authController.googleCallback);

router.get('/auth/logout', authController.logout);
module.exports = router;