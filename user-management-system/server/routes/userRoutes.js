const router = require('express').Router()

const userController = require('../controllers/userController');


// const passport = require('passport');
// const authController = require('../controllers/authController');


// router.get('/auth/google', passport.authenticate('google', {
//     scope: ['profile', 'email']
// }));


// router.get('/auth/google/callback', authController.googleCallback);

// router.get('/auth/logout', authController.logout);


router.route('/getUsers').get(userController.users);

router.route('/signup').post(userController.signup);

router.route('/login').post(userController.login);

router.route('/logout').get(userController.logout);

router.route('/welcome').get(userController.welcome);

router.route('/submitSadhanaForm').post(userController.submitSadhanaForm);

router.route('/getSadhanaReport').post(userController.getSadhanaReport);

router.route('/submitUserDetails').post(userController.submitUserDetails);

router.route('/updateUserDetails').post(userController.updateUserDetails);

module.exports = router;