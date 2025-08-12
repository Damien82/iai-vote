const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin, verifyAdmin, changePassword } = require("../controllers/authController_admin");
const { getProfile } = require("../controllers/userController");
const authMiddleware = require('../middlewares/authMiddleware_supadmin');

// Route inscription
router.post("/registerAdmin", registerAdmin);

// ✅ Route de connexion
router.post("/loginAdmin", loginAdmin);

// nouvelle route de vérification
router.post("/verify-admin", verifyAdmin);

// nouvelle route pour changer le mot de passe
router.post("/changepassword",changePassword,authMiddleware)

//route profile
router.get("/me", getProfile);

module.exports = router;
