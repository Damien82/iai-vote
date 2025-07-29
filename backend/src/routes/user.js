const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware_admin");
const Admin = require("../models/Admins"); // adapte selon ta structure

router.get("/me", verifyToken, async (req, res) => {
  try {
    console.log("req.admin :", req.admin); // 🔍 Log pour vérifier ce que contient le token décodé

    const matricule = req.admin?.matricule;

    if (!matricule) {
      return res.status(400).json({ message: "Matricule manquant dans le token" });
    }

    const user = await User.findOne({ matricule }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erreur /api/users/me :", error); // 🔥 Log l'erreur
    res.status(500).json({ message: "Erreur serveur" });
  }
});


module.exports = router;
