const express = require("express");
const router = express.Router();
const { register, login, verifyUser } = require("../controllers/authController");

// Route inscription
router.post("/register", register);

// ✅ Route de connexion
router.post("/login", login);

// nouvelle route de vérification
router.post("/verify-user", verifyUser);

module.exports = router;
