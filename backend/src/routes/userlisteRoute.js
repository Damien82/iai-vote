const express = require("express");
const router = express.Router();

const {
  ajouterUtilisateur,
  getAllUtilisateurs,
} = require("../controllers/simpleuserController");

// Route POST : Ajouter un utilisateur dans la base ref (base de référence)
router.post("/", ajouterUtilisateur);

// Route GET : Afficher tous les utilisateurs depuis la base main (base principale)
router.get("/", getAllUtilisateurs);

module.exports = router;
