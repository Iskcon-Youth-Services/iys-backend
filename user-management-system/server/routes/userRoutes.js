const router = require('express').Router()

const userController = require('../controllers/userController');



router.route('/getUsers').get(userController.users);

router.route('/signup').post(userController.signup);

router.route('/login').post(userController.login);

router.route('/logout').get(userController.logout);

router.route('/welcome').get(userController.welcome);

router.route('/submitSadhanaForm').post(userController.submitSadhanaForm);

router.route('/getSadhanaReport').post(userController.getSadhanaReport);

module.exports = router;