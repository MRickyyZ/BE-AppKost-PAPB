const express = require('express');
const { register, login, changePassword } = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');
const { getProfile, updateProfile } = require('../controllers/profileController');

const router = express.Router();

// Route register dan login
router.post('/register', register);
router.post('/login', login);

// Route profile
router.get('/profile', authenticate, getProfile); 
router.put('/profile', authenticate, updateProfile); 
router.put("/change-password", authenticate, changePassword);

module.exports = router;
