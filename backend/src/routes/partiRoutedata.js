const express = require("express");
const router = express.Router();
const partiesController = require("../controllers/partiesController"); // <--- bien vérifier le chemin

// Route pour récupérer tous les partis
router.get("/getAllPartis", partiesController.getAllPartis);

module.exports = router;
