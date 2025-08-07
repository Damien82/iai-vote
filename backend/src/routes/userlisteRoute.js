const express = require("express");
const router = express.Router();
const User = require('../models/Users');

const {
  ajouterUtilisateur,
  getAllUtilisateurs,
  deleteUtilisateur,
} = require("../controllers/simpleuserController");

// Route POST : Ajouter un utilisateur dans la base ref (base de référence)
router.post("/", ajouterUtilisateur);

// Route GET : Afficher tous les utilisateurs depuis la base main (base principale)
router.get("/", getAllUtilisateurs);

// Route GET : supprimer tous un utilisateur
router.delete("/:id", deleteUtilisateur);

// Route pour compter les utilisateurs
router.get('/count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});



module.exports = router;
