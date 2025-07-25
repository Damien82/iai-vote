const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin, verifyAdmin, } = require("../controllers/authController_admin");

// Route inscription
router.post("/registerAdmin", registerAdmin);

// ✅ Route de connexion
router.post("/loginAdmin", loginAdmin);

// nouvelle route de vérification
router.post("/verify-admin", verifyAdmin);

module.exports = router;
