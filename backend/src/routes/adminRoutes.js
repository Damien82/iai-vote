// src/routes/verifyAdmin.js

const express = require("express");
const router = express.Router();

router.post("/verify-admin", async (req, res) => {
  const { matricule } = req.body;
  if (!matricule) return res.status(400).json({ message: "Matricule requis" });

  try {
    const admin = await req.db_admin.registeredAdmins
      .collection("admins")
      .findOne({ matricule });

    if (!admin) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    return res.status(200).json({ message: "Admin confirmé" });
  } catch (err) {
    console.error("Erreur de vérification admin :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});


module.exports = router;
