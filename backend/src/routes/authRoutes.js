const express = require("express");
const router = express.Router();
const { register, login, verifyUser, resetPassword } = require("../controllers/authController");



// Route inscription
router.post("/register", register);

// Route de connexion
router.post("/login", login);

// Route de reinitialisation de mot de passe 
router.post("/resetpassworduser", resetPassword);

// nouvelle route de vérification
router.post("/verify-user", verifyUser);



module.exports = router;
