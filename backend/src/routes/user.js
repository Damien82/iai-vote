const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware_admin");
const connectDB = require("../config/db_admin");
const { mainConnection } = connectDB(); // 👈 appelle la fonction pour avoir les connexions
const getAdminModel = require("../models/Admins");
const Admin = getAdminModel(mainConnection); // 👈 passe la connexion correcte


router.get("/me", verifyToken, async (req, res) => {
  try {
    const matricule = req.admin?.matricule;
    console.log("Matricule dans token :", matricule);

    if (!matricule) {
      return res.status(400).json({ message: "Matricule manquant dans le token" });
    }

    const admin = await Admin.findOne({ matricule }).select("-motDePasse");
    console.log("Résultat MongoDB :", admin);

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
