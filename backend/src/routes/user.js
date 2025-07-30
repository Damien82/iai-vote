// routes/userRoutes.js ou users.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware_admin"); // ou _user selon le cas
const Admin = require("../models/Admins"); // ou Users si c'est pas pour les admins

router.get("/me", verifyToken, async (req, res) => {
  try {
    console.log("✅ Token décodé :", req.admin); // req.admin car adminMiddleware

    return res.json({
      message: "Route test ok",
      decoded: req.admin,
    });
  } catch (error) {
    console.error("❌ Erreur :", error);
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
