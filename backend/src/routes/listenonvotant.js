// src/routes/voterRoutes.js
const express = require("express");
const router = express.Router();
const Voter = require("../models/voter"); // ton modèle Voter

// Récupérer tous les matricules de votants
router.get("/voters-matricules", async (req, res) => {
  try {
    const voters = await Voter(req.db_voter.voters).find({}, "matricule"); // ne récupérer que le matricule
    const matricules = voters.map(v => v.matricule);
    res.json(matricules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible de récupérer les votants." });
  }
});

module.exports = router;
