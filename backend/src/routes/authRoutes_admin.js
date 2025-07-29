const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin, verifyAdmin, } = require("../controllers/authController_admin");
const { getProfile } = require("../middlewares/authMiddleware_admin");

// Route inscription
router.post("/registerAdmin", registerAdmin);

// ✅ Route de connexion
router.post("/loginAdmin", loginAdmin);

// nouvelle route de vérification
router.post("/verify-admin", verifyAdmin);

//route profile
router.get("/me", getProfile);

module.exports = router;
