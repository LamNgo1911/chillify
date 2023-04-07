// create auth routes

const express = require('express');
const router = express.Router();
const {register, login, getMe, forgotPassword, resetPassword, updateDetails, updatePassword, logout} = require('../controllers/auth');

const {protect} = require('../middleware/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(protect, getMe);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resettoken').patch(resetPassword);
router.route('/updatedetails').patch(protect, updateDetails);
router.route('/updatepassword').patch(protect, updatePassword);
router.route('/logout').get(protect, logout);

module.exports = router;


