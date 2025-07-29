// routes/user.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware_admin.js");
const User = require("../models/Users"); // adapte selon ta structure

// Route protégée pour récupérer les infos du user connecté
router.get("/me", verifyToken, async (req, res) => {
  try {
    // req.user contient les données décodées du token (ex: { id: ..., email: ... })
    const userId = req.user.id;

    // Récupère l'utilisateur en DB sans renvoyer le mot de passe (à adapter selon ton modèle)
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Envoie les données utilisateur
    res.json(user);
  } catch (error) {
    console.error("Erreur /api/users/me :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
