const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware_admin");
const Admin = require("../models/Admins"); // modèle admin

router.get("/me", verifyToken, async (req, res) => {
  try {
    const matricule = req.admin?.matricule;

    console.log("Matricule dans token :", matricule); // 👈 1er log ici

    if (!matricule) {
      return res.status(400).json({ message: "Matricule manquant dans le token" });
    }

    const admin = await Admin.findOne({ matricule }).select("-password");

    console.log("Résultat MongoDB :", admin); // 👈 2e log ici

    if (!admin) {
      return res.status(404).json({ message: "Admin non trouvé" });
    }

    res.json(admin);
  } catch (error) {
    console.error("Erreur GET /me :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
