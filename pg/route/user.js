const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const userController = require('../controller/user');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.get('/userprofile', verifyToken, userController.getUserProfile);
router.put('/userprofile', verifyToken, userController.updateUserProfile);

module.exports = router;
