// routes/userRoutes.js ou users.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware_admin"); // ou _user selon le cas
const Admin = require("../models/Admins"); // ou Users si c'est pas pour les admins

router.get("/me", verifyToken, async (req, res) => {
  try {
    const matricule = req.admin?.matricule;
    console.log("🔑 Matricule extrait du token:", matricule);

    if (!matricule) {
      return res.status(400).json({ message: "Matricule manquant dans le token" });
    }

    const admin = await Admin.findOne({ matricule }).select("-password");
    console.log("🧍 Admin trouvé:", admin);

    if (!admin) {
      return res.status(404).json({ message: "Admin non trouvé" });
    }

    res.json(admin);
  } catch (error) {
    console.error("❌ Erreur GET /me :", error);
    res.status(500).json({ message: "Erreur serveur", admin_payload: req.admin });
  }
});



module.exports = router;
