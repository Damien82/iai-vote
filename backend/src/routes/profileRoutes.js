const express = require('express');
const router = express.Router();
const { getProfile, changePassword  } = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware_user');

router.get('/profile', authMiddleware, getProfile);
router.post('/profile/change-password', authMiddleware, changePassword);

module.exports = router;
