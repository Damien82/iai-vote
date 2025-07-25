const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require("../controllers/authController");

// Route inscription
router.post("/registerAdmin", registerAdmin);

// ✅ Route de connexion
router.post("/loginAdmin", loginAdmin);

module.exports = router;
