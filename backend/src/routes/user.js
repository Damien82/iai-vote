// routes/userRoutes.js ou users.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware_admin"); // ou _user selon le cas
const User = require("../models/Admins"); // ou Users si c'est pas pour les admins

router.get("/me", verifyToken, async (req, res) => {
  try {
    const matricule = req.admin?.matricule; // si middleware = req.admin = decoded

    if (!matricule) {
      return res.status(400).json({ message: "Matricule manquant dans le token" });
    }

    const user = await User.findOne({ matricule }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erreur GET /me :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
