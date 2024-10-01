const router = require('express').Router()

const userController = require('../controllers/userController');

const { isAuthenticated } = require('../middlewares/authMiddleware');
const { hasRole } = require('../middlewares/roleMiddleware');
// const passport = require('passport');
// const authController = require('../controllers/authController');


// router.get('/auth/google', passport.authenticate('google', {
//     scope: ['profile', 'email']
// }));


// router.get('/auth/google/callback', authController.googleCallback);

// router.get('/auth/logout', authController.logout);


router.route('/getUsers').get( isAuthenticated,userController.users);

router.route('/signup').post( isAuthenticated,userController.signup);

router.route('/login').post( isAuthenticated,userController.login);

router.route('/logout').get( isAuthenticated,userController.logout);

router.route('/welcome').get( isAuthenticated,userController.welcome);

router.route('/submitSadhanaForm').post( isAuthenticated,userController.submitSadhanaForm);

router.route('/getSadhanaReport').post( isAuthenticated,userController.getSadhanaReport);

router.route('/submitUserDetails').post( isAuthenticated,userController.submitUserDetails);

router.route('/updateUserDetails').post( isAuthenticated,userController.updateUserDetails);

router.route('/getTopSadhanaScorer').post( isAuthenticated,userController.getTopSadhanaScorer);

// if required-------------------------------------------------------------------------------------------

// router.route('/getAnnouncements').get( isAuthenticated,userController.getAnnouncements);

// router.route('/addAnnouncements').post( isAuthenticated,userController.addAnnouncements);

//--------------------------------------------------------------------------------------------------------






module.exports = router;