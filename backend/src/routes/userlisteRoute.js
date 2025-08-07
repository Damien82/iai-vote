const express = require("express");
const router = express.Router();

const {
  ajouterUtilisateur,
  getAllUtilisateurs,
  deleteUtilisateur,
  getUserCount,
} = require("../controllers/simpleuserController");

// Route POST : Ajouter un utilisateur dans la base ref (base de référence)
router.post("/", ajouterUtilisateur);

// Route GET : Afficher tous les utilisateurs depuis la base main (base principale)
router.get("/", getAllUtilisateurs);

// Route GET : supprimer tous un utilisateur
router.delete("/:id", deleteUtilisateur);

// Route GET : compter le nombre d'utilisateur
router.get('/count', getUserCount);

module.exports = router;
