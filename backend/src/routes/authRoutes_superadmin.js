const express = require("express");
const router = express.Router();
const {loginSuperAdmin, verifySuperAdmin, } = require("../controllers/authController_superadmin");
const { getProfile } = require("../controllers/userController");


// ✅ Route de connexion
router.post("/loginSuperAdmin", loginSuperAdmin);


// nouvelle route de vérification
router.post("/verify-superadmin", verifySuperAdmin);

//route profile
router.get("/me", getProfile);

module.exports = router;
