const express = require("express");
const router = express.Router();
const {loginSuperAdmin, verifySuperAdmin, changePassword2 } = require("../controllers/authController_superadmin");
const { getProfile } = require("../controllers/superadminController");


// ✅ Route de connexion
router.post("/loginSuperAdmin", loginSuperAdmin);


// nouvelle route de vérification
router.post("/verify-superadmin", verifySuperAdmin);

//route profile
router.get("/me", getProfile);

// nouvelle route pour changer le mot de passe
router.post("/changepassword",changePassword2)

module.exports = router;
