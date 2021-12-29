const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/', authController.defaultViewController);

router.post('/signup', authController.signupController);

router.post('/signin', authController.signinController);

module.exports = router;
