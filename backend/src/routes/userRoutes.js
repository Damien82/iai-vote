const express = require("express");
const router = express.Router();

router.post("/verify-user", async (req, res) => {
  const { matricule } = req.body;
  if (!matricule) return res.status(400).json({ message: "Matricule requis" });

  try {
    const user = await req.db.registeredUsers
      .collection("users")
      .findOne({ matricule });

    if (!user) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    return res.status(200).json({ message: "Utilisateur confirmé" });
  } catch (err) {
    console.error("Erreur de vérification Utilisateur :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
