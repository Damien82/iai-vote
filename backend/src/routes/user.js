const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/User"); // adapte selon ta structure

router.get("/me", verifyToken, async (req, res) => {
  try {
    const matricule = req.user.matricule; // ici on récupère matricule dans le token

    if (!matricule) return res.status(400).json({ message: "Matricule manquant dans le token" });

    // Recherche user en base via matricule
    const user = await User.findOne({ matricule }).select("-password");

    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json(user);
  } catch (error) {
    console.error("Erreur /api/users/me :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
