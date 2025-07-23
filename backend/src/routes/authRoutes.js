const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// Route inscription
router.post("/register", register);

// ✅ Route de connexion
router.post("/login", login);

module.exports = router;
