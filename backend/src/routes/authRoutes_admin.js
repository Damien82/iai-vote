const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require("../controllers/authController_admin");

// Route inscription
router.post("/register", register);

// ✅ Route de connexion
router.post("/login", login);

module.exports = router;
