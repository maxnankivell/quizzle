const express = require('express');
const passport = require('passport');
const userController = require('./../controllers/userController');

const router = express.Router();

router.route('/signup').post(userController.signup);
router.route('/login').post(userController.login);
router.route('/logout').get(userController.logout);

router.post('/forgotPassword', userController.forgotPassword);
router.patch('/resetPassword/:token', userController.resetPassword);

router.use(passport.authenticate('jwt', { session: false }));

router.patch('/updateMyPassword', userController.updatePassword);
router.get('/me', userController.getMe);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

module.exports = router;
